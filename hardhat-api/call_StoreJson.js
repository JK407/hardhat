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
const value = "0x1c27c30365fc2718b0b598eaaa2105fd1be0524f05d732d0cf4a0a1114f8df40147c6154136385a220330a278624103ba2a4323f9542b203350dd4c13d74aa470937abbfee313dbcecd227bea13ed0064dfc5206de928d42458d21b8e4c10f68004955be207374efe749aae12ec7e1b2b5e2c2438421bc093b79ab47f29ba4a92118e482804fdb717e3af0f51b535a1339e9f5ca1531016d01b863c19b6f8c3a0504e1c934f7c3248b6f04dcf05ba8a7d71553a36b0f7032733172fdfcd7f3e304a26478de978b35d76f068d5b1d78ab7a7cc8af055c1c53f29c43c60f6e90592928c1a4bdeddbcd5649ac79734bef0572fd9180f65cfc20980925d0020bc25c25009ae29df9cdfe503ea68a495fb50cd7dfa3a2386db3445ce5e672e71b498a01a17da7e96a3e581b7316c4261d66c8fc0398a365c35e1d6904b2755d2c835607173ca227eb8406319ae4e343d675630dade65d2080dd4b65f96db1af5f778101d37bfa9c93652651a18cfe5a938d91bc5d4f581352cdb839e5ed2d90a5d68d2b48689fc0884007c50857ca1e382f72eaddaca7be7ca099dc66bede050d8513300142455aea1f7b032835bf06b777dc65cfa6095efff84c1a2df83f08ac7e8f258b957f061d77dcd6f3cfdc426e076315f0d02f34567ecf893705129e421df222f4adb73cd93c22e54168edae02ebfbdc5724a18a28379421689883fd86284b182e1eb284c2ae574c0f2ab3dbaa7d7a86b2d147db47d9d9f43f7f57f669838921447f92f587ef84347b513e2ca8d54768d62ed64ed44725ebac277799fcb2b115da33930e1cb07cc8eb7b1aee745e4a65f25fcde7e57ca6cbd3a03a69900f472a8c5221392e80bbcb58606e1f24d44be26bdafd5c3229c94f1a130d302c611f0341bc78a8f756526eff5f1d4cd616c5401aa08af8ed39dd872a82a8c4b53b5e0bbe8cf0c9d19c01e0658c3111593fac0291d115314382c560563fde0a41087b25d0a1af85f0091ca79d9c60894c61f4c60f6ebe3a3c1d2706f9cad6cf6308b40854a41467b66d81431c24da4c713a9200e33dd4dda0bb294694baae47148d0d1b3cf4ec2aae720f96eaf30a91176b8c63eaf533fabec9bcca11a019aec611672e2545c3eda6769deab9c13ad5bd9c86c6f2ac9317dcd8504d8e8585167795c12e61c74bf3ab126750d705f1fe97878d5c94f91f027570724aabc6e72ab526f72ebbc3415b4d55297b170f9bd0d0f37b28e58e7010506d17ccb16c2b669e2f3601d920d609b9a3444eb188027d4b84f5a999ffe2cd2d8ac212c44ee0e3a9093c12484b43edc8107875bec573799ef271864c75e88e7a1d0bb16333267b653b3b25e814287d0e045b79d750dc74f4cfa93e56ced44d1494bf426bf48184558abd20f6e9eb69e27f2cf11925d4996d9e35cd02a4036048f56d1ce9ee99eb8b83cc2ae4ee3f207257d4c656a651f48330624c051ec8e9c17d6ce5bf3ca15dd4c7731c9f499f99726f149a96dce3515ee85730a8c4d692eb44f60afcfc0c07946ca00bf0166f6c888f44659dace7b46c3c84ba82194554ab95be0203465c73d27860291f05be2d7a8aa2a2d6f51a038ff0ab66d3230b49cc7925ae5b1754417daaf003863af07e29378f7f0b403d4ac546c09149f2ec3c20ec841316aefc0522ce751580e13076e3bae2fd9bd1bfb12d4dfb9f3a0eee71ddd3a5cb16b2ff932e036c11fa9a4556556753cd21e5c1562d45d34bd4512143b1f48ee68948e517fa9d12";

async function storeAndRetrieve() {

    // 调用 storeJson 方法
    console.log('Storing JSON data on the blockchain...');
    const tx = await contract.storeJson(k, value);
    await tx.wait(); // 等待交易被挖矿确认
    console.log(`Transaction hash: ${tx.hash}`);
    const block = await provider.getBlock(tx.blockNumber);
    console.log(`Block info : ${JSON.stringify(block)}`)
    // 调用 retrieveJson 方法
    console.log('Retrieving JSON data from the blockchain...');
    const storedData = await contract.retrieveJson(k);
    console.log(`Retrieved data: ${storedData}`);
}

storeAndRetrieve().catch(console.error);