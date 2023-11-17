import { useNavigate } from "react-router-dom";

const EmailVerificationSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="content-container">
            <h1>Success</h1>
            <p>Thanks for verifying your email!</p>
            <button onClick={() => navigate('/')}>Go to dashboard</button>
        </div>
    )
}

export default EmailVerificationSuccess;