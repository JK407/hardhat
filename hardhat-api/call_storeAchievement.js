require('dotenv').config();
const ethers = require('ethers');

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


// storeAchievement
async function storeAchievement(achievementId, cid) {
    try {
        const tx = await contract.storeAchievement(achievementId, cid);
        console.log('Transaction hash:', tx.hash);
        const receipt = await tx.wait();
        console.log('Transaction confirmed in block:', receipt.blockNumber);
    } catch (error) {
        console.error('Error storing achievement:', error);
    }
}

storeAchievement(7, 'QmWekZyUuqpWnF7Wd4KsM4DNQWf1hhKFVtipVCoPz71cPT');