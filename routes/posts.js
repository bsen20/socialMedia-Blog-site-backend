import express from "express";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllCommentsOnPost,
  getParticularPost,
  getTimelinePosts,
  likePost,
  updatePost,
} from "../controllers/post_controller.js";

const router = express.Router();

//create a post
router.post("/", createPost);
//update a post
router.put("/:id", updatePost);
//delete a post
router.delete("/:id", deletePost);
//like dislike a post
router.put("/:id/like", likePost);
//get a post
router.get("/:id", getParticularPost);
//get timeline posts
router.get("/timeline/all", getTimelinePosts);
//write comments on post
router.post("/:id/comment", commentOnPost);
//get all comments of a post
router.get("/:id/comment/all", getAllCommentsOnPost);

export default router;
