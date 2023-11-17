import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import { UserInfoPage } from "./pages/UserInfoPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PasswordResetPage from "./pages/PasswordResetPage";

const App = () => {

    return (
        <BrowserRouter>
            <div className="page-container">
                <Routes>
                    <Route path="/" element={<UserInfoPage />}/>
                    <Route path="/login" element={<LogInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/verify-email" element={<VerifyEmailPage />} />
                    <Route path="/verify-email/:verificationString" element={<EmailVerificationPage />} />
                    <Route path="/forgot-password/" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password/:passwordResetCode" element={<PasswordResetPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}


export default App;