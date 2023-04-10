var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/check_user_mobileno', function(req, res, next) {
  console.log(req.body)
    pool.query("select * from administration where emailid=? and password=?", [req.body.emailid, req.body.password], function (error, result) {
        if (error) {
            
            console.log(error)
            return res.status(500).json({ result: false })
        }
        else {
            if (result.length == 1) {
                // console.log('asdada', token)
                res.status(200).json({ status: true, admin: result });
            }
            else {
                console.log('sds', error)
                res.status(200).json({ status: false, message: 'Invalid Emailid/Mobile Number/Password' });
            }
        }

    })
});

module.exports = router;
