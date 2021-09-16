import express from "express";

import {
  deleteUser,
  followUser,
  unfollowUser,
  updateUser,
  userDetails,
} from "../controllers/user_controller.js";
const router = express.Router();

//update user
router.put("/:id", updateUser);
//delete  user
router.delete("/:id", deleteUser);
//get a user
router.get("/:id", userDetails);
//follow a user
router.put("/:id/follow", followUser);
//unfollow a user
router.put("/:id/unfollow", unfollowUser);

export default router;
