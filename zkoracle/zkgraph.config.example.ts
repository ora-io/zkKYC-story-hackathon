import { UserConfig } from '@hyperoracle/zkgraph-cli'

export default {
  // Set up your config here
  UserPrivateKey: '',
  // Please set up your pinata JWT
  PinataJWT: '',
  ZkwasmProviderUrl: "https://rpc.zkwasmhub.com:8090",
  JsonRpcProviderUrl: {
    mainnet: "", // Optional
    sepolia: "", // Optional
    goerli: "",
  },
} as UserConfig
