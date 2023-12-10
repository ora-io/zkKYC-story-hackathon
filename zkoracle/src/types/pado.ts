import { Address, BigInt, Bytes } from "@hyperoracle/zkgraph-lib";
import { PadoType } from "./padoType";

export class Pado {
  source: string = "";
  sourceUserIdHash: Bytes = Bytes.fromHexString("");
  constructor(public padoType: PadoType) {}
}

export class PadoAssetsProof extends Pado {
  authUserIdHash: Bytes;
  receipt: Address;
  getDataTime: BigInt;
  baseValue: BigInt;
  balanceGreaterThanBaseValue: boolean;

  constructor(params: string[]) {
    super(PadoType.assetsProof);
    this.source = params[0];
    this.sourceUserIdHash = Bytes.fromHexString(params[1]);
    this.authUserIdHash = Bytes.fromHexString(params[2]);
    this.receipt = Address.fromString(params[3]); // TODO: slice 0,20?
    this.getDataTime = BigInt.fromString(params[4]);
    this.baseValue = BigInt.fromString(params[5]);
    this.balanceGreaterThanBaseValue = params[6] == "True";
  }
}

export class PadoTokenHoldingProof extends Pado {
  authUserIdHash: Bytes;
  recipient: Address;
  getDataTime: BigInt;
  asset: string;
  baseAmount: string;
  balanceGreaterThanBaseAmount: boolean;

  constructor(params: string[]) {
    super(PadoType.tokenHoldingsProof);
    this.source = params[0];
    this.sourceUserIdHash = Bytes.fromHexString(params[1]);
    this.authUserIdHash = Bytes.fromHexString(params[2]);
    this.recipient = Address.fromString(params[3]); // TODO: slice 0,20?
    this.getDataTime = BigInt.fromString(params[4]);
    this.asset = params[5];
    this.baseAmount = params[6];
    this.balanceGreaterThanBaseAmount = params[7] == "1";
  }
}

export class PadoAccountOwnershipProof extends Pado {
  proofType: string;
  content: string;
  condition: string;
  result: boolean;
  timestamp: BigInt;
  userIdHash: Bytes;

  constructor(params: string[]) {
    super(PadoType.accountOwnershipProof);
    this.proofType = params[0];
    this.source = params[1];
    this.content = params[2];
    this.condition = params[3];
    this.sourceUserIdHash = Bytes.fromHexString(params[4]);
    this.result = params[5] == "1";
    this.timestamp = BigInt.fromString(params[4]);
    this.userIdHash = Bytes.fromHexString(params[5]);
  }
}
