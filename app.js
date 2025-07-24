import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import { router as routes } from "./routes/index.js";

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api", routes);

mongoose
  .connect("mongodb://user:mongopass@localhost:27017/blog?authSource=admin")
  .then(() => {
    app.listen(port, () => {
      console.log(`server is started on port ${port}`);
    });
  });
