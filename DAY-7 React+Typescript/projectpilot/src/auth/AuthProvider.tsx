import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import { type User } from './types';
import axios from 'axios';
import { setAuthContext } from './authContextSingleton';

interface Props {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decoded: any = jwtDecode(token);
        setUser({ id: decoded.sub, username: decoded.username, email: decoded.email });
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    const refreshToken = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/refresh', {}, {
                withCredentials: true
            });
            const { access_token } = response.data;
            login(access_token); //reusing login to decode jwt
            return access_token;
        } catch (err) {
            logout();
            throw err;
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            try{
                const decoded: any = jwtDecode(token);
                setUser({ id: decoded.sub, username: decoded.username, email: decoded.email });
            } catch {
                logout();
            }
        }
    }, []);

    useEffect(() => {
        setAuthContext({ user, login, logout, isAuthenticated: !!user, refreshToken});
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};