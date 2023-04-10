var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

//get home page
router.post('/add_new_category',upload.single('icon'), function(req,res,next){
    pool.query('insert into category (categoryname,icon) values(?,?)',[req.body.categoryname,req.file.filename],function(error,result){
        if(error){
            

            return res.status(500).json({result:false})
        }
        else{
            return res.status(200).json({result:true})
        }
    })
})

router.get('/display_all_category', function(req,res,next){
    pool.query('select * from category',function(error,result){
        if(error){
            console.log("BODY",req.body)

            return res.status(500).json({data:[]})
        }
        else{
           
            console.log('weqwe',result)
            return res.status(200).json({data:result})
        }
    })
}) 

router.post('/edit_category', function(req,res,next){
    pool.query('update category set categoryname=? where categoryid=?',[req.body.categoryname,req.body.categoryid],function(error,result){
        if(error){
            console.log("BODY",req.body)

            return res.status(500).json({status:false})
        }
        else{
            console.log(result)
            return res.status(200).json({status:true})
        }
    })
})

router.post('/delete_category', function(req,res,next){
    pool.query('delete from category where categoryid=?',[req.body.categoryid],function(error,result){
        if(error){
            console.log("BODY",req.body)

            return res.status(500).json({status:false})
        }
        else{
            console.log(result)
            return res.status(200).json({status:true})
        }
    })
})

router.post('/update_icon',upload.single('icon'), function(req,res,next){
    pool.query('update category set icon=? where categoryid=?',[req.file.filename,req.body.categoryid],function(error,result){
        if(error){
            console.log("FILE",req.file)
            return res.status(500).json({result:false})
        }
        else{
            return res.status(200).json({result:true})
        }
    })
})




module.exports = router;
