// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.19;

import { SyncBaseHook } from "contracts/hooks/base/SyncBaseHook.sol";
import { KYCed } from "contracts/hooks/KYCed.sol";
import { KYC } from "contracts/lib/hooks/KYC.sol";
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";

/// @title KYCHook
/// @notice This contract is a hook that ensure the address is kyced to perform actions in a module
/// @dev It extends SyncBaseHook and provides the implementation for validating the config and executing the hook.
///      It also implements the functions for managing kyced user list.
///      To follow the developer's guide, please place this file at ${PROJECT_ROOT}/contracts/hooks before compiling.
contract KYCHook is SyncBaseHook {
    using ERC165Checker for address;

    /// @notice The address is not kyced for an IP Org to perform actions
    error KYCHook_NotKYCed(address userAddress, address kycContract);

    /// @notice Constructs the KYCHook contract.
    /// @param accessControl_ The address of the access control contract.
    constructor(address accessControl_) SyncBaseHook(accessControl_) {}

    /// @notice Validates the configuration for the hook.
    /// @dev This function checks if the provided address is for a kyced contract.
    /// @param hookConfig_ The configuration data for the hook.
    function _validateConfig(bytes memory hookConfig_) internal view override {
        KYC.Config memory config = abi.decode(
            hookConfig_,
            (KYC.Config)
        );
        address kycContract = config.kycContract;
        if (kycContract == address(0)) {
            revert Errors.ZeroAddress();
        }

        // Verify the owner is not address(0)
        if (KYCed(kycContract).owner() == address(0)) {
            revert Errors.UnsupportedInterface("KYCed");
        }
    }

    /// @notice Executes kyced user check in a synchronous manner.
    /// @dev This function checks if the user address is kyced.
    /// @param hookConfig_ The configuration of the hook.
    /// @param hookParams_ The parameters for the hook.
    /// @return hookData always return empty string as no return data from this hook.
    function _executeSyncCall(
        bytes memory hookConfig_,
        bytes memory hookParams_
    ) internal virtual override returns (bytes memory) {
        KYC.Config memory config = abi.decode(hookConfig_, (KYC.Config));
        KYC.Params memory params = abi.decode(hookParams_, (KYC.Params));

        address user = params.user;
        if (user == address(0)) {
            revert Errors.ZeroAddress();
        }

        // Check if the user is kyced correctly.
        address kycContract = config.kycContract;
        if (!KYCed(kycContract).canPerformAction(user)) {
            revert Errors.KYCHook_NotKYCed(user, kycContract);
        }
        return "";
    }
}
