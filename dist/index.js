"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = require("http");
const WebServer_1 = (0, tslib_1.__importDefault)(require("./WebServer"));
const SocketServer_1 = require("./SocketServer");
process.on('unhandledRejection', (reason) => console.error(reason));
const { PORT, LEANCLOUD_APP_PORT: appPort } = process.env;
const server = (0, http_1.createServer)(WebServer_1.default.callback()), port = parseInt(appPort || PORT || '8080');
(0, SocketServer_1.createSocketServer)({ server });
server.listen(port, () => {
    const host = `localhost:${port}`;
    const baseHTTP = `http://${host}`;
    console.log(`
HTTP Server runs at ${baseHTTP}/
RESTful API document serves at ${baseHTTP}/docs
WebSocket Server runs at ws://${host}/
`);
});
//# sourceMappingURL=index.js.map