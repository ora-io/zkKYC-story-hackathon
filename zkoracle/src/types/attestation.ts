import { Address, Bytes } from "@hyperoracle/zkgraph-lib";

export class Attestation {
  data: string;
  constructor(public attestation: Bytes) {
    // this.data = attestation.toString()
    const attestationString = attestation.toHexString().substring(2);
    const signatureString = attestationString.substring(0,130);
    const schemaString = attestationString.substring(130, 194);
    const recipientString = attestationString.substring(194, 234);
    const timeString = attestationString.substring(234, 246);
    const dataString = attestationString.substring(246, 1270);
    
    this.data = dataString
  }
  recover(): Address {
    return Address.fromString(
      "0xe02bD7a6c8aA401189AEBb5Bad755c2610940A73"
    );
  }
}