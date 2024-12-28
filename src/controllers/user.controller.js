const User = require("../models/user.models");
const { generateToken } = require("../middlewares/userAuthToken");
const bcrypt = require("bcrypt");

const UserSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(400).json({
        message: "Your email is already registered!",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hash,
    });
    res.status(201).json({
      message: "Registration successful!",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const UserSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered!" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password!" });
    }
    const token = generateToken({ _id: user._id, email: user.email });
    res.status(200).json({
      message: "Successfully signed in!",
      token,
    });
    console.log(token);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  console.log(req.body);
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { userData } = req.body;
    const user = new User.create(userData);
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    Error: error.message;
  }
};

const updateUserStatus = async (req, res) => {
  const { _id } = req.params;
  const { status } = req.body;
  try {
    const user = await User.findByIdAndUpdate(_id, { status }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User status updated successfully", user });
  } catch (error) {
    Error: error.message;
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    Error: error.message;
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile data", error });
  }
};

const updateProfile = async (req, res) => {
  const { name, email, mobile, address, dist, pincode } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    let profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (profileImage && profile.profileImage) {
      const oldImagePath = path.join(__dirname, "../", profile.profileImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    profile.name = name || profile.name;
    profile.email = email || profile.email;
    profile.mobile = mobile || profile.mobile;
    profile.address = address || profile.address;
    profile.dist = dist || profile.dist;
    profile.pincode = pincode || profile.pincode;
    if (profileImage) profile.profileImage = profileImage;

    await profile.save();
    res.json({ message: "Profile updated successfully", data: profile });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile data", error });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (profile.profileImage) {
      const imagePath = path.join(__dirname, '../', profile.profileImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await profile.deleteOne();
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting profile', error });
  }
}

module.exports = {
  UserSignup,
  UserSignin,
  resetPassword,
  getUser,
  updateUserStatus,
  deleteUser,

  getProfile,
  updateProfile,
  deleteProfile
};
