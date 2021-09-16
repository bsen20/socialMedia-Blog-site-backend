import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";

// connection to data base
dotenv.config();
const Connection = async () => {
  try {
    const URL = process.env.URL;
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Data base connected successfully");
  } catch (error) {
    console.log("Error while connection MongoDB", error);
  }
};
Connection();

const app = express();

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//routes
app.get("/", (req, res) => {
  res.send("hello from simple server homepage :)");
});
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

//listener
app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});
