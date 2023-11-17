import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken';
import { getDbConnection } from "../db.js";

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        const { verificationString } = req.body;

        const db = await getDbConnection('react-auth-db');
        const collection = db.collection('users');

        const result = await collection.findOne({ verificationString: verificationString });
        if (!result) return res.status(401).json({ message: 'No user was found with this verification string' });


        const { _id: id, email, info } = result;

        await collection.updateOne({ _id: new ObjectId(id) }, {
            $set: { isVerified: true },
        });

        jwt.sign({ id, email, isVerified: true, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
            if (err) return res.sendStatus(500);
            res.status(200).json({ token });
        });


    }
}