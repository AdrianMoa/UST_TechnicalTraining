import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const Register = () => {
    const [form, setForm] = useState({ username: '', email: '', password: ''});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/auth/signup', form);
            alert('User successfully registered.');
            navigate('/login');
        } catch (error) {
            alert('Error registering new user.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input name='username' placeholder='Username' value={form.username} onChange={handleChange} required />
            <input name='email' placeholder='Email' value={form.email} onChange={handleChange} required  type="email" />
            <input name='email' placeholder='Password' value={form.password} onChange={handleChange} required  type="password" />
            <button type="submit">Sign up</button>
        </form>
    );
};