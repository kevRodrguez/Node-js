import mongooose from 'mongoose';

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static createCollection(arg0: string) {
        throw new Error("Method not implemented.");
    }
    static async connect(options: ConnectionOptions) {
        const { mongoUrl, dbName } = options;
        try {
            await mongooose.connect(mongoUrl, {
                dbName: dbName,
            });
            console.log('Connected to mongo');

        } catch (error) {
            console.log('Error connecting to mongo', error);
            throw error;
        }
    }
}