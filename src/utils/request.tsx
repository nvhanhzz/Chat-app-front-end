import dotenv from "dotenv";
dotenv.config();
const DOMAIN: string = process.env.DOMAIN as string;

export const get = async (path: string): Promise<Response> => {
    try {
        const response = await fetch(DOMAIN + path, {
            method: 'GET',
            credentials: 'include'
        });
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const post = async (path: string, option: Record<string, any>): Promise<Response> => {
    const formData = new FormData();
    for (const key in option) {
        if (option.hasOwnProperty(key)) {
            formData.append(key, option[key]);
        }
    }

    try {
        const response = await fetch(DOMAIN + path, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const patch = async (path: string, option: Record<string, any>): Promise<Response> => {
    const formData = new FormData();
    for (const key in option) {
        if (option.hasOwnProperty(key)) {
            formData.append(key, option[key]);
        }
    }

    try {
        const response = await fetch(DOMAIN + path, {
            method: 'PATCH',
            credentials: 'include',
            body: formData
        });
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const del = async (path: string): Promise<Response> => {
    try {
        const response = await fetch(DOMAIN + path, {
            method: 'DELETE',
            credentials: 'include'
        });
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
