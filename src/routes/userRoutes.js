const express = require("express");
const {
  getUser,
  updateUserStatus,
  deleteUser,
  createUser,
  UserSignup,
  UserSignin,
  resetPassword,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/signup",UserSignup)
router.post("/signin",UserSignin)
router.post("/forgot",resetPassword)
router.get("/get", getUser);
router.patch("/:id/status", updateUserStatus);
router.delete("/:id", deleteUser);
// router.post("/create",createUser)

module.exports = router;
