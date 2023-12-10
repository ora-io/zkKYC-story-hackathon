import { execSync } from "child_process";
import { ethers } from "ethers";

class Input {
  constructor(easString){
    const eas = JSON.parse(easString)
    this.signature = ethers.utils.joinSignature(eas.sig.signature)
    this.schema = eas.sig.message.schema
    this.recipient = eas.sig.message.recipient
    this.time = eas.sig.message.time
    this.data = eas.sig.message.data
  }

  toString(){
    const signatureBytes = this.signature.substring(2)
    const schemaBytes = this.schema.substring(2)
    const recipientBytes = this.recipient.substring(2)
    const timeBytes = parseInt(this.time, 10).toString(16).padStart(12, '0')
    const dataBytes = this.data.substring(2)

    return '0x' + signatureBytes + schemaBytes + recipientBytes + timeBytes + dataBytes
  }
}

async function getInput() {
  const easString = process.argv[2]
  if(!easString) {
    console.error("[-] eas not found");
  }

  const input = new Input(easString).toString();
  return input
}

async function main() {
  const input = await getInput()

  let result = execSync("npm run compile");

  result = execSync(`npm run exec -- 18518315 ${input}`);
  if(result.stderr) {
    console.error(result.stderr)
    console.log("[-] validation failed.")
    return
  }
  console.log("[+] validation success.")
}

main();