const jwt = require("jsonwebtoken")
const admin=require("../models/lawyerModel")
const key ="tyuioplkjdrtyujnv45678iuhvbnmkjoo"

const verifyToken = async(req,res,next)=>{
    const token =req.headers.authorization;
    console.log(token);
    
    if(!token){
       return res.status(401).json({Message:"User Must Be Signin....."})
    }
    const withoutBearer=token.split(' ')[1];
    try{
        const payload = jwt.verify(withoutBearer,key);
        if(!payload) return res.status(401).json({Message:"Token Expired...."})
        const checkUser =await admin.findById(payload.data._id);
        if(!checkUser){
            return res.status(404).json({Message:"Invalid User..."})
        } 
        req.userData=checkUser;
        next();
    }
    catch(error){ 
       console.log(error.message);        
       res.json({
        Error:error.message
       })
    }

}

module.exports={verifyToken}