import { useNavigate } from "react-router-dom";

const PasswordResetSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="content-container">
            <h1>Success</h1>
            <p>Password has been reset. Please, login with your new password!</p>
            <button onClick={() => navigate('/login')}>Go back to sign up page</button>
        </div>
    )
}

export default PasswordResetSuccess;