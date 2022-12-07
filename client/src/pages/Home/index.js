import React from 'react'
import { Navigate } from 'react-router-dom'
import LoginButton from '../../components/LoginButton'
import { useEffect } from 'react'
import { useAuth } from '../../Context/authContext'

function Home() {

    const { token } = useAuth();

    useEffect(() => {
        let code = new URLSearchParams(window.location.search).get('code');
        if (code && (token === null || undefined)) {
            async function fetchToken() {
                let response = await fetch(`http://localhost:5000/auth?code=${code}`);
                let data = await response.json();
                localStorage.setItem('token', data.access_token);
                window.history.pushState({}, null, '/');
                window.location.reload();
            }

            fetchToken();
        }
    }, []);

    return (
        <div>
            <LoginButton />
            {token && <Navigate to="/dashboard" />}
        </div>
    );
}

export default Home