import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from './services/auth.service';

import './styles.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="form" onSubmit={handleLogin}>
            <form>
                <div className="input-container">
                    <label>Brugernavn</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div className="input-container">
                    <label>Adgangskode</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="button-container">
                    <input type="submit"></input>
                </div>
            </form>
        </div>
    )
}