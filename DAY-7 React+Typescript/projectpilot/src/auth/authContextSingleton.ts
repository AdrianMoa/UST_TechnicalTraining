import { type AuthContextType } from "./types";

let authContext: AuthContextType;

export const setAuthContext = (context: AuthContextType) => {
    authContext = context;
};

export const getAuthContext = () => {
    if(!authContext) throw new Error('AuthContext no initialized');
    return authContext;
};