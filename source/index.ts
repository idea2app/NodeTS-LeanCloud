import { createServer } from 'http';

import koaApp from './WebServer';
import { createSocketServer } from './SocketServer';

process.on('unhandledRejection', (reason: string | Error) =>
    console.error(reason)
);

const { PORT, LEANCLOUD_APP_PORT: appPort } = process.env;

const server = createServer(koaApp.callback()),
    port = parseInt(appPort || PORT || '8080');

createSocketServer({ server });

server.listen(port, () => {
    const host = `localhost:${port}`;
    const baseHTTP = `http://${host}`;

    console.log(`
HTTP Server runs at ${baseHTTP}/
RESTful API document serves at ${baseHTTP}/docs/
WebSocket Server runs at ws://${host}/
`);
});
