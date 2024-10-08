export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export interface User {
    _id: string,
    avatar: string,
    fullName: string,
    coverImage: string,
    description: string,
    email: string,
    phone: string,
    slug: string
}

export const setCurrentUser = (user: User | null) => ({
    type: SET_CURRENT_USER,
    user: user
});