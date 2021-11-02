"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSocket = exports.createSocketServer = void 0;
const ws_1 = require("ws");
const sockets = [];
/**
 * @see https://github.com/websockets/ws/issues/1334
 */
function createSocketServer(options, onConnection) {
    const server = new ws_1.Server(options);
    server.on('connection', (socket, request) => {
        sockets.push(socket);
        socket.on('close', () => sockets.splice(sockets.indexOf(socket), 1));
        console.log(`[WebSocket] ${sockets.length} connections`);
        onConnection === null || onConnection === void 0 ? void 0 : onConnection.call(server, socket, request);
    });
    server.on('error', console.error);
    return server;
}
exports.createSocketServer = createSocketServer;
async function sendSocket(data) {
    if (!sockets[0])
        console.warn('No socket connected');
    for (const socket of sockets)
        await new Promise((resolve, reject) => socket.send(data, error => (error ? reject(error) : resolve())));
}
exports.sendSocket = sendSocket;
//# sourceMappingURL=SocketServer.js.map