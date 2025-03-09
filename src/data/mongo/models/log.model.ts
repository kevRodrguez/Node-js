import mongoose from "mongoose";

/**
    level: LogSeverityLevel; //enum
    message: string;
    createdAt?: Date;
    origin: string;
*/

//modelos para la base de datos de mongo, el modelo es para saber com interactuar con mongo

const logSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export const LogModel = mongoose.model('Log', logSchema); //nombre de la coleccion (tabla) y el esquema