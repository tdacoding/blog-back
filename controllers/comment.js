import { Comment, Post } from "../models/index.js";

//add
export const addComment = async (postId, comment) => {
  const newComment = await Comment.create(comment);
  await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });
  await newComment.populate("author");
  return newComment;
};

//delete
export const deleteComment = async (postId, commentId) => {
  await Comment.deleteOne({ _id: commentId });
  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
};
