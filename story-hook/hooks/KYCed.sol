// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AggregatorVerifier.sol" as AggregatorVerifier;

/// @title KYCed
/// @notice This contract allows KYCed users to perform actions based on zkOracle's attestation.
contract KYCed is Ownable {
    /// @notice whether or not the KYC permission is enabled for the IP Org
    bool public kycEnabled;

    address public immutable aggregatorVerifier = 0x714C66711F6552D4F388Ec79D4A33FE20173cC34;

    /// @notice the mapping from the address to whether or not the address is kyced with required permission
    mapping(address => bool) public kyced;

    event KYCEnabled();
    event KYCDisabled();
    event KYCAdded(address indexed user);

    /// @notice Enable kyc status
    /// @dev This function enables kycing to perform action
    function enableKYC() external onlyOwner {
        kycEnabled = true;
        emit KYCEnabled();
    }

    /// @notice Disable kyc status
    /// @dev This function disables kycing to perform action
    function disableKYC() external onlyOwner {
        kycEnabled = false;
        emit KYCDisabled();
    }

    /// @notice Add an address to the kyced users list, if the user can provide a valid proof to
    /// @dev This function adds an address into the kyc users list so that the address can execute actions
    function kycAddedWithProof(
        address user_,
        uint256[] calldata proof,
        uint256[] calldata verifyInstance,
        uint256[] calldata aux,
        uint256[][] calldata targetInstance
    ) external {
        AggregatorVerifier.verify(aggregatorVerifier, proof, verifyInstance, aux, targetInstance);
        kyced[user_] = true;
        emit KYCAdded(user_);
    }

    /// @notice Verify if an user is allowed to perform an action
    /// @dev This function check if whitelist is enabled, return false it is NOT whitelisted. Otherwise return true.
    function canPerformAction(address user_) external view returns (bool) {
        return (!kycEnabled) || kyced[user_];
    }
}
