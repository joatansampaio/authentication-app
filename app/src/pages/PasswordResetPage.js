import { useParams } from 'react-router-dom';
import axios from 'axios';
import PasswordResetSuccess from './PasswordResetSuccess';
import PasswordResetFail from './PasswordResetFail';
import { useState } from 'react';

const PasswordResetPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setisFailure] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const { passwordResetCode } = useParams();

    const onResetClicked = async () => {
        try {
            console.log(passwordResetCode);
            await axios.put(`/api/users/${passwordResetCode}/reset-password`, { newPassword: newPassword });
            setIsSuccess(true);
        } catch (error) {
            setisFailure(true);
        }
    }

    if (isFailure) return <PasswordResetFail />
    if (isSuccess) return <PasswordResetSuccess />

    return (
        <div className="content-container">
            <h1>Reset Password</h1>
            <p>Please, enter a new password</p>
            <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='New Password'
                type='password' />
            <input
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder='Confirm New Password'
                type='password' />
            <button
                disabled={!newPassword || !confirmNewPassword || newPassword !== confirmNewPassword}
                onClick={onResetClicked}
            >Reset Password</button>
        </div>
    )
}

export default PasswordResetPage;