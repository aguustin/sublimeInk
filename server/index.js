import express from "express";
import { PORT } from "./config.js";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import fileUpload from "express-fileupload";
import stickersRoutes from "./routes/stickersRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { dbConnection } from "./database.js";

const app = express();
dbConnection();
//settings

//middlewares
app.use(cors());
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));
app.use(passport.initialize());
app.use(morgan("tiny"));

//routes
app.use(adminRoutes);
app.use(stickersRoutes);

//listen
app.listen(PORT);

console.log("app running in port: ", PORT);
