const hre = require("hardhat");
const fs = require("fs");


//  npx hardhat run .\scripts\deploy_StoreJson.js --network external
async function main() {


    const StoreJson = await hre.ethers.deployContract("StoreJson");

    await StoreJson.waitForDeployment();

    console.log(`Contract deployed to ${StoreJson.target}`);

    // Get the ABI
    const abi = JSON.stringify(StoreJson.interface.format("json"), null, 2);

    // Write ABI and address to lock.json
    const contractInfo = {
        abi: abi,
        address: StoreJson.target,
    };


    // 创建ABI和合约地址文件
    fs.writeFileSync("./src/StoreJson.sol.json", JSON.stringify(contractInfo, null, 2));

    console.log("ABI written to StoreJson.sol.abi");
    console.log("ABI and address written to StoreJson.sol.json");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
