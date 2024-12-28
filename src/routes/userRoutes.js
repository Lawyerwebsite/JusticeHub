const express = require("express");
const {
  getUser,
  updateUserStatus,
  deleteUser,
  createUser,
  UserSignup,
  UserSignin,
  resetPassword,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/user.controller");
const singleUpload = require("../middlewares/multer")
const router = express.Router();

router.post("/signup",UserSignup)
router.post("/signin",UserSignin)
router.post("/forgot",resetPassword)
router.get("/get", getUser);
router.patch("/:id/status", updateUserStatus);
router.delete("/:id", deleteUser);
// router.post("/create",createUser)


router.get('/profile', getProfile);
router.put('/profile', singleUpload, updateProfile);
router.delete('/profile', deleteProfile);

module.exports = router;
