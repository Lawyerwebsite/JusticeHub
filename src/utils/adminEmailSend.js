const nodemailer = require('nodemailer');

const sendMailToLawyer = async (name,email, password) => {
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"alkalam456@gmail.com",
                pass:"ugjq fxll nwhi kguq"
            }
        });
        const mailOptions = {
            from: "alkalam456@gmail.com",
            to: email,
            subject: "Welcome to our website",
            text: `Hello ${name},\n\nWelcome to our website.\n\nBest regards\nuserName: ${email}\npassword: ${password}`
        }
        await transporter.sendMail(mailOptions);
        console.log(`Mail sended to ${email}\n\n${password}`);
        
    } catch (error) {
        console.log(error.message);
        
    }
};

module.exports = {
    sendMailToLawyer
}