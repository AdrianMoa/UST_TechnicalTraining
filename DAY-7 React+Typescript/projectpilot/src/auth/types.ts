export interface User {
    id: string;
    username: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    refreshToken: () => Promise<string>;
    isAuthenticated: boolean;
}