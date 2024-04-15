
import indexs from './index.mjs';

import http from 'http';
import fs from 'fs';

const server = http.createServer(async (req, res) => {
    if (req.url === '/api/upload' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            try {
                const requestData = JSON.parse(body);
                const imageData = await indexs(requestData.text,requestData.step)
                // 在这里处理接收到的 JSON 数据，例如上传图片等
                // 这里只是生成一个临时图片路径作为示例
                const tempImagePath = imageData[0].url; // 临时图片路径
                const responseData = { imagePath: tempImagePath };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(responseData));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Bad Request');
            }
        });
    } else {
        // 返回 404 Not Found 错误
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
