import { Bytes, BigInt } from "@hyperoracle/zkgraph-lib";

export function decodeABI(rawData : string, paramTypes : string[]): string[] {
  if(rawData.startsWith("0x")) rawData = rawData.substring(2);
  const result: string[] = [];
  let offset: i32 = 0;

  for (let i = 0; i < paramTypes.length; i++) {
    const paramType = paramTypes[i];

    if (paramType.startsWith('string')) {
      const lenOffset: i32 = BigInt.fromString(rawData.substr(offset, 64), 16).mul(2).toI32();
      const length: i32 = BigInt.fromString(rawData.substr(lenOffset, 64), 16).mul(2).toI32();
      const value: string = Bytes.fromHexString(rawData.substr(lenOffset + 64, length)).toString();
      result.push(value);
      offset += 64;
    } else if (paramType.startsWith('bytes')) {
      const value: string = rawData.substr(offset, 64);
      result.push(value);
      offset += 64;
    } else if (paramType === 'bool') {
      const valueInt = BigInt.fromString(rawData.substr(offset, 64), 16).toI32() === 1;
      result.push(valueInt.toString());
      offset += 64;
    } else if (paramType.startsWith('uint')) {
      const length: i32 = BigInt.fromString(paramType.substr(4), 16).div(8).toI32();
      const valueInt = BigInt.fromString(rawData.substr(offset, length * 2), 16);
      result.push(valueInt.toString());
      offset += 64;
    } else {
      throw new Error(`Unsupported parameter type: ${paramType}`);
    }
  }

  return result;
}
