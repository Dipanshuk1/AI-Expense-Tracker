import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
import userRouter from "./user/user.routes.js";
import moragn from "morgan";
const app = express();

//database connection
import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL)
.then(()=>console.log("Database connected !"))
.catch((err)=>console.log("Database connection error:",err));

app.use(cookieParser());
app.use(cors({
  origin: process.env.DOMAIN
}));

//app level middleware
app.use(moragn("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//router level middleware
app.use("/user/api", userRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
