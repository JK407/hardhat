require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config()




/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24", // Solidity版本号，根据你的项目选择
    // version: "0.8.21", // Solidity版本号，根据你的项目选择
    debug: true, // 调试模式
    settings: {
      optimizer: {
        enabled: true,
        runs: 200  // 调整优化运行次数，根据需要进行设置
      }
    }
  },
  allowUnlimitedContractSize: true,
  networks: {
    hardhat: {},
    external: {
      url: process.env.NODE_RPC_URL // 外部节点的URL
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
