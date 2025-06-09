import { useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/auth/signin', {
            email,
            password,
        });
        login(response.data.accessToken);
        navigate('/projects');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};