// 1.1 introduce express route
const express = require("express");
// 1.2 introduce database connection pool
const pool = require("../pool.js");
// 2.create Router Object
var router = express.Router();

//add good to cart
router.post("/add",(req,res)=>{
    //get request obj
    var obj = req.body;
    //check if uid is empty
    if(!obj.uid){
        res.json({code:401,msg:'uid required'});
        return;
    }
    // check if pid is empty
    if(!obj.pid){
        res.json({code:402,msg:'pid required'});
        return;
    }
    //check if count is empty
    if(!obj.count){
        obj.count = 1;
    }
    //query if user have been add this product
    pool.query('select count(*) as num from mf_cart where userId=? and productId=?',[obj.uid,obj.pid],(err,result)=>{
        if(err) throw err;
        if(result[0].num >0){
            //indicates that the item already exists in the shopping cart, update the purchase quanity
            var sql = `update mf_cart set count=count+${obj.count} where userId=${obj.uid} and productId=${obj.pid} `;
        }else{
            //the item haven't add in the shopping cart (perform add)
            var sql = `insert into mf_cart values (Null,${obj.uid},${obj.pid},${obj.count})`
        }
        //insert data into the mf_cart database;
        pool.query(sql,(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.json({
                    code:1,
                    msg:"succ"
                })
            }else{
                res.json({code:403,msg:'insert fail'});
            }
        })
    })
})

//query the specified user's shopping cart contents
router.post("/list",(req,res)=>{
    //get request parameter
    var obj = req.body;
    //check uid if empty
    if(!obj.uid){
        res.json({code:402,msg:'uid required'});
        return;
    }
    //query database
    pool.query('select mf_cart.cid, mf_cart.userId, mf_product.pid, mf_product.title1, mf_product.pic, mf_product.price, mf_cart.count from mf_cart, mf_product where mf_cart.productId=mf_product.pid and mf_cart.userId=?',[obj.uid],(err,result)=>{
        if(err) throw err;
        // if shopping cart have goods
        if(result.length>0){
          console.log(result)
            res.json({
                code:200,
                msg:'success',
                data:result
            })
        }else{
            // the shopping cart is empty
            res.json({code:201,msg:'cart is empty'})
        }
    })
})

//delete the purchase record based on the cart particulars record number
router.post("/delete",(req,res)=>{
    //get request obj
    var obj = req.body;
    //check if did is empty
    if(!obj.cid){
        res.json({code:401,msg:'cid required'});
        return;
    }
    // delete data from database
    pool.query('delete from mf_cart where cid=?',[obj.cid],(err,result)=>{
        if(err) throw err;
        console.log(result)
        if(result.affectedRows>0){
            res.json({code:1,msg:'succ'});
        }else{
            res.json({code:402,msg:'failed'});
        }
    })
})

//update shopping cart
router.post("/update",(req,res)=>{
    // get request obj
    var obj = req.body;
    //check if cid/count is empty
    if(!obj.cid){
        res.json({code:401,msg:'cid required'});
        return;
    }
    if(!obj.count){
        res.json({code:403,msg:'count required'});
        return;
    }
    //query databse and update count
    pool.query('update mf_cart set count=? where cid=?',[parseInt(obj.count),parseInt(obj.cid)],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.json({code:1,msg:'succ'})
        }else{
            res.json({code:402,msg:'update failed'});
        }
    })
})

//empty shopping cart
router.post('/empty',(req,res)=>{
    //get the user id to empty
    var obj = req.body;
    //check userid
    if(!obj.uid){
        res.json({code:401,msg:'uid required'});
        return;
    }
    //query database and empty
    pool.query('delete from mf_cart where userId=?',[obj.uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.json({code:200,msg:'succ'})
        }else{
            res.json({code:402,msg:'failed'})
        }
    })
})

// module export
module.exports = router;