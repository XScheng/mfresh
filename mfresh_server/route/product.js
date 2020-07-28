// 1.1 introduce express route
const express = require("express");
// 1.2 introduce database connection pool
const pool = require("../pool.js");
// 2.create Router Object
var router = express.Router();

//return product list
router.get('/list',(req,res)=>{
    //receive the get parameter
    var obj = req.query;
    //determine if there are initial pagenUum parmeters
    if(!obj.pageNum){
        obj.pageNum = 1;
    }
    //determine if there are inital type parameters
    if(!obj.type){
        obj.type = 1;
    }
    //determine if the pageSize parameter is displayed per page
    if(!obj.pageSize){
        obj.pageSize = 3;
    }
    obj.pageNum = parseInt(obj.pageNum);
    obj.type = parseInt(obj.type);
    obj.pageSize = parseInt(obj.pageSize);
    //check the total record from database
    pool.query('select count(*) as num from mf_product where type='+obj.type,(err,result)=>{
        if(err) throw err;
        //total record
        let totalRecord = result[0].num;
        //num of total record
        let pageCount = Math.ceil(totalRecord / obj.pageSize);
        //query start location
        let offset = (obj.pageNum-1)*obj.pageSize;
        //perform paging queries
        pool.query(`select * from mf_product where type=${obj.type} limit ${offset},${obj.pageSize}`,(err,result)=>{
            if(err) throw errr;
            res.json({
                code:200,
                msg:'success',
                data:{
                    totalRecord:totalRecord,
                    pageSize:obj.pageSize,
                    pageCount:pageCount,
                    pageNum:obj.pageNum,
                    type:obj.type,
                    data:result
                }
            })
        })
    })
})

//return product detail
router.get('/detail',(req,res)=>{
    //receive get request parameter
    var obj = req.query;
    //determine if pid exists
    if(!obj.pid){
        res.json({code:401,msg:'pid required'});
        return;
    }
    //query database detail
    pool.query('select * from mf_product where pid=?',[obj.pid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.json({
                code:200,
                msg:'success',
                data:result[0]
            })
        }else{
            res.json({code:402,msg:'pid not exist'})
        }    
    })
})

// module export
module.exports = router;