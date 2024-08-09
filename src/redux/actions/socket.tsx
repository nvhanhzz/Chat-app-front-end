export const OPEN = 'OPEN';
export const CLOSE = 'CLOSE';

export const openSocket = () => ({
    type: OPEN
});

export const closeSocket = () => ({
    type: CLOSE
});