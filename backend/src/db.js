import { MongoClient } from 'mongodb';

let client;

export const initializeDbConnection = async (cb) => {
    client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    cb();
}

export const getDbConnection = dbName => {
    const db = client.db(dbName);
    return db
}