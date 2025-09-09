module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://testnet.infura.io/v3/YOUR_INFURA_PROJECT_ID`),
      network_id: 3, // Ropsten
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID`),
      network_id: 1, // Main Ethereum network
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.30", // Specify the Solidity version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};