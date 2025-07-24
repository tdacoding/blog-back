import express from "express";
import {
  getPost,
  getPosts,
  addPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
} from "../controllers/index.js";
import { mapPost } from "../helpers/mapPost.js";
import { mapComment } from "../helpers/mapComment.js";
import { authenticated } from "../middlewares/authenticated.js";
import { hasRole } from "../middlewares/hasRole.js";
import { ROLES } from "../constants/roles.js";

export const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { posts, lastPage } = await getPosts(
    req.query.search,
    req.query.limit,
    req.query.page
  );
  res.send({ data: { posts: posts.map(mapPost), lastPage } });
});

router.get("/:id", async (req, res) => {
  const post = await getPost(req.params.id);
  res.send({ data: mapPost(post) });
});

router.post("/:id/comments", authenticated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    author: req.user.id,
    content: req.body.content,
  });
  res.send({ data: mapComment(newComment) });
});

router.delete(
  "/:postId/comments/:commentId",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);
    res.send({ error: null });
  }
);

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const post = await addPost({
    title: req.body.title,
    image: req.body.imageUrl,
    content: req.body.content,
  });
  res.send({ data: mapPost(post) });
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const post = await updatePost(req.params.id, {
      title: req.body.title,
      image: req.body.imageUrl,
      content: req.body.content,
    });
    res.send({ data: mapPost(post) });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deletePost(req.params.id);
    res.send({ error: null });
  }
);
