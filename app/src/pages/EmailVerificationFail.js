import { useNavigate } from "react-router-dom";

const EmailVerificationFail = () => {
    const navigate = useNavigate();

    return (
        <div className="content-container">
            <h1>Email verification fail</h1>
            <p>Something went wrong while trying to verify your email.</p>
            <button onClick={() => navigate('/signup')}>Go back to sign up page</button>
        </div>
    )
}

export default EmailVerificationFail;