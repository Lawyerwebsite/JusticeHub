const express = require("express");
const {
  lawyerSignup,
  getAllLawyer,
  deleteLawyer,
  deactiveLawyer,
  adminSignin,
  adminResetpass,
  getadminprofile,
  updateAdmin,
  Saveprofile,
  updateprofile,
  getprofileid,
  updatePhoto,
  todaysAppointments,
  getAdmin,
} = require("../controllers/lawyer.controller");
const singleUpload = require("../middlewares/multer")

const router = express.Router();
//super Admin
router.post("/signup", lawyerSignup);

router.get("/", getAllLawyer);
router.delete("/:id", deleteLawyer);
router.put("/deactivate/:id",deactiveLawyer);

//Admin
router.post("/login",adminSignin );
router.post("/resetpassword",adminResetpass)
router.get("/appointmentstoday",todaysAppointments); 
router.get("/lawyers/",getadminprofile);
router.put("/lawyerprofile/:id",updateAdmin);
router.post("/lawyers",Saveprofile);
router.put("/update",singleUpload,updateprofile )
router.get("/lawyerprofile",getprofileid);
router.get("/getadmin", getAdmin)


module.exports = router;
