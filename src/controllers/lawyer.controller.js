const Lawyer = require("../models/lawyerModel");
const { passwordGenerate } = require("../utils/generator");
const sendMailToUser = require("../utils/adminEmailSend");
const { generateToken } = require("../middlewares/authToken");
const bcrypt = require("bcrypt");
const fs = require("fs");

const lawyerSignup = async (req, res) => {
  try {
    const { name, email } = req.body;
    const existingUser = await Lawyer.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "Email already exists",
      });
    }
    const password = passwordGenerate(8);
    const hashedPassword = await bcrypt.hash(password, 10);
    let data = {
      ...req.body,
      password: hashedPassword,
    };
    const newLawyer = await Lawyer.create(data);
    await sendMailToUser.sendMailToLawyer(name, email, password);
    res.status(201).json({
      newLawyer,
      message: "Lawyer created successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const findEmail = await Lawyer.findOne({ email });
    console.log(findEmail);
    if (!findEmail)
      return res.status(400).json({ message: "Email Not Register..." });
    const findPassword = await bcrypt.compare(password, findEmail.password);
    if (!findPassword)
      return res.status(400).json({ message: "Incorrect Password..." });
    const token = await generateToken(findEmail);
    console.log(token);

    res.json({ token, message: " SignIn Successfull...", findEmail });
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};

const adminResetpass = async (req, res) => {
  try {
    const { email, newPassword, conformPassword } = req.body;
    if (newPassword !== conformPassword)
      return res.status(400).json({ Message: "Password does not matched..." });
    const findEmail = await Lawyer.findOne({ email });
    if (!findEmail)
      return res.status(400).json({ Message: "Email Not Register..." });
    const hash = await bcrypt.hash(newPassword, 10);
    let data = {
      ...req.body,
      password: hash,
    };
    await Lawyer.updateOne({ email: findEmail.email }, data);
    res.json({
      Message: "Password Updated Sucessfully......",
    });
  } catch (error) {
    res.json({ Message: error.Message });
  }
};

const getSingleAdmin = async (req, res) => {
  try {
    let { _id } = req.query;
    let userData = req.userData;

    let singleAdmin;
    if (_id) {
      singleAdmin = await Lawyer.findById(_id);
      console.log(singleAdmin);
    } else {
      singleAdmin = await Lawyer.findById(userData._id);
    }

    if (!singleAdmin) {
      return res.status(404).json({ Message: "Admin Not Found" });
    }
    res.json({ singleAdmin, Message: "Success....." });
  } catch (err) {
    res.json({ Error: err.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    let { _id } = req.query;
    let newFile = req.file;
    let file = req.file;
    let data = {
      ...req.body,
    };
    if (newFile) {
      const oldFile = await Lawyer.findById(_id);
      if (!oldFile) {
        return res.status(404).json({ Message: "Data Not Found.." });
      }
      if (oldFile.fileOrginalName) {
        fs.unlinkSync(`${oldFile.filePath}/${oldFile.fileName}`);
        data.fileName = newFile.filename;
        data.filePath = newFile.destination;
        data.fileType = newFile.mimetype;
        data.fileOrginalName = newFile.originalname;
      } else {
        data = {
          ...data,
          filePath: file.destination,
          fileOriginalName: file.originalname,
          fileName: file.filename,
          fileType: file.mimetype,
        };
      }
    }
    const updatedData = await adminModel.createAdminModel.findByIdAndUpdate(
      _id,
      data,
      { new: true }
    );

    res.json({ updatedData, Message: "Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({
      Error: error.message,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    let { _id } = req.query;

    const deleted = await Lawyer.findByIdAndDelete(_id);
    if (!deleted) {
      return res.json({ Message: "Admin Not Found..." });
    }
    res.json({ Message: "Deleted successfully..." });
  } catch (err) {
    res.json({ Error: err.message });
  }
};

const getadminprofile = async (req, res) => {
  try {
    // const { userId } = req.params;
    const lawyers = await Lawyer.find();
    res.status(200).json(lawyers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lawyer", error });
  }
};

const getAdmin = async (req, res) => {
  try {
    const id = req.query;
    const getProfile = await Lawyer.findOne({ _id: id });
    if (!getProfile) {
      return res.json({ Message: "Admin Not Found..." });
    }
    res.status(200).json(getProfile);
  } catch (error) {
    error: error.message;
  }
};

const getprofileid = async (req, res) => {
  try {
    const { _id } = req.query;
    const lawyers = await Lawyer.findOne({ _id: _id });
    res.status(200).json(lawyers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lawyer", error });
  }
};

const updateprofile = async (req, res) => {
  try {
    const { id } = req.query;
    let file = req.file;
    let newFile = req.file;
    console.log("file", file);
    console.log("newfile",newFile);
  
    let data = {
      ...req.body,
    };
    console.log("data", data);

    if (newFile) {
      const oldFile = await Lawyer.findById({ _id: id });
      if (!oldFile) {
        return res.status(404).json({ Message: "Data Not Found.." });
      }
      if (oldFile.fileName) {
        fs.unlinkSync(`${oldFile.filePath}`);

        data.fileName = newFile.filename;
        data.filePath = newFile.path;
        data.fileType = newFile.mimetype;
        data.fileOriginalName = newFile.originalname;
      } else {
        data = {
          ...data,

          fileName: file.filename,
          filePath: file.path,
          fileType: file.mimetype,
          fileOriginalName: file.originalName,
        };
      }
    }
    // const updatedData = data;
    const updatedprofile = await Lawyer.findByIdAndUpdate(
      id,
      // updatedData,
      data,
      {
        new: true,
      }
    );
    res.status(200).json({updatedprofile, message: "Profile Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating data", error });
  }
};

const Saveprofile = async (req, res) => {
  try {
    const lawyers = new Lawyer(req.body);
    await lawyers.save();
    res.status(201).json(lawyers);
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
};

const updatePhoto = async (req, res) => {
  try {
    let { objId } = req.query;
    let file = req.file;
    let newFile = req.file;

    let data = {
      ...req.body,
    };

    if (newFile) {
      const oldFile = await admin_data.findById({ _id: objId });

      if (!oldFile) {
        return res.status(404).json({ Message: "Data Not Found.." });
      }
      if (oldFile.profileFileName) {
        fs.unlinkSync(`${oldFile.filePath}`);

        data.profileFileName = newFile.filename;
        data.filePath = newFile.path;
        data.fileType = newFile.mimetype;
      } else {
        data = {
          ...data,
          profileFileName: file.filename,
          filePath: file.path,
          fileType: file.mimetype,
        };
      }
    }
    const updatedAdmin = await admin_data.findByIdAndUpdate(objId, data, {
      new: true,
    });

    res.status(200).json({
      updatedAdmin,
      message: "Admin profile updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const todaysAppointments = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const todaysAppointments = await appointmentmodel.find({ date: today });
    res.json({
       count: todaysAppointments.length,
       data: todaysAppointments });
  } catch (error) {
    res.status(500).json({ error: "Error fetching today's appointments" });
  }
};

const getPendingAppointments = async (req, res) => {
  try {
    const pendingAppointments = await Appointment.find({
      status: "pending", 
    });

    res.status(200).json({ count: pendingAppointments.length || 0 });
  } catch (err) {
    res.status(500).json({ error: "Error fetching pending appointments." });
  }
};

const getTotalClients = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments(); 

    res.status(200).json({ count: totalClients || 0 });
  } catch (err) {
    res.status(500).json({ error: "Error fetching total clients." });
  }
};

const getTotalIncome = async (req, res) => {
  try {
    const totalIncome = await Appointment.aggregate([
      {
        $match: { status: "completed" },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$fee" }, 
        },
      },
    ]);

    const total = totalIncome[0]?.total || 0;

    res.status(200).json({ total });
  } catch (err) {
    res.status(500).json({ error: "Error calculating total income." });
  }
};

const getAllLawyer = async (req, res) => {
  try {
    const findAdmin = await lawyer.find();
    res.json(findAdmin);
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};

const updateLawyer = async (req, res) => {
  try {
    let { id } = req.params;
    const updates = req.body;
    const updateAdmin = await lawyer.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updateAdmin) {
      return res.status(404).json({ message: "Data not Found.." });
    }
    res.json({ updateAdmin, message: "Data Updated Successfully" });
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};

const deleteLawyer = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);

    const deleteAdmin = await lawyer.findByIdAndDelete(id);
    if (!deleteAdmin) {
      return res.status(404).json({ message: "Admin not Found.." });
    }
    res.json({ deleteAdmin, message: "Admin deleted successfully" });
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};

const deactiveLawyer = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await lawyer.findByIdAndUpdate(id, {status: "deactivated" });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found"})
    }
    res.json({ admin, message: "Admin deactivated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  lawyerSignup,
  getAllLawyer,
  updateLawyer,
  deleteLawyer,
  deactiveLawyer,
  adminSignin,
  adminResetpass,
  updateAdmin,
  deleteAdmin,
  getSingleAdmin,
  getadminprofile,
  updateprofile,
  Saveprofile,
  getprofileid,
  updatePhoto,
  getAdmin,
  todaysAppointments,
  getTotalClients,
  getTotalIncome,
  getPendingAppointments,
};
