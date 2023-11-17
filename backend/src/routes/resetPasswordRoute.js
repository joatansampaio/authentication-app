import bcrypt from 'bcrypt';
import { getDbConnection } from '../db.js';

export const resetPasswordRoute = {
    path: '/api/users/:passwordResetCode/reset-password',
    method: 'put',
    handler: async (req, res) => {
        const { passwordResetCode } = req.params;
        const { newPassword } = req.body;

        const db = getDbConnection('react-auth-db');

        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        const result = await db.collection('users').findOneAndUpdate(
            { passwordResetCode: passwordResetCode },
            {
                $set: { passwordHash: newPasswordHash },
                $set: { passwordResetCode: '' }
            },
            {returnDocument: 'after'},
        );


        if (!result) return res.status(404).json({ message: 'The is invalid or has expired!' });

        res.sendStatus(200);
    }
}