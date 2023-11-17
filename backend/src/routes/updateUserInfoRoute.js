import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db.js';

export const updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;

        //making sure this is all the data we'll get from the request!
        const updates = (({
            favoriteFood,
            hairColor,
            bio,
        }) => ({
            favoriteFood,
            hairColor,
            bio,
        }))(req.body);

        if (!authorization) {
            return res.status(401).json({ message: 'No authorization found!' });
        }

        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Unable to verify user' });

            const { id, isVerified } = decoded;

            if(!isVerified) return res.status(403).json({message: 'You must verify your email prior to using the service!'});

            if (id !== userId) return res.status(403).json({ message: 'Not allowed to update user\'s data.' });
            const db = getDbConnection('react-auth-db');
            const userMongoId = new ObjectId(userId);

            const result = await db.collection('users').findOneAndUpdate(
                { _id: userMongoId }, // filter
                { $set: { info: updates } }, // update
                { returnDocument: "after" }, // options in mongo db
            );

            // returnOriginal is from older version of mongoDB

            console.error(result);
            if (result) {
                const { email, info } = result;

                jwt.sign({ id, email, isVerified, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                    if (err){
                        return res.status(200).json(err);
                    }
                    console.log(token)
                    res.status(200).json({ token });
                })
            } else {
                res.status(500).json({message: 'Internal Error'})
                console.error("Result or email property is undefined");
            }

        });
    }
}