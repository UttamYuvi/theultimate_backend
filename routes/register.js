var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");




// send mail
router.post("/register",  (req, res) => {
console.log(req.body)
    var email  = req.body.email;
  
    var maillist = [
        email,
        'bhadouriapraveshsingh4@gmail.com',
        'sfrmedical1@gmail.com',
        "uv041072@gmail.com"
      ];
    try {

        const transporter = nodemailer.createTransport({
            service: "outlook",
            auth: {
                user: "sfrmedical1@outlook.com",
                pass:"sfr@123456"
            }
        });

        const mailOptions = {
            from: "sfrmedical1@outlook.com",
           
            subject: email,
            html: '<h1>Congratulation</h1> <h1> you have successfully Registered </h2>',
            to: maillist
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({status:201,info})
            }
        })

    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({status:401,error})
    }
});


module.exports = router;