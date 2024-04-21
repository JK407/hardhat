const hre = require("hardhat");
const fs = require("fs");


//  npx hardhat run .\scripts\deploy_AchievementsStorage.js --network external
async function main() {


    const AchievementsStorage = await hre.ethers.deployContract("AchievementsStorage");

    await AchievementsStorage.waitForDeployment();

    console.log(`Contract deployed to ${AchievementsStorage.target}`);

    // Get the ABI
    const abi = JSON.stringify(AchievementsStorage.interface.format("json"), null, 2);

    // Write ABI and address to lock.json
    const contractInfo = {
        abi: abi,
        address: AchievementsStorage.target,
    };


    // 创建ABI和合约地址文件
    fs.writeFileSync("./src/AchievementsStorage.sol.json", JSON.stringify(contractInfo, null, 2));

    console.log("ABI written to AchievementsStorage.sol.abi");
    console.log("ABI and address written to AchievementsStorage.sol.json");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
