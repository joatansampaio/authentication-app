import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useQueryParams } from "../util/useQueryParams";

const LogInPage = () => {

    const [, setToken] = useToken();

    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [googleOauthUrl, setGoogleOauthUrl] = useState('');
    const { token: oauthToken } = useQueryParams();

    const navigate = useNavigate();


    useEffect(() => {
        if (oauthToken) {
            setToken(oauthToken);
            navigate('/');
        }
    }, [oauthToken, setToken, navigate]);

    useEffect(() => {
        const loadOauthUrl = async () => {
            try {
                const response = await axios.get('/auth/google/url');
                const { url } = response.data;
                setGoogleOauthUrl(url);
            } catch (e) {
                setError(e.message);
            }
        }

        loadOauthUrl();
    }, []);

    const onLogInClicked = async () => {
        try {
            const response = await axios.post('/api/login', {
                email: email,
                password: password,
            });
            const { token } = response.data;

            setToken(token);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    }

    const handleGoogleoAuth = async () => {
        window.location.href = googleOauthUrl;
    }

    return (
        <>
            <div className="content-container">
                <h1>Log In</h1>
                {error && <div className="fail"> {error} </div>}
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="someone@gmail.com" />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <hr />
                <button
                    onClick={onLogInClicked}
                    disabled={!email || !password}
                >Log In</button>
                <button onClick={() => navigate('/forgot-password')}>Forget your password?</button>
                <button onClick={() => navigate('/signup')}>Don't have an account? Sign Up</button>
                <button
                    disabled={!googleOauthUrl}
                    onClick={handleGoogleoAuth}>Log in with Google</button>
            </div>
        </>
    )
}

export default LogInPage;