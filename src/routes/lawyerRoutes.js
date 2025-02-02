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
  getAdmin,
  getAdminForUser,
  getAllAdmin,
  totalappointment,
  Dashboard,

} = require("../controllers/lawyer.controller");
const singleUpload = require("../middlewares/multer")
const appointmentController = require("../controllers/appointment.controller");
const { verifyToken } = require("../middlewares/admin.token");

const router = express.Router();
//super Admin
router.post("/signup", lawyerSignup);
router.get("/", getAllLawyer);
router.delete("/:id", deleteLawyer);
router.put("/deactivate/:id",deactiveLawyer);

//Admin
router.post("/login",adminSignin ); 
router.post("/resetpassword",adminResetpass)
router.get("/lawyers/",getadminprofile);
router.get("/lawyerforuser/",getAdminForUser);
router.put("/lawyerprofile/:id",updateAdmin);
router.post("/lawyers",Saveprofile);
router.put("/update",singleUpload,updateprofile )
router.get("/lawyerprofile",getprofileid);
router.get("/getadmin", getAdmin)
router.get("/get", getAllAdmin)
router.post("/create", verifyToken, appointmentController.createAppointment)
router.get("/count/:lawyerId",verifyToken,totalappointment  )
router.get("/dash",verifyToken,Dashboard)



module.exports = router;
