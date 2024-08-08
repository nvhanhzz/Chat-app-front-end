import { io } from 'socket.io-client';
const SOCKET_URL: string = import.meta.env.VITE_DOMAIN as string;

const socket = io(SOCKET_URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

export default socket;