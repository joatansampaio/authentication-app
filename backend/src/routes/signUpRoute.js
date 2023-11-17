import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { v4 as uuidv4} from 'uuid'
import { sendEmail } from './sendEmail.js';

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });

        if (user) {
            res.sendStatus(409);
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const verificationString = uuidv4();

        const startingInfo = {
            favoriteFood: '',
            hairColor: '',
            bio: '',
        };

        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false,
            verificationString,
        });

        const { insertedId } = result;


        try {
            await sendEmail({
                from: 'joatansampaio@live.com',
                to: email,
                subject: 'Email Verification',
                text: 'Thanks for singing up!',
                html: `<b> Please verify your e-mail to continue </b> click here:
                    http://localhost:3000/verify-email/${verificationString}`,
            });
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }


        jwt.sign({
            id: insertedId,
            email,
            info: startingInfo,
            isVerified: false,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '2d',
            },
            (err, token) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).json({ token });
            }
        )
    }
}
