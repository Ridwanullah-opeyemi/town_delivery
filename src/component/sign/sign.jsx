import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sign.css'; 
// No dotenv import needed

function LoginPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [acknowledged, setAcknowledged] = useState(false);

    const navigate = useNavigate();

    // ✅ FIX: Use import.meta.env with VITE_ prefix
    const conName = import.meta.env.VITE_ADMIN_NAME; 
    const conPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Fallback for demonstration if .env isn't set up yet:
        const requiredName = conName; 
        const requiredPassword = conPassword;

        if (name === requiredName && password === requiredPassword) {
            setLoggedIn(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleAcknowledge = () => {
        setAcknowledged(true);

        // 🔑 KEY FIX: Programmatically navigate to the /main route
        navigate('/main');
    };

    if (!loggedIn) {
        return (
            // Apply the main background class
            <div className="login-page">
                {/* Apply the container class */}
                <div className="login-container">
                    <h1>Admin Login</h1>
                    {/* Apply the form class */}
                    <form onSubmit={handleSubmit} className="login-form">
                        <label>
                            Name:
                            {/* Added autocomplete for accessibility */}
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="username" />
                        </label>
                        <label>
                            Password:
                            {/* Added autoComplete for accessibility */}
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                        </label>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        );
    } else if (!acknowledged) {
        return (
            <div className="login-page">
                <div className="login-container">
                    <h1>Acknowledgement</h1>
                    <p>Please acknowledge that you are logged in.</p>
                    <button onClick={handleAcknowledge}>Acknowledge</button>
                </div>
            </div>
        );
    }

    return null;
}

export default LoginPage;
