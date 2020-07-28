<template>
  <div>
    <!--header-->
    <Header />
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <router-link to="/">首页</router-link>&gt;<router-link to="/product">产品中心</router-link>&gt;<a href="javascript:;">净美仕净化器</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="pd_info clearfloat">
        <div class="pdinfo_img">
          <img :src="detail.pic" alt=""/>
        </div>
        <div class="pdinfo_text">
          <h2>{{detail.title1}}</h2>
          <ul>
            <li>型号：{{detail.model}}</li>
            <li>功能：{{detail.func}}</li>
            <li>噪音：{{detail.noise}}</li>
            <li>风量：{{detail.wind}}</li>
            <li>适用对象：{{detail.applyTo}}</li>
            <li>适用面积：{{detail.size}}</li>
            <li>空气净化能效等级：{{detail.level}}</li>
          </ul>
          <p>价格：<span>¥{{detail.price}}</span><strong id="price"></strong></p>
          <a href="javascript:;" id="addCart" @click="addCard"><span class="icon_cart"></span>加入购物车</a>
        </div>
      </div>
      <div class="details_box">
        <h2 class="title">产品详情</h2>
        <div class="pd_details" v-html="detail.detail">
        </div>
      </div>
    <!--footer-->
    <Footer />
    </div>
  </div>
</template>

<script>
  import Footer from "../components/Footer"
  import Header from "../components/Header"
  export default {
      components:{
        Footer,
        Header
      },
      data(){
        return {
          detail:{}
        }
      },
      methods:{
        getDetail(){
          this.$axios.get("/product/detail",{
            params:{
              pid:this.$route.query.pid
            }
          }).then(res=>{
            this.detail = res.data.data;
            console.log(this.detail)
            //图片地址单独赋值
            this.detail.pic = require("@/assets/"+this.detail.pic);
            //详情中的图片地址修改
            this.detail.detail = this.detail.detail.replace(/<img src="/g, '<img src="../../static/');
          }).catch(err=>{
            console.log(err)
          })
        },
        addCard(){
          if(this.$global.isLogin){
            this.$axios.post("/cart/add",this.$qs.stringify(
              {
                uid:sessionStorage.getItem('uid'),
                pid:this.$route.query.pid
              }
            )).then(res=>{
              console.log(res)
              alert("add cart success");
            }).catch(err=>{
              console.log(err)
            })
          }else{
            // if isnot login, will be back to login page
            alert("please login")
            this.$router.push("/login")
          }
        }
      },
       mounted(){
      this.getDetail()
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
  /*product detail content*/
  .pd_info {
      margin-top: 66px;
  }
  .pdinfo_img {
      float: left;
      width: 400px;
      height: 400px;
      border:1px solid #ccc;
      padding: 4px;
      box-sizing: border-box;
  }
  .pdinfo_img>img {
      display: block;
      max-width: 100%;
  }
  .pdinfo_text {
      float: left;
      margin-left: 85px;
      width: 400px;
  }
  .pdinfo_text>h2 {
      font-size: 24px;
      font-weight: lighter;
      line-height: 36px;
      padding-bottom: 16px;
      border-bottom:1px solid #ddd;
  }
  .pdinfo_text>ul {
      margin-top:32px;
  }
  .pdinfo_text>ul>li {
      color: #666;
  }
  .pdinfo_text>p {
      color:#666;
      margin-top: 46px;
  }
  .pdinfo_text>p>span {
      color:#f00;
      font-size: 18px;
  }
  .pdinfo_text>p>strong {
      color:#f00;
      font-size: 30px;
      font-weight: lighter;
  }
  .pdinfo_text>a {
      box-sizing: border-box;
      margin-top: 20px;
      width: 180px;
      height: 44px;
      display: block;
      background: #f39700;
      font-size: 18px;
      text-align: center;
      line-height: 44px;
      color: #fff;
      border-radius: 5px;
  }
  .pdinfo_text>a:hover {
      background: #f38900;
  }
  .pdinfo_text .icon_cart {
      width:22px;
      height: 16px;
      background: url(../assets/images/iconlist.png) 0 -160px no-repeat;
      margin-right:10px;
      display: inline-block;
      vertical-align:middle;
      margin-top:-3px;
  }

  .details_box {
      margin-top: 32px;
  }
  .pd_details {
      padding:20px;
  }
  .pd_details p {
      font-size: 16px;
  }
  .pd_details>img {
      max-width: 100%;
      display: block;
      margin:0 auto;
  }
</style>