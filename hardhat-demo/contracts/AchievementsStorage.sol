// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AchievementsStorage {
    // 定义一个结构体来保存成就ID和对应的CID
    struct Achievement {
        uint achId;
        string cid;
    }

    mapping(uint => string) private achievements;
    uint[] private achIds;

    // 事件用于日志记录操作
    event AchievementAdded(uint achId, string cid);

    // 存储成就的IPFS CID
    function storeAchievement(uint achId, string memory cid) public {
        require(bytes(achievements[achId]).length == 0, "Achievement already exists.");
        achievements[achId] = cid;
        achIds.push(achId);
        emit AchievementAdded(achId, cid);
    }

    // 获取所有存储的成就数据
    function getAllAchievements() public view returns (Achievement[] memory) {
        Achievement[] memory allAchievements = new Achievement[](achIds.length);
        for (uint i = 0; i < achIds.length; i++) {
            allAchievements[i] = Achievement(achIds[i], achievements[achIds[i]]);
        }
        return allAchievements;
    }

    // 根据成就ID获取对应的CID
    function getAchievement(uint achId) public view returns (string memory) {
        require(bytes(achievements[achId]).length != 0, "Achievement does not exist.");
        return achievements[achId];
    }
}
