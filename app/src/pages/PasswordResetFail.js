import { useNavigate } from "react-router-dom";

const PasswordResetFail = () => {
    const navigate = useNavigate();

    return (
        <div className="content-container">
            <h1>Uh oh...</h1>
            <p>Something went wrong while trying to reset password!</p>
            <button onClick={() => navigate('/login')}>Go back to sign up page</button>
        </div>
    )
}

export default PasswordResetFail;