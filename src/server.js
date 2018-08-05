const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const fs = require('fs');
const os = require('os');
//获取本地无线网ip，
let ipV4=(os.networkInterfaces()['无线网络连接 2'].filter(x=>x.family==='IPv4')[0].address);
console.log(ipV4);

//
app.listen(80);

function handler(req, res) {
    fs.readFile("./../../vue-chat-master-master" + req.url,
        function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
           
            res.writeHead(200);
            res.end(data);
        });
        
}

io.on('connection', function (socket) {
    socket.on('my other event', function (data) {
        console.log(data);
    socket.broadcast.emit('news', {
        data
     });
    //  io.sockets.emit('ipv4', `${ipV4}`);
    });
});