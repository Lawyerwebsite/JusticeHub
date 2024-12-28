const appointment = require("../models/appointments");
const fs = require("fs");

const addAppointment = async (req, res) => {
  try {
    const newAppointment = new appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const getAppointment = async (req, res) => {
  try {
    const appointments = await appointment.find();
    res.json(appointments);
  } catch (error) {
    res.json({ Error: error.message });
  }
};
const updatestatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedAppointment = await appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updatedAppointment);
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const createAppointment = async (req, res) => {
  try {
    console.log(req.body);

    const data = req.body;
    const createdAppointment = await appointment.create(data);

    if (!createAppointment) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    res.json({ createdAppointment, message: "Successfully created....." });
  } catch (err) {
    console.log(err.message);

    res.json({ Error: err.message});
}
}

// const createAppointment = async (req, res) => {
//     const {
//       userId,
//       name,
//       email, 
//       number,
//       address,
//       date,
//       time,
//       category,
//       discribe
//     } = req.body;

//     if (paymentStatus !== "Success") {
//       return res.status(400).json({ success:false, message: "Payment failed, appointment not booked." });
//     }

//       try {
//         const formattedDate = typeof date === "string" ? date.split("T")[0] : new Date(date).toISOString().split("T")[0];

//         const newAppointment = new appointment({
//           userId,
//       name,
//       email, 
//       number,
//       address,
//       date: formattedDate,
//       time,
//       category,
//       discribe
//         });
//         await newAppointment.save();
//         res.json({ success: true, message: "Appointment booked successfully" });
//       } catch (error) {
//         console.error("Error creating appointment:",error);
//         res.status(500).json({ success:false, message: "Failed to book appointment." });
//       }
// };

const getAllAppointments = async (req, res) => {
  let userData = req.userData;

  try {
    const appointments = await appointment.find();
    console.log(appointments);
    

    if (appointments.length === 0) {
      return res.status(404).json({ Message: "Data Not Found" });
    }
    const category = userData.category.toLowerCase();
    const allAppointments = appointments.filter(
      (appointment) => appointment.category == category
    );
    res.json({ allAppointments, Message: "Successfully fetched....." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ Error: err.message });
  }
};

const getSingleAppointment = async (req, res) => {
  let { _id } = req.query;
  console.log(_id);

  try {
    const appointments = await appointment.findById(_id);

    if (!appointments) {
      return res.status(404).json({ Message: "Data Not Found" });
    }
    res.json({ appointments, Message: "Successfully fetched....." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ Error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    let { _id } = req.query;
    let data = req.body;
    const updatedAppointment = await appointment.findByIdAndUpdate(_id, data, {
      new: true,
    });
    if (!updatedAppointment) {
      return res.status(404).json({ Message: "Data Not Found" });
    }
    res.json({ updatedAppointment, Message: "Status Updated Successfully..." });
  } catch (err) {
    res.json({ Error: err.message });
  }
};

const reschedule = async (req, res) => {
  try {
    let { _id } = req.query;
    let data = req.body;
    const updatedAppointment = await appointment.findByIdAndUpdate(_id, data, {
      new: true,
    });
    if (!updatedAppointment) {
      return res.status(404).json({ Message: "Data Not Found" });
    }
    res.json({ updatedAppointment, Message: "Rescheduled Successfully..." });
  } catch (err) {
    res.json({ Error: err.message });
  }
};

const updateAppointmentforFile = async (req, res) => {
  try {
    let { _id } = req.query;
    let newFile = req.file;
    // let file = req.file;
    let data = {
      ...req.body,
    };

    if (newFile) {
      const oldFile = await appointment.findById(_id);
      if (!oldFile) {
        return res.status(404).json({ Message: "Data Not Found.." });
      }
      if (oldFile.filePath) {
        fs.unlinkSync(`${oldFile.filePath}/${oldFile.fileName}`);
        data.fileName = newFile.filename;
        data.filePath = newFile.destination;
        data.fileType = newFile.mimetype;
        data.fileOrginalName = newFile.originalname;
      } else {
        data = {
          ...data,
          filePath: newFile.destination,
          fileOriginalName: newFile.originalname,
          fileName: newFile.filename,
          fileType: newFile.mimetype,
        };
      }
    }
    const updatedData = await appointment.findByIdAndUpdate(_id, data, {
      new: true,
    });

    res.json({ updatedData, Message: "Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({
      Error: error.message,
    });
  }
};

// user appointment

const getAllAppointment = async (req, res) => {
  try {
    const data = await appointment.appointmentmodel.find().populate("user");
    res.json({ data, Message: "Data Found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await appointment.appointmentmodel
      .findById(id)
      .populate("user");
    if (data) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  createAppointment,
  addAppointment,
  updatestatus,
  createAppointment,
  getAllAppointments,
  updateStatus,
  reschedule,
  getSingleAppointment,
  updateAppointmentforFile,
  getAppointment,
  getAllAppointment,
  getAppointmentById,
  addAppointment
};
