const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
    const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

    wss.on('connection', (socket) => {
        console.log('New WebSocket connection established');
        socket.isAlive = true;

        socket.on('message', function message(data) {
            wss.clients.forEach(function each(client) {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });


        socket.on('pong', () => {
            socket.isAlive = true;
        });

        setInterval(() => {
            wss.clients.forEach((client) => {
                if (!client.isAlive) {
                    client.terminate();
                } else {
                    client.ping();
                }
            });
        }, 30000); // Ping every 30 seconds
    });
}

module.exports = { peerProxy };