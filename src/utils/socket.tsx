import { io, Socket } from 'socket.io-client';

const SOCKET_URL: string = import.meta.env.VITE_DOMAIN as string;

let socket: Socket | null = null;

const getSocket = (): Socket => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            }
        });

        socket.on('connect', () => {
            console.log('Connected to socket');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from socket');
            socket = null;
        });
    }

    return socket;
};

export default getSocket;
