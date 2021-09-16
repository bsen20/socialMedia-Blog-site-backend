import express from "express";

const router = express.Router();

import { loginUser, registerUser } from "../controllers/auth_controller.js";

router.get("/", (req, res) => {
  res.send("Authentication page");
});

//REGISTER
router.post("/register", registerUser);

//LOGIN
router.post("/login", loginUser);

export default router;
