import mongoose from "mongoose";
import validator from "validator";

const CommentSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", CommentSchema);
