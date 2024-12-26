const Report = require("../models/Report");

const createReport = async (req, res) => {
  try {
    // const {name, role, description, date, status } = req.body;
    const report = new Report(req.body);
    await report.save();
    res.status(201).json({ message: "Report created successfully" });
    // res.status(200).json(report);
  } catch (error) {
    console.log(error);
  }
};

const getReport = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updateReport = await Report.findOneAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updateReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(updateReport);
  } catch (error) {
    res.status(500).json({ message: "Failed to update report status", error });
  }
};

module.exports = {
  createReport,
  getReport,
  updateStatus,
};
