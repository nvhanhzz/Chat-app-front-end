const PREFIX_CHAT: string = import.meta.env.VITE_PREFIX_CHAT as string;
import { get } from "../utils/request";

export const getChat = async (): Promise<Response> => {
    try {
        const result = await get(`${PREFIX_CHAT}/`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};