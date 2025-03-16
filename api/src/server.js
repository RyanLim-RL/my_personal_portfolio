import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import contactRouter from "./routes/contactRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/contact', contactRouter)

export default app;


