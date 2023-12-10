import { require as contrain } from "@hyperoracle/zkgraph-lib";
import { decodeABI } from "../utils/abi";
import { Pado, PadoAccountOwnershipProof, PadoAssetsProof, PadoTokenHoldingProof } from "../types/pado";
import { assetsProofSchema ,accountOwnershipProofSchema, tokenHoldingsProofSchema } from "../utils/constants";
import { PadoType } from "../types/padoType";

export class PadoBuilder {
  public params: string[] = [];
  public schemaStr: string[];
  public paramsName: string[];

  constructor(public proofType: PadoType) {
    switch (proofType) {
      case PadoType.assetsProof:
        this.schemaStr = assetsProofSchema.schemaStr;
        this.paramsName = assetsProofSchema.paramsName;
        break;
      case PadoType.tokenHoldingsProof:
        this.schemaStr = tokenHoldingsProofSchema.schemaStr;
        this.paramsName = tokenHoldingsProofSchema.paramsName;
        break;
      case PadoType.accountOwnershipProof:
        this.schemaStr = accountOwnershipProofSchema.schemaStr;
        this.paramsName = accountOwnershipProofSchema.paramsName;
        break;
      default:
        this.schemaStr = tokenHoldingsProofSchema.schemaStr;
        this.paramsName = tokenHoldingsProofSchema.paramsName;
        break;
    }
  }

  public build(dataBinString: string): Pado {
    this.params = decodeABI(dataBinString, this.schemaStr);
    switch (this.proofType) {
      case PadoType.assetsProof:
        return new PadoAssetsProof(this.params);
      case PadoType.tokenHoldingsProof:
        return new PadoTokenHoldingProof(this.params);
      case PadoType.accountOwnershipProof:
        return new PadoAccountOwnershipProof(this.params);
      default:
        return new PadoAccountOwnershipProof(this.params);
    }
  }
}
