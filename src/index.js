const express = require("express");
const connection = require("./config/connectdb");
const authRoutes = require("./routes/authRoutes");
const lawyerRoutes = require("./routes/lawyerRoutes");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const reportRoutes = require("./routes/reportRoutes");
const path = require("path")
const cors = require("cors");
const app = express();

app.use(cors("*"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connection();

app.use("/upload", express.static("src/fileStorage"));

app.use("/auth", authRoutes);
app.use("/admin", lawyerRoutes);
app.use("/user", userRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/report", reportRoutes);

app.use("/", (req, res) => {
  res.send("Hello World");
});

const port = 7000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
