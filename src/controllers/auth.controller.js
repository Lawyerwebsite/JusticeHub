const signup = require("../models/auth.model");
const { passwordGenerate } = require("../utils/generator");
const sendMailToUser = require("../utils/emailSend");
const { generateToken } = require("../middlewares/authToken");
const bcrypt = require("bcrypt");

const superAdminSignup = async (req, res) => {
  try {
    const { fname, lname, email } = req.body;
    console.log(req.body);
    const existingUser = await signup.findOne({ email });
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
    const createAdmin = await signup.create(data);
    await sendMailToUser.sendMailToAdmin(fname, lname, email, password);
    res.json({
      createAdmin,
      message: "registration successful",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const superLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const findEmail = await signup.findOne({ email });
    console.log(findEmail);
    
    if (!findEmail)
      return res.status(400).json({ message: "Email Not Register..." });
    const findPassword = await bcrypt.compare(password, findEmail.password);
    console.log("snsnsosns==>",findPassword);
    
    if (!findPassword)
      return res.status(400).json({ message: "Incorrect Password..." });
    const token = await generateToken(findEmail);
    console.log(token);
    
    res.json({ token,findEmail, message: " SignIn Successfull..." });
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};

const superAdminForgotPassword = async (req, res) => {
  const { email, newpassword, conformpassword } = req.body;
  try {
    const findEmail = await signup.findOne({ email });
    console.log(findEmail);
    
    if (!findEmail) return res.status(404).json({ message: "Email Not Found..." });

    // const isMatch = await bcrypt.compare(newpassword, findEmail.password);
    // if (!isMatch) return res.status(400).json({ message: "Password Does Not Match ..." });

    if (newpassword !== conformpassword) {
      return res.status(400).json({ message: "Password Not Match ..." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newpassword, salt);

    findEmail.password = hashPassword;
    await findEmail.save();

    res.status(200).json({ message: "Password Updated Successfully..." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // try {
  //   const {email, newpassword, conformpassword} = req.body;
  //   console.log(req.body);
  //   const findEmail = await signup.findOne(email);
  //   console.log(findEmail);
    
  //   if (!findEmail)
  //     return res.status(400).json({ message: "Email Not Register..." });
  //   const findPassword = await bcrypt.compare(newpassword, conformpassword);
  //   console.log(findPassword);
    
  //   if (!findPassword)
  //     return res.status(400).json({ message: "Password Not Match..." });
  //   res.json({
  //     findPassword,
  //     message: "Password Updated Successfully",
  //   });
  //   ;
  // } catch (error) {
  //   res.json({
  //     Error: error.message,
  //   });
  // }
};

const getSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await signup.find();
    res.status(200).json(superAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getSuperAdminById = async (req, res) => {
//   try {
//     const superAdmin = await signup.findById(req.params.id);
//     if (!superAdmin) {
//       return res.status(404).json({ message: "Super Admin Not Found..." });
//     }
//     res.status(200).json(superAdmin);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const createSuperAdmin = async (req, res) => {
  const { firstName, lastName, email, role, number, gender, address, country } =
    req.body;
  try {
    const newProfile = new signup({
      firstName,
      lastName,
      email,
      role,
      number,
      gender,
      address,
      country,
      photo: req.file?.path || null,
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSuperAdmin = async (req, res) => {
  const { fname, lname, email,number, gender, address, country } = req.body;
  console.log(req.body);
  
  try {
    const superAdmin = await signup.findByIdAndUpdate(
      {fname, lname, email,number, gender, address, country},
      { ...req.body, photo: req.file.path || req.body.photo },
      { new: true }
    );
    if (!superAdmin) {
      return res.status(404).json({ message: "Super Admin Not Found..." });
    }
    res.status(200).json(superAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await signup.findByIdAndDelete(req.params.id);
    if (!superAdmin) {
      return res.status(404).json({ message: "Super Admin Not Found..." });
    }
    res.status(200).json({ message: "Super Admin Deleted Successfully..." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  superAdminSignup,
  superLogin,
  superAdminForgotPassword,
  getSuperAdmin,
  updateSuperAdmin,
  createSuperAdmin,
  deleteSuperAdmin

};
