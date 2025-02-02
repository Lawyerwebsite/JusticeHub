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
    const lawyerId = {...createAppointment}
    console.log(lawyerId);
    
    const createdAppointment = await appointment.create(data, lawyerId);

    if (!createAppointment) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    res.json({ createdAppointment, message: "Successfully created....." });
  } catch (err) {
    console.log(err.message);

    res.json({ Error: err.message});
}
}

const getAllAppointments = async (req, res) => {
  let userData = req.userData;

  try {
    const appointments = await appointment.find();
    if (appointments.length === 0) {
      return res.status(404).json({ Message: "Data Not Found" });
    }
    const category = userData.category.toLowerCase();
    
    const allAppointments = appointments.filter(
      (appointment) => appointment.category.toLowerCase() == category
    );
    
    res.json({ allAppointments, Message: "Successfully fetched....." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ Error: err.message });
  }
};

const getallAppointment = async (req, res) => {
  let userData = req.userData;
  

  try {
    const lawyerId = userData._id;

    if (!lawyerId) {
      return res.status(400).json({ Error: "lawyerId is missing in user data." });
    }

    const allAppointments = await appointment.find({ lawyerId });

    if (allAppointments.length === 0) {
      return res.status(404).json({ Message: "No appointments found for this lawyer." });
    }
    const counts = {
      "TotalClient": allAppointments.length,
      "Pending": allAppointments.filter(app => app.status === 'pending').length,
      "Resolved": allAppointments.filter(app => app.status === 'Resolved').length,
      "Ongoing":allAppointments.filter(app=>app.status === 'Ongoing').length,
     "OngoingResolvedCount": allAppointments.filter(app => 
        ['ongoing', 'resolved'].includes(app.status.trim().toLowerCase())
      ).length,
     
   
    
    
      
    } 

    res.json({ allAppointments,counts, Message: "Successfully fetched....." });
  }
  
  catch (err) {
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
  console.log("reschedule");
  
  try {
    let { _id } = req.query;
    let data = req.body;
    console.log("data",data);
    
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

const getAppointmentsForLawyer = async (req, res) => {
  try {
    const { lawyerId } = req.query; // Extract lawyerId from query parameters

    if (!lawyerId) {
      return res.status(400).json({ message: "Lawyer ID is required" });
    }

    // Fetch appointments for the specific lawyer
    const appointments = await appointment.find({ lawyerId });

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this lawyer" });
    }

    res.status(200).json({
      success: true,
      appointments,
      message: "Appointments fetched successfully",
    });
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
  addAppointment,
  getAppointmentsForLawyer,
  getallAppointment
  
};
