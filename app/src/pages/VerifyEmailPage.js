import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(()=> {
            navigate('/');
        }, 3000);
    }, [navigate])

    return (
        <div className="content-container">

            <h1>Thank you for signing up</h1>
            <p>A verification email has been sent to the provided email, please verify before using the service.</p>

        </div>
    )
}

export default VerifyEmailPage;