const ethers = require('ethers');
require('dotenv').config();


// 假设你有智能合约的 ABI 和地址
const contractABI =[
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "achId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "cid",
                "type": "string"
            }
        ],
        "name": "AchievementAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "achId",
                "type": "uint256"
            }
        ],
        "name": "getAchievement",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllAchievements",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "achId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "cid",
                        "type": "string"
                    }
                ],
                "internalType": "struct AchievementsStorage.Achievement[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "achId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            }
        ],
        "name": "storeAchievement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]; // 合约 ABI
const contractAddress = process.env.ACH_CONTRACT_ADDRESS; // 合约地址

// 连接到本地节点
const rpcURL = process.env.NODE_RPC_URL; // 根据你的本地节点 URL 进行替换
const provider = new ethers.providers.JsonRpcProvider(rpcURL);

// 钱包私钥
const privateKey = process.env.ACCOUNT_PRIVATE;
const wallet = new ethers.Wallet(privateKey, provider);

// 获取合约实例
const contract = new ethers.Contract(contractAddress, contractABI, wallet);


// getAllAchievements
async function getAllAchievements() {
    try {
        const achievements = await contract.getAllAchievements();
        console.log('Achievements:', achievements);
    } catch (error) {
        console.error('Error retrieving achievements:', error);
    }
}

getAllAchievements();