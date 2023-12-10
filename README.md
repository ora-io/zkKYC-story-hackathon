# zkKYC with zkOracle and Story Protocol Hook

> This project was built during [Story Protocol Alpha Hackathon](https://twitter.com/StoryProtocol/status/1724821270968307989).

zkKYC enables KYC verification for Story Protocol using zkOracle and Story Protocol hook.

Currently, zkKYC supports integration of CEX KYC status with Story Protocol.

## Why?

- **Connects Offchain Data with Onchain Story Protocol**
- **Decentralized**: KYCHook allows users to be KYCed without relying on a centralized admin, and users can permissionlessly submit their own KYC proofs.
- **Trustless**: KYCHook verifies the zk proof of KYC status onchain, so Story Protocol IPOrg can trust the KYC status without trusting any third party.
- **Privacy**: zkKYC only proves a user is KYCed without revealing any of their information.

## Usage

- Compliance for mass adoption and regulation
- Configuration for different countries IP related policies
- Can be extended to other offchain data sources (eg. geo location, age, etc.)

## Core

zkKYC consists of 2 parts: zkOracle (generates zkp of user KYC status) and KYCHook (integrates Story Protocol with zkOracle).

Components:
- [zkOracle](zkOracle/README.md): Generates zk proofs of KYC status.
- [KYCHook](story-hook/README.md): Story Protocol hook that checks if a user is KYCed by verifying the zk proof.

## Future Steps

- Customized KYC status: add different KYC related data such as country-specific KYC status, KYC completion date, etc.
- Async Hook: use async hook to let user go through the complete KYC process for different IPOrg.
