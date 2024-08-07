const PREFIX_AUTH: string = import.meta.env.VITE_PREFIX_AUTH as string;
import { get, postJson } from "../utils/request";

export const getCheckLoggedIn = async (): Promise<Response> => {
    try {
        const result = await get(`${PREFIX_AUTH}/checkLoggedIn`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCurrentUser = async (): Promise<Response> => {
    try {
        const result = await get(`${PREFIX_AUTH}/currentUser`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const postRegister = async (option: Record<string, any>): Promise<Response> => {
    try {
        const result = await postJson(`${PREFIX_AUTH}/register`, option);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const postLogin = async (option: Record<string, any>): Promise<Response> => {
    try {
        const result = await postJson(`${PREFIX_AUTH}/login`, option);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const postLogout = async (option: Record<string, any>): Promise<Response> => {
    try {
        const result = await postJson(`${PREFIX_AUTH}/logout`, option);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};