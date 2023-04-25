require("babel-register");
require("babel-polyfill");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const { SEED_PHRASE, INFURA_KEY } = require("./seed-phrase");
const infuraKey = INFURA_KEY;
const seedPhrase = SEED_PHRASE;
module.exports = {
  networks: {
      development: {
        // host: "127.0.0.1", // Localhost (default: none)
        // port: 9545, // Standard Ethereum port (default: none)
        // provider: () => new HDWalletProvider(seedPhrase, 'http://127.0.0.1:9545'),
        provider: function() {
          return new HDWalletProvider(seedPhrase, 'http://127.0.0.1:9545');
        },
        network_id: "*", // Any network (default: none,
      },
      goerli: {
        provider: () => new HDWalletProvider(seedPhrase, 'https://goerli.infura.io/v3/'+infuraKey),
        network_id: 5,
        gas: 5500000,
        confirmations: 2,
        skipDryRun: true,
      },
      sepolia: {
        provider: () => new HDWalletProvider(seedPhrase, 'https://sepolia.infura.io/v3/'+infuraKey),
        network_id: 11155111,
        gas: 5500000,
        confirmations: 2,
        skipDryRun: true,
      },
      rinkeby: {
        provider: () => new HDWalletProvider(seedPhrase, 'https://rinkeby.infura.io/v3/'+infuraKey),
        network_id: 4,
        gas: 5500000,
        confirmations: 2,
        timeoutBlocks: 200000000000000,
        skipDryRun: true,
      },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "petersburg",
    },
  },
  plugins: ["truffle-contract-size"],
};
