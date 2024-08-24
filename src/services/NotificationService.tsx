const PREFIX_NOTIFICATION: string = import.meta.env.VITE_PREFIX_NOTIFICATION as string;
import { get, patchJson } from "../utils/request";

export type MarkNotificationAsReadData = {
    notificationId: string;
}

export const getNotification = async (): Promise<Response> => {
    try {
        const result = await get(`${PREFIX_NOTIFICATION}/`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const patchMarkNotificationAsRead = async (data: MarkNotificationAsReadData): Promise<Response> => {
    try {
        const result = await patchJson(`${PREFIX_NOTIFICATION}/mark-notification-as-read`, data);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};