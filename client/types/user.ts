export interface InfoUser {
    _id: string;
    username: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    address: string;
}

export type UserStatus = 'active' | 'disabled';