const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');
const multer = require('multer');

const server = http.createServer((req, res) => {
    console.log('Server listening on port 5500');

    if (req.method === 'GET') {
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('This is Home Page');
            res.end();
        } else if (req.url === '/about') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('This is About Page');
            res.end();
        } else if (req.url === '/contact') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('This is Contact Page');
            res.end();
        } else if (req.url === '/file-write') {
            fs.writeFile('demo.txt', 'hello world', (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.write('Error writing file');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.write('File "demo.txt" created and text "hello world" written');
                }
                res.end();
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found');
            res.end();
        }
    } else if (req.method === 'POST' && req.url === '/upload') {
        let data = '';
        req.on('data', chunk => {
            data += chunk.toString();
        });
        req.on('end', () => {
            const parsedData = parse(data);
            const fileData = parsedData['file'];
            fs.writeFile('uploaded.txt', fileData, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.write('Error writing file');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.write('File uploaded successfully');
                }
                res.end();
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
    }
});

server.listen(5500,()=>{
    console.log('server is running  ...........')
});
