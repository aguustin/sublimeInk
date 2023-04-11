import mongoose from "mongoose";
import { mongoose_uri } from './config.js';

export const connectionDB = async () => {

    try {
        mongoose.set('strictQuery',false);
        await mongoose.connect(mongoose_uri, {useNewUrlParser: true});
        console.log("conectado a base de datos ");
    } catch (error) {
        console.log("No se pudo conectar a la base de datos");
    }
}