import { IncomingMessage } from 'http';
import WebSocket, { Server, ServerOptions } from 'ws';

const sockets: WebSocket[] = [];
/**
 * @see https://github.com/websockets/ws/issues/1334
 */
export function createSocketServer(
    options: ServerOptions,
    onConnection?: (
        this: Server,
        socket: WebSocket,
        request: IncomingMessage
    ) => any
) {
    const server = new Server(options);

    server.on('connection', (socket, request) => {
        sockets.push(socket);

        socket.on('close', () => sockets.splice(sockets.indexOf(socket), 1));

        console.log(`[WebSocket] ${sockets.length} connections`);

        onConnection?.call(server, socket, request);
    });

    server.on('error', console.error);

    return server;
}

export async function sendSocket(data: any) {
    if (!sockets[0]) console.warn('No socket connected');

    for (const socket of sockets)
        await new Promise<void>((resolve, reject) =>
            socket.send(data, error => (error ? reject(error) : resolve()))
        );
}
