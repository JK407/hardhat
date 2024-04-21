require('dotenv').config();
const ipfsClient = require('ipfs-http-client')

// 创建 IPFS 实例，连接到本地节点
const ipfs = ipfsClient(process.env.IPFS_URL)

const BufferList = require('bl/BufferList')


// 根据 CID 获取文件内容的函数
async function getFileMetadata(cid) {
    for await (const file of ipfs.get(cid)) {
        console.log(file.path)

        const content = new BufferList()
        for await (const chunk of file.content) {
            content.append(chunk)
        }

        console.log(content.toString())
    }
}



getFileMetadata('QmWekZyUuqpWnF7Wd4KsM4DNQWf1hhKFVtipVCoPz71cPT');


