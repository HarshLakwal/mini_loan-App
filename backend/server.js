import express from "express";
import mongoose from "mongoose";
import { PORT, DB_KEY } from "./config/index.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import errorHandler from "./middleware/errorHandler.js";

//Routes
import userRouter from "./userController/routes/index.js";
import adminRouter from "./adminController/routes/index.js"

mongoose
  .connect(DB_KEY)
  .then(() => {
    console.log("DB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use('/api/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "build")));

const corsOptions = {
  origin: "*",
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(cookieParser())
app.use("/api/user", userRouter);
app.use("/api/admin",adminRouter)
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
  