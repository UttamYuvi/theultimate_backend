var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/add_new_products',upload.single('picture'), function(req,res,next){
    pool.query('insert into products (categoryid,subcategoryid,productname,price,offerprice,stock, description,ratings,status,salestatus,picture) values (?,?,?,?,?,?,?,?,?,?,?)',[req.body.categoryid,req.body.subcategoryid,req.body.productname,req.body.price,req.body.offerprice,req.body.stock, req.body.description,req.body.ratings,req.body.status,req.body.salestatus ,req.file.filename],function(error,result){

        if(error){
            
            return res.status(500).json({result:false})
        }
        else{
            return res.status(200).json({result:true})
        }
    })
})

// select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid ) as categoryname from subcategory S

router.get('/display_all_products', function(req,res,next){

    pool.query('select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname from products P',function(error,result){
        if(error){
            console.log("BODY",req.body)

            return res.status(500).json({data:[]})
        }
        else{
            console.log(result)
            return res.status(200).json({data:result})
        }
    })
}) 


router.post('/update_picture',upload.single('picture'), function(req, res, next) {
    console.log("FILE:",req.file)
pool.query("update products set picture=? where productid=?",[req.file.filename,req.body.productid],function(error,result){
if(error){
    console.log(error)
return res.status(500).json({result:false})
}
else{
    return res.status(200).json({result:true})
}

})
});

router.post('/edit_products_data', function (req, res, next) {
    pool.query("update products set categoryid=?, subcategoryid=?, productname=?, price=?, offerprice=?, stock=?, description=?, ratings=?, status=?, salestatus=? where productid=?", [req.body.categoryid, req.body.subcategoryid, req.body.productname, req.body.price, req.body.offerprice, req.body.stock, req.body.description, req.body.ratings, req.body.status, req.body.salestatus, req.body.productid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true })
        }

    })
});
router.post('/delete_products_data', function (req, res, next) {
    pool.query("delete from products where productid=?", [req.body.productid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true })
        }

    })
});

router.post('/display_products_by_subcategory', function (req, res, next) {
    pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as cn,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as scn from products P where P.subcategoryid=?",[req.body.subcategoryid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            
            return res.status(200).json({ data: result })
        }

    })
});


router.post('/add_new_banners',upload.any(), function (req, res, next) {

    console.log(req.files)
    var banners=[]
    req.files.map((item)=>{
        banners.push(item.filename)
    })

    pool.query("insert into banners (bannerpictures) value (?)", [JSON.stringify(banners)], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true })
        }

    })
});


router.post('/add_product_images', upload.any(), function (req, res, next) {
    var banners=[]
    req.files.map((item)=>{
     banners.push(item.filename)
 
    })
    console.log(req.body)
    console.log(banners)
    
    pool.query("insert into productimages (categoryid, subcategoryid, productid, productimages) values(?,?,?,?)", [req.body.categoryid, req.body.subcategoryid, req.body.productid,JSON.stringify(banners)], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ result: false })
        }
        else {
            return res.status(200).json({ result: true })
        }

    })
});

module.exports = router;
