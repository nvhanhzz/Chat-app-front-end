const DOMAIN: string = import.meta.env.VITE_DOMAIN as string;
const PREFIX_API: string = import.meta.env.VITE_PREFIX_API as string;

export const get = async (path: string): Promise<Response> => {
    try {
        const response = await fetch(DOMAIN + PREFIX_API + path, {
            method: 'GET',
            credentials: 'include'
        });
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const postJson = async (path: string, data: Record<string, any>): Promise<Response> => {
    try {
        const response = await fetch(DOMAIN + PREFIX_API + path, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const postFormData = async (path: string, data: Record<string, any>): Promise<Response> => {
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }

    try {
        const response = await fetch(DOMAIN + PREFIX_API + path, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const patchJson = async (path: string, data: Record<string, any>): Promise<Response> => {
    try {
        const response = await fetch(DOMAIN + PREFIX_API + path, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const patchFormData = async (path: string, data: Record<string, any>): Promise<Response> => {
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }

    try {
        const response = await fetch(DOMAIN + PREFIX_API + path, {
            method: 'PATCH',
            credentials: 'include',
            body: formData,
        });
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const del = async (path: string): Promise<Response> => {
    try {
        const response = await fetch(DOMAIN + PREFIX_API + path, {
            method: 'DELETE',
            credentials: 'include'
        });
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};