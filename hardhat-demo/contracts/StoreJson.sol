// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StoreJson {
    mapping(string => string) private jsonData;

    // 存储 JSON 数据，使用键值对
    function storeJson(string calldata key, string calldata value) public {
        jsonData[key] = value;
    }

    // 根据键查询 JSON 数据
    function retrieveJson(string calldata key) public view returns (string memory) {
        return jsonData[key];
    }
}
