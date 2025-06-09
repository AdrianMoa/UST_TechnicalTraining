import { createContext } from 'react';
import { type AuthContextType } from './types';

const defaultContext: AuthContextType = {
    user: null,
    login: () => {},
    logout: () => {},
    refreshToken: async () => '',
    isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextType>(defaultContext);