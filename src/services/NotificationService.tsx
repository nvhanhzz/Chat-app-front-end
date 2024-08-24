const PREFIX_NOTIFICATION: string = import.meta.env.VITE_PREFIX_NOTIFICATION as string;
import { get } from "../utils/request";

export const getNotification = async (): Promise<Response> => {
    try {
        const result = await get(`${PREFIX_NOTIFICATION}/`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};