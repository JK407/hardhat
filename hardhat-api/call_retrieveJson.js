require('dotenv').config();
const ethers = require('ethers');

// 假设你有智能合约的 ABI 和地址
const contractABI =[
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "key",
                "type": "string"
            }
        ],
        "name": "retrieveJson",
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
        "inputs": [
            {
                "internalType": "string",
                "name": "key",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "value",
                "type": "string"
            }
        ],
        "name": "storeJson",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]; // 合约 ABI
const contractAddress = process.env.STOREJSON_CONTRACT_ADDRESS; // 合约地址

// 连接到本地节点
const rpcURL = process.env.NODE_RPC_URL; // 根据你的本地节点 URL 进行替换
const provider = new ethers.providers.JsonRpcProvider(rpcURL);

// 钱包私钥
const privateKey = process.env.ACCOUNT_PRIVATE;
const wallet = new ethers.Wallet(privateKey, provider);
const signer = wallet.connect(provider);

// 获取合约实例
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// 调用StoreJson合约的storeJson方法
const k = "a";



// 调用 retrieveJson 方法的函数
async function retrieveJson(key) {
    console.log('Retrieving JSON data from the blockchain...');
    const storedData = await contract.retrieveJson(k);  // 直接从合约调用 retrieveJson 方法
    console.log(`Retrieved data for key "${k}": ${storedData}`);
}

// 使用示例
retrieveJson("k").catch(console.error);