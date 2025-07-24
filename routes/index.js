import express from "express";
import { router as authRouter } from "./auth.js";
import { router as postRouter } from "./post.js";
import { router as userRouter } from "./user.js";

export const router = express.Router({ mergeParams: true });

router.use("/", authRouter);
router.use("/posts", postRouter);
router.use("/users", userRouter);
