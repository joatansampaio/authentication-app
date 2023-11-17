import { getDbConnection } from "../db.js";
import { ObjectId } from "mongodb";

export const testRoute = {
    path: '/api/test',
    method: 'get',
    handler: (req, res) => {
        res.status(200).send('It works!');
    },
};

export const getUserById = {
    path: '/api/users/:id',
    method: 'get',
    handler: async (req, res) => {
        const db = getDbConnection('react-auth-db');
        const collection = db.collection('users');
        const { id } = req.params;
        const idMongo = new ObjectId(id);
        const result = await collection.findOne({ _id: idMongo });

        if (result)
            res.json(result);
        res.status(500).json({ message: 'Internal error' });
    }
}