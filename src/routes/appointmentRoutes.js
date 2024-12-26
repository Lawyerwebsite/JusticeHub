const express = require("express");
const { addAppointment, updatestatus, createAppointment, getAllAppointments, getSingleAppointment, updateStatus, reschedule, updateAppointmentforFile, getAppointment } = require("../controllers/appointment.controller");
const router = express.Router();
const admin =require("../middlewares/admin.token")
const singleUpload = require("../middlewares/multer")


router.post("/add",addAppointment);
router.patch("/:id",updatestatus);
router.get("/",getAppointment);

router.route("/add").post(admin.verifyToken,createAppointment)
router.route("/get").get(admin.verifyToken,getAllAppointments)
router.route("/getsingleappointment").get(admin.verifyToken,getSingleAppointment)
router.route("/updatestatus").put(admin.verifyToken,updateStatus)
router.route("/reschedule").put(admin.verifyToken,reschedule);
router.route("/updatefile").put(admin.verifyToken,singleUpload,updateAppointmentforFile);

router.route("/")

module.exports = router;