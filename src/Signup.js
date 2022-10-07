import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from './services/user.service';

import './styles.css';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUser(username, password);
            navigate('/login');
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="form" onSubmit={handleSignup}>
            <form>
                <div className="input-container">
                    <label>Brugernavn</label>
                    <input className='username' value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div className="input-container">
                    <label>Adgangskode</label>
                    <input className='password' value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="button-container">
                    <input type="submit" className='login' value="Opret bruger"></input>
                    <input className='userbutton' value="Tilbage" onClick={() => navigate('/login')}></input>
                </div>
            </form>
        </div>
    )
}