const PREFIX_USER: string = import.meta.env.VITE_PREFIX_USER as string;
import { get } from "../utils/request";

export const getFriendSuggest = async (): Promise<Response> => {
    try {
        const result = await get(`${PREFIX_USER}/suggest-friend`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getListReciveFriendRequests = async (): Promise<Response> => {
    try {
        const result = await get(`${PREFIX_USER}/recive-friend-request`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getListSentFriendRequests = async (): Promise<Response> => {
    try {
        const result = await get(`${PREFIX_USER}/sent-friend-request`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getFriendList = async (): Promise<Response> => {
    try {
        const result = await get(`${PREFIX_USER}/friend-list`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};