module.exports = {
  networks: {
    development: { // ganache
      host: "localhost",
      port: 7545,
      network_id: "5777", 
      gas: 5000000
    }
  },
  compilers: {
    solc: {
      version: "0.8.10",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
