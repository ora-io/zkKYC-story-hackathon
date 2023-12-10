import { Address } from "@hyperoracle/zkgraph-lib";

export const PADO_ATTESTER = Address.fromString(
  "0xe02bD7a6c8aA401189AEBb5Bad755c2610940A73"
);

class Schema {
  constructor(
    public id: string,
    public schemaStr: string[],
    public paramsName: string[]
  ) {}
}

export const assetsProofSchema = new Schema(
  "0x45316fbaa4070445d3ed1b041c6161c844e80e89c368094664ed756c649413a9",
  ["string", "bytes32", "bytes32", "address", "uint64", "uint64", "bool"],
  [
    "source",
    "sourceUseridHash",
    "authUseridHash",
    "receipt",
    "getDataTime",
    "baseValue",
    "balanceGreaterThanBaseValue",
  ]
);

export const tokenHoldingsProofSchema = new Schema(
  "0xe4c12be3c85cada725c600c1f2cde81d7cc15f957537e5756742acc3f5859084",
  [
    "string",
    "bytes32",
    "bytes32",
    "address",
    "uint64",
    "string",
    "string",
    "bool",
  ],
  [
    "source",
    "sourceUseridHash",
    "authUseridHash",
    "recipient",
    "getDataTime",
    "asset",
    "baseAmount",
    "balanceGreaterThanBaseAmount",
  ]
);

export const accountOwnershipProofSchema = new Schema(
  "0x5f868b117fd34565f3626396ba91ef0c9a607a0e406972655c5137c6d4291af9",
  [
    "string",
    "string",
    "string",
    "string",
    "bytes32",
    "bool",
    "uint64",
    "bytes32",
  ],
  [
    "proofType",
    "source",
    "content",
    "condition",
    "sourceUserIdHash",
    "result",
    "timestamp",
    "userIdHash",
  ]
);
