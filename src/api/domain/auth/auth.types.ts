export interface LoginRequest {
    username?: string;
    password?: string;
}

export interface User {
    username: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}
