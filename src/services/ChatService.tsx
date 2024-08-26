const PREFIX_CHAT: string = import.meta.env.VITE_PREFIX_CHAT as string;
import { get } from "../utils/request";

export const getChatForRoom = async (roomChatId: string): Promise<Response> => {
    try {
        const result = await get(`${PREFIX_CHAT}/${roomChatId}`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getMessageThreads = async (): Promise<Response> => {
    try {
        const result = await get(`${PREFIX_CHAT}/rooms`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};