var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')
var jwt = require('jsonwebtoken');
const { token } = require('morgan');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

const verifyJWT = (req, res, next) => {
    console.log('headers',req.headers);
    const token = req.headers.authorization;
    console.log("Token:", token);

    if (!token) {
        res.json({ auth: false, message: "We need a token, please give it to us next time" });
        

    } else {
        
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            console.log('Decoded',decoded);
            if (err) {
                console.log('err',err);
                res.json({ auth: false, message: "you are failed to authenticate" });
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};

router.get('/getToken', (req,res) => {
    var mytoken = JSON.parse(localStorage.getItem('jwttoken'))
    console.log(mytoken)
    res.json({token:mytoken.token})

})

router.get('/isUserAuth', verifyJWT, (req, res) => {
    res.json({ auth: true, message: "you are failed to authenticate" });
  });


router.post('/check_admin_login', function (req, res, next) {
    console.log(req.body)
    pool.query("select * from administration where emailid=? and password=?", [req.body.emailid, req.body.password], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ result: false })
        }
        else {
            if (result.length == 1) {
                const token = jwt.sign({ emailid: result[0].emailid }, "jwtSecret", {
                    expiresIn: "50s",
                });
                localStorage.setItem('jwttoken', JSON.stringify({token:token}))
                // console.log('asdada', token)
                res.status(200).json({ status: true, admin: result[0], token: token });
            }
            else {
                console.log('sds', error)
                res.status(200).json({ status: false, message: 'Invalid Emailid/Mobile Number/Password' });
            }
        }

    })
});

module.exports = router