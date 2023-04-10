var express= require('express');
var router= express.Router();
var pool= require('./pool');
var upload= require('./multer');

router.post('/add_new_sub_category',upload.single('icon'),function(req,res){
    pool.query('insert into subcategory(categoryid,subcategoryname,bannerpriority,icon) values(?,?,?,?)',[req.body.categoryid,req.body.subcategoryname,req.body.bannerpriority,req.file.filename],function(error,result){
        if(error){
            console.log('xxxxxxxxxxxxxxxx',error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
});

router.get('/display_all_subcategory',function(req,res){
    pool.query('select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as cn from subcategory S',function(error,result){
        if(error){
            return res.status(500).json({data:''})
        }
        else{
            return res.status(200).json({data:result})
        }
    })
})


router.post('/display_subcategory_by_category',function(req,res){
    console.log("xxxxxxxxxxxx",req.body)
    pool.query('select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as cn from subcategory S where S.categoryid=?',[req.body.categoryid],function(error,result){
        if(error){
            return res.status(500).json({data:''})
        }
        else{
            return res.status(200).json({data:result})
        }
    })
})



router.post('/edit_subcategory_data',function(req,res){
    pool.query('update subcategory set categoryid=?,subcategoryname=? where subcategoryid=?',[req.body.categoryid,req.body.subcategoryname,req.body.subcategoryid],function(error,result){
        if(error){
            console.log('xxxxxxxxxxxxxxxx',error)
            res.status(500).json({status:false})
        }
        else{
            res.status(200).json({status:true})
        }
    })
});

router.post('/delete_subcategory_data',function(req,res){
    pool.query('delete from subcategory where subcategoryid=?',[req.body.subcategoryid],function(error,result){
        if(error){
            res.status(500).json({status:false})
        }
        else{
            res.status(200).json({status:true})
        }
    })
});

router.post('/update_icon',upload.single('icon'),function(req,res){
    pool.query('update subcategory set icon=? where subcategoryid=?',[req.file.filename,req.body.subcategoryid],function(error,result){
        if(error){
            res.status(500).json({status:false})
        }
        else{
            res.status(200).json({status:true})
        }
    })
});


module.exports=router;
