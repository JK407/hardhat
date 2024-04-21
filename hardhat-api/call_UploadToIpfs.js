const ipfsClient = require('ipfs-http-client')
const fs = require('fs');
require('dotenv').config();


// 创建 IPFS 实例，连接到本地节点
const ipfs = ipfsClient(process.env.IPFS_URL)

// 定义一个异步函数上传文件
async function uploadFile(filePath) {
    try {
        // 读取文件内容
        const file = fs.readFileSync(filePath);
        console.log('File read:', file);

        // 使用 ipfs.add 上传文件，注意处理异步迭代器
        for await (const result of ipfs.add(file)) {
            console.log('File uploaded:', result);
            console.log('IPFS Path:', result.path);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}



// 调用函数，替换 'path/to/your/file' 为实际文件路径
uploadFile('./README.md');

