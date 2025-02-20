export type UserData = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    age: number;
    address?: string;
    points: number;
    file_qrcode?: number;
};

export type UsersByScoreData = Record<string, {
    names: string[],
    average_age: number;
}>
