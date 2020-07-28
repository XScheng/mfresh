// 1.1 introduce express route
const express = require("express");
// 1.2 introduce database connection pool
const pool = require("../pool.js");
// 2.create Router Object
var router = express.Router();

//1.user register
router.post('/register',(req,res)=>{
    var obj = req.body;
    // check if the uname is empty
    if(!obj.uname){
        res.json({code:401,msg:"uname required"});
        return;
    }
    //check if the phone is empty
    if(!obj.phone){
        res.json({code:402,msg:"phone required"});
        return;
    }
    //check if the upwd is empty
    if(!obj.upwd){
        res.json({code:403,msg:"upwd required"});
        return;
    }
    //check if the repeat upwd are the same
    if(obj.upwd != obj.upwd2){
        res.json({code:404,msg:"repeat upwd is not the same, please input again"});
        return;
    }
    //check whether the input format of phone num is correct
    var reg = /^1[3~9]\d{9}$/
    if(!reg.test(obj.phone)){
        res.json({code:405,msg:'phone incorrect format'});
        return;
    }
    //delete the last confirm upwd 
    delete obj.upwd2;
    //insert data to the database
    pool.query('insert into mf_user set ?',[obj],(err,result)=>{
        if(err) throw err;
        // console.log(result);
        res.json({
            code:500,
            msg:'registe success',
            data:{uid:result.insertId,uname:obj.uname}
        });
    });
})

//2.user login
router.post('/login',(req,res)=>{
    //get the submission data
    var obj = req.body;
    //check if uname or upwd is empty
    if(!obj.uname){
        res.json({code:401,msg:'uname required'});
        return;
    }
    if(!obj.upwd){
        res.json({code:402,msg:'upwd required'});
        return;
    }
    //check user name and upwd to login, or phone and upwd to login
    pool.query('select * from mf_user where (uname=? and upwd=?) or (phone=? and upwd=?) limit 1',[obj.uname,obj.upwd,obj.uname,obj.upwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.json({
                code:400,
                msg:'login sucess',
                data:result[0]
            });
        }else{
            res.json({code:404,msg:'uname or upwd not found'})
        }
    })
})

//3.check uname if exist
router.post('/check/uname',(req,res)=>{
    //get request data
    var obj = req.body;
    if(!obj.uname){
        res.json({code:300,msg:'uname required'})
        return;
    }
    //check database
    pool.query("select count(*) as num from mf_user where uname=?",[String(obj.uname)],(err,result)=>{
        if(err) throw err;
        if(result[0].num>0){
            res.json({code:1,msg:'exist'})
        }else{
            res.json({code:2,msg:'non-exist'})
        }
    })
})

//4.check phone if exist
router.post('/check/phone',(req,res)=>{
    //get request data
    var obj = req.body;
    console.log(obj)
    if(!obj.phone){
        res.json({code:300,msg:'phone required'});
        return;
    }
    //check databases
    pool.query("select count(*) as num from mf_user where phone=?",[String(obj.phone)],(err,result)=>{
        if(err) throw err;
        if(result[0].num>0){
          res.json({code:301,msg:'phone exists'})
        }else{
          res.json({code:200,msg:'phone is not exist'})
        }
    })
})

// module export
module.exports = router;
