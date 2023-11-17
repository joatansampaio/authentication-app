import { useState } from "react";
import { useToken } from "../auth/useToken";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUpPage = () => {
    const [token, setToken] = useToken();
    const [error, setError] = useState('');
    
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    const navigate = useNavigate();

    const onSignUpClicked = async () => {
        const response = await axios.post('/api/signup', {
            email: emailValue,
            password: passwordValue,
        });

        const { token } = response.data;
        setToken(token);
        navigate('/verify-email');
    }

    return (
        <>
            <div className="content-container">
                <h1>Sign Up</h1>
                {error && <div className="fail"> {error} </div>}
                <input
                    type="text"
                    value={emailValue}
                    onChange={e => setEmailValue(e.target.value)}
                    placeholder="someone@gmail.com" />
                <input
                    type="password"
                    placeholder="Password"
                    value={passwordValue}
                    onChange={e => setPasswordValue(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPasswordValue}
                    onChange={e => setConfirmPasswordValue(e.target.value)}
                />
                <hr />
                <button
                    onClick={onSignUpClicked}
                    disabled={!emailValue || !passwordValue || (confirmPasswordValue != passwordValue)}
                >Sign Up</button>
                <button onClick={() => navigate('/login')}>Already have an account? Sign Up</button>
            </div>
        </>
    )
}

export default SignUpPage;