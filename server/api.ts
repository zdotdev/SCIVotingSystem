import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import ServerlessHttp from "serverless-http";

// middleware
import credentials from "./middlewares/credentials";
import corsOptions from "./configs/corsOptions";
import { globalErrorHandler } from "./utils/error";

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(globalErrorHandler);

// routes

// mongoose
mongoose.connect(process.env.MONGODB_URI as string).then(() => { console.log("Connected to MongoDB") }).catch((err) => console.log(err));

app.listen(3001, () => {
    console.log("Server is running on port 3000");
})

export const handler = ServerlessHttp(app);