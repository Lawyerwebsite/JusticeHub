const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models")
const key = "r5sqdtfkgsa^RDT32l43276tasddxzjcnhisydg";

const generateToken = (data) => {
  const token = jwt.sign({ data }, key, { expiresIn: "1h" });
  return token;
};

const verifyToken = async (req, res, next) => {
 
  try {
    const token = req.headers.authorization;
    console.log(token);
    
      if (!token) {
        return res.status(401).json({ Message: "user must be signIn.." });
      }
      const withoutBearer = token.split(" ")[1];
    const payload = jwt.verify(withoutBearer, key);

    const checkUser = await userModel.User.findById(payload.data._id)

    if (!checkUser){
      return res
        .status(404)
        .json({ Message: "user not found for this token..." });}
    req.userData = checkUser.userId;
    next();
  } catch (error) {
    console.log(error);
    
    res.status(401).json({
      Error: error.message,
    });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};