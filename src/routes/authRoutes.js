const express = require("express");
const {
  superAdminSignup,
  superLogin,
  superAdminForgotPassword,
  getSuperAdmin,
  createSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,

} = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/authToken");
const singleUpload = require("../middlewares/multer");

const router = express.Router();

router.post("/signup", superAdminSignup);
router.post("/login", superLogin);
router.get("/forgot", superAdminForgotPassword);
router.get("/",getSuperAdmin);
router.post("/", singleUpload, createSuperAdmin);
router.put("/update", singleUpload, updateSuperAdmin);
router.delete("/:id",deleteSuperAdmin)


// router.get("/index", verifyToken, (req,res) => {
//     res.send("Welcome to the dashboard", req.user);
// })

module.exports = router;
