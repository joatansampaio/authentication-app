import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import EmailVerificationFail from "./EmailVerificationFail";
import EmailVerificationSuccess from "./EmailVerificationSuccess";

const EmailVerificationPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const { verificationString } = useParams();
    const [, setToken] = useToken();

    useEffect(() => {
        const loadVerification = async () => {
            try {
                const response = await axios.put('/api/verify-email', { verificationString });
                console.log(response);
                const { token } = response.data;
                setToken(token);
                setIsSuccess(true);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsSuccess(false);
                setIsLoading(false);
            }
        }

        loadVerification();
    }, [setToken, verificationString]);

    if (isLoading) return <div>Loading...</div>;
    if (!isSuccess) return <EmailVerificationFail />
    return <EmailVerificationSuccess />

}

export default EmailVerificationPage;