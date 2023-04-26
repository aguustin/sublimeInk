import mongoose from "mongoose";
import { MONGOOSE_URI } from "./config.js";

export const dbConnection = async () => {
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGOOSE_URI, {useNewUrlParser: true});
        console.log("db is connected");
    }catch{
        console.log("No se pudo conectar a la base de datos");
    }
}