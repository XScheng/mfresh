// 1.1 introduce express route
const express = require("express");
// 1.2 introduce database connection pool
const pool = require("../pool.js");
// 2.create Router Object
var router = express.Router();

// 1.return news list
router.get("/list",(req,res)=>{
    // receive the GET request parameter
    var obj = req.query;
    //determine if there are initial page parameters
    if(!obj.pageNum){
        obj.pageNum = 1;
    }
    //determine if the pageSize parameter is displayed per page
    if(!obj.pageSize){
        obj.pageSize = 6;
    }
    obj.pageNum = parseInt(obj.pageNum);
    obj.pageSize = parseInt(obj.pageSize);
    //check the total record,search database
    pool.query('select * from mf_news',(err,result)=>{
        if(err) throw err;
        console.log(result.length);
        //total record
        let totalRecord = result.length;
        //num of total pages
        let pageCount = Math.ceil(totalRecord / obj.pageSize);
        //query start location
        let offset = (obj.pageNum-1) * obj.pageSize;
        //perform paging queries
        pool.query(`select * from mf_news limit ${offset},${obj.pageSize}`,(err,result)=>{
            if(err) throw err;
            console.log(result);
            res.json({
                code:200,
                msg:'success',
                data:{
                    totalRecord:totalRecord,
                    pageSize:obj.pageSize,
                    pageCount:pageCount,
                    pageNum:obj.pageNum,
                    list:result
                }
            })
        })
    })

})

//2.return news detail
router.get("/detail",(req,res)=>{
    //receive get qurest parameter
    var obj = req.query;
    //determine nid if exists
    if(!obj.nid){
        res.json({code:401,msg:'nid request'});
        return;
    }
    //query the database
    pool.query('select * from mf_news where nid=?',[obj.nid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.json({
                code:'200',
                msg:'success',
                data:result[0]
            })
        }else{
            res.json({code:402,msg:'nid not exist'})
        }
    })
})


// module export
module.exports = router;