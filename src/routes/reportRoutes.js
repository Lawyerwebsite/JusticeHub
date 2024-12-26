const express = require("express");
const { getReport, updateStatus, createReport } = require("../controllers/report.controller");
const router = express.Router();

router.post("/", createReport);
router.get("/", getReport);
router.put("/:id", updateStatus);

module.exports = router;
