// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.19;

/// @title KYC
/// @notice This library defines the Config and Params structs for KYCHook
/// @dev The Config struct contains the address of IPOrg, the Params struct contains
///      the user's address who will run the execute function of the module.
///      To follow the developer's guide, please place this file at
///      ${PROJECT_ROOT}/contracts/lib/hooks before compiling.
library KYC {
    /// @notice Defines the required configuration information for KYCHook.
    /// @dev The Config struct contains a single field: kycContract.
    struct Config {
        /// @notice The address of a kyc smart contract
        /// @dev The kyc is a smart contract that manages kyc users list.
        address kycContract;
    }

    /// @notice Defines the required parameter information for executing KYCHook.
    /// @dev The Params struct contains a single field: user.
    struct Params {
        /// @notice The address of the user who will run the execute function of the module.
        /// @dev The hook will verify if the address is in the kyc user list.
        address user;
    }
}
