import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import passport from "passport";
import { PORT } from "./config.js";
import { connectionDB } from "./database.js";
import stickersRoutes from './routes/stickersRoutes.js';

const app = express();
connectionDB();
//settings

//middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}))

app.use(passport.initialize());
app.use(passport.authenticate());

app.use(morgan('tiny'));

//routes
app.use(stickersRoutes);

//listening
app.listen(PORT);

console.log("server in port: ", PORT);
