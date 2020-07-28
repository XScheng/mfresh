<template>
  <div>
    <!--header-->
    <Header />
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <router-link to="/">首页</router-link>&gt;<router-link to="/product">产品中心</router-link>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="pl_header">
        <a href="http://localhost:8080/2#/product?pageNum=1&type=1" :class="type==1 ?'cur':''">净美仕净化器</a>
        <a href="http://localhost:8080/2#/product?pageNum=1&type=2" :class="type==2 ?'cur':''">净美仕滤网</a>
      </div>
      <!-- 产品列表-->
      <ul class="product_list clearfloat">        
        <li  v-for="(item,index) in list" :key="index">
          <a :href="'http://localhost:8080/#/product_details?pid='+item.pid"><img  :src="require(`@/assets/${item.pic}`)" alt=""/></a>
          <!-- <router-link :to="{name:'product_details',query:{pid:item.pid}}"><img  :src="require(`@/assets/${item.pic}`)" alt=""/></router-link> -->
          <div class="pdlist_text clearfloat">
            <h3>
              <p>{{item.model}}</p>
              <span>{{item.title1}}</span>
            </h3>
           <a :href="'http://localhost:8080/#/product_details?pid='+item.pid">查看详情</a>
           <!-- <router-link :to="{name:'product_details',query:{pid:item.pid}}">查看详情</router-link> -->
          </div>
        </li>      
      </ul>
      <!-- 分页导航-->
     <div class="verflow-auto" style="margin:0 auto;width:240px">
        <b-pagination-nav :link-gen="linkGen" :number-of-pages="pageTotal" use-router></b-pagination-nav>
      </div>
    <!--footer-->
    <Footer />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header"
import Footer from "../components/Footer"
  export default {
      components:{
        Header,
        Footer
      },
      data(){
      return {
        list:[],//存储产品列表
        pageNum:1,//当前页
        pageSize:1,//每页显示数量
        total:0,//总数
        pageTotal:1,//总页数,默认1
        type:1,
      }
    },
    methods:{
      getProduct(){
        this.$axios.get("/product/list",{
          params:{
            pageNum:this.pageNum,
            type:this.type
          }
        }).then((res)=>{
          if(res.data.code==200){
            this.list = res.data.data.data;
            this.pageNum = res.data.data.pageNum;
            this.pageSize = res.data.data.pageSize;
            this.total = res.data.data.totalRecord;
            this.pageTotal = res.data.data.pageCount;
            this.type = res.data.data.type;
          }
        }).catch((err)=>{
          console.log(err)
        })
      },
      //获取页码
    linkGen(pageNum,type) {
        // return pageNum === 1 ? '?' : `?page=${pageNum}`
        return {path:`/product?pageNum=${pageNum}&type=${this.type}`}
      }
    },
    watch:{
      $route(to,from){
    this.pageNum = this.$route.query.pageNum;
    this.type = this.$route.query.type;
    this.getProduct();
      }
    },     
    mounted(){
    //组件挂载完成后,给参数赋值
    this.pageNum = this.$route.query.pageNum;
    this.getProduct();
  }
  }
</script>

<style>
  /*breadcrumb navigation*/
.breadcrumb {
    height:40px;
    background: #f1f1f1;
    border-top:2px solid #ddd;
    border-bottom: 1px solid #ddd;
}
.breadcrumb h2 {
    padding-left: 17px;
    line-height: 16px;
    font-size: 15px;
    font-weight: lighter;
    color: #666;
    background: url(../assets/images/iconlist.png) 0 -200px no-repeat;    
}
.breadcrumb h2 a {
    padding: 0 10px;
}
/*main content*/
.pl_header {
    margin-top: 40px;
    text-align: center;
}
.pl_header a {
    display: inline-block;
    width: 180px;
    height: 42px;
    background: #ddd;
    text-align: center;
    line-height: 42px;
    border-radius: 21px;
    font-size: 18px;
    margin:0 100px;
}
.pl_header a:hover {
    background: #ccc;
    color:#333;
}
.pl_header a.cur {
    background: #f39700;
    color:#fff;
}
.pl_header a.cur:hover {
    background: #ffa81a;
}

.product_list {
    margin-top: 86px;
    width:970px !important;
}
.product_list li {
    float: left;
    margin-right: 25px;
    /* width: 300px; */
    box-sizing: border-box;
    border: 1px solid #ccc;
    margin-bottom: 40px;
}
.product_list li:nth-child(3n) {
    margin-right: 0;
}
.product_list li:hover {
    border-color:#f0ad4e;
    box-shadow: 0px 0px 3px #f0ad4e;
}
.product_list li:nth-child(3n) {
    margin-right: 0;
}
.product_list>li>a {
    display: block;
    width: 290px;
    height: 290px;
    padding:4px;
    overflow: hidden;
}
.product_list>li>a>img {
    max-width: 100%;
    transition: all 0.3s;
}
.product_list>li>a>img:hover {
    transform: scale(1.2,1.2);
}
.pdlist_text {
    border-top:1px solid #ccc;
    padding: 10px 10px 6px 10px;
}
.pdlist_text>h3 {
    float: left;
    font-weight: lighter;
}
.pdlist_text>h3>p {
    font-size: 18px;
}
.pdlist_text>h3>span {
    font-size: 14px;
    color: #999;
    display: block;
    width: 180px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.pdlist_text>a {
    float: right;
    width: 92px;
    height: 30px;
    background: #ffdea9;
    font-size: 15px;
    color:#a96900;
    text-align: center;
    line-height: 30px;
    border-radius: 3px;
    margin-top:10px;
}
.pdlist_text>a:hover {
    background: #f6cd8a;
}
/*paging*/
.pages {
    text-align: center;
}
.pages a {
    color:#999;
    box-sizing: border-box;
    height: 20px;
    min-width: 20px;
    border-radius: 2px;
    display: inline-block;
    border:1px solid #ddd;
    margin: 0 2px;
    padding: 0 4px;
    line-height: 18px;
}
.pages a:hover {
    border-color:#f8b551;
    color:#f8b551;
}
.pages a.cur {
    border-color:#f8b551;
    background: #f8b551;
    color: #fff;
}
.pages a.default {
    border-color: #ddd;
    color:#ddd;
    cursor: default;
}
</style>