import { Block, Bytes, require as contrain } from "@hyperoracle/zkgraph-lib";
import { PadoBuilder } from "./modules/padoBuilder";
import { PADO_ATTESTER } from "./utils/constants";
import { Attestation } from "./types/attestation";
import { PadoAccountOwnershipProof } from "./types/pado";
import { PadoType } from "./types/padoType";

export function handlePado(_: Block[], easData: Bytes): Bytes {
  const attestation = new Attestation(easData);
  contrain(attestation.recover() === PADO_ATTESTER);

  const padoBuilder = new PadoBuilder(PadoType.accountOwnershipProof);
  const pado = padoBuilder.build(attestation.data) as PadoAccountOwnershipProof;

  const isBinance = pado.source === "binance";
  const isKyc = pado.content === "KYC Level";
  const KycLevelBiggerThan2 = pado.condition === ">=2";

  contrain(isBinance && isKyc && KycLevelBiggerThan2);
  // return Bytes.fromI32(1);
}
