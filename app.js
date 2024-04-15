
import indexs from './index.mjs';

import http from 'http';
import https from 'https';
import fs from 'fs';

const server = http.createServer(async (req, res) => {
    if (req.url === '/api/upload' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
                const requestData = JSON.parse(body);
                const imageData = await indexs(requestData.text,requestData.step)
                // 在这里处理接收到的 JSON 数据，例如上传图片等
                // 这里只是生成一个临时图片路径作为示例
                const tempImagePath = imageData[0].url; // 临时图片路径
                // 发送 HTTP 请求获取图片数据
                https.get(tempImagePath, (response) => {
                    let imageData = '';

                    // 收到数据块时，拼接数据
                    response.on('data', (chunk) => {
                        imageData += chunk;
                    });

                    // 数据接收完毕，将图片数据作为响应内容发送给客户端
                    response.on('end', () => {
                        // 获取图片的 Content-Type
                        const contentType = response.headers['content-type'];
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(imageData);
                    });
                }).on('error', (error) => {
                    console.error('Error fetching image:', error);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                });
            
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
