import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const mongoose_uri = process.env.mongoose_uri;
