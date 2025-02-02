const express = require("express");
const {
  addAppointment,
  updatestatus,
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateStatus,
  reschedule,
  updateAppointmentforFile,
  getAppointment,
  getAppointmentsForLawyer,
  getallAppointment,
} = require("../controllers/appointment.controller");

const router = express.Router();
const admin = require("../middlewares/admin.token");
const user = require("../middlewares/userAuthToken");
const singleUpload = require("../middlewares/multer");

// Public Routes
router.post("/add", addAppointment); // Adds an appointment (no token validation here)
router.get("/", getAppointment);    // Gets all appointments (public)

// User-Specific Routes
router.route("/add").post(user.verifyToken, createAppointment);

// Admin-Specific Routes
router .route("/gets").get(admin.verifyToken,getallAppointment);
router.route("/get").get(admin.verifyToken, getAllAppointments);
router.route("/getsingleappointment").get(admin.verifyToken, getSingleAppointment);
router.route("/updatestatus").put(admin.verifyToken, updateStatus);
router.route("/reschedule").put(admin.verifyToken, reschedule);
router.route("/updatefile").put(admin.verifyToken, singleUpload, updateAppointmentforFile);

// Lawyer-Specific Routes
router.route("/single").get(admin.verifyToken, getAppointmentsForLawyer); // Uses `req.query` for filtering

// Specific Appointment Updates
router.patch("/:id", updatestatus); // Updates status by ID (general, public route)


module.exports = router;
