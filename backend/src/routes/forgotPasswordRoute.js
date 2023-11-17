import { v4 as uuid } from 'uuid';
import { sendEmail } from './sendEmail.js';
import { getDbConnection } from '../db.js';

export const forgotPasswordRoute = {
    path: '/api/forgot-password/:email',
    method: 'put',
    handler: async (req, res) => {
        const { email } = req.params;

        const db = getDbConnection('react-auth-db');
        const passwordResetCode = uuid();

        const result  = await db.collection('users').updateOne({ email },
            { $set: { passwordResetCode } });

        if (result.modifiedCount > 0) {
            try {
                await sendEmail({
                    from: 'joatansampaio@live.com',
                    to: 'joatansampaio@live.com',
                    subject: 'Password Reset',
                    text: 'Password Reset',
                    html: `
                        To reset your password, click the link below:
                        http://localhost:3000/reset-password/${passwordResetCode}
                    `,
                });
            } catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        }
        res.sendStatus(200);
    }

}