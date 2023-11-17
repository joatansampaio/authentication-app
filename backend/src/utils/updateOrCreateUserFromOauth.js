import { getDbConnection } from '../db.js';

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
    const {
        id: googleId,
        verified_email: isVerified,
        email,
    } = oauthUserInfo;

    const db = getDbConnection('react-auth-db');
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
        const result = await db.collection('users').findOneAndUpdate(
            { email },
            { $set: { googleId, isVerified } },
            { returnDocument: 'after' },
        );
        console.log(result);
        return result;
    } else {
        const result = await db.collection('users').insertOne({
            email,
            googleId,
            isVerified,
            info: {
                favoriteFood: '',
                hairColor: '',
                bio: '',
            },
        });

        const { insertedId } = result;
        const newUser = await db.collection('users').findOne({ _id: insertedId });

        return newUser;
    }
}