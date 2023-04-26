import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGOOSE_URI = process.env.MONGOOSE_URI;