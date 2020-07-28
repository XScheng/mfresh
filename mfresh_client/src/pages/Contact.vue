<template>
  <div>
    <!--header-->
    <Header />
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <router-link to="/">首页</router-link>&gt;<router-link to="/product">联系我们</router-link>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="contect">
        <h2></h2>
        <h3>
          全国服务电话：4000-585-116(电商经销)	4008-508-581(线下代理)    周一至周日9:00-18:00(仅收市话费)<br>
          金牌售后客服：15601141120
        </h3>
        <h4>净美仕环境科技有限公司</h4>
        <p>地 址：北京市朝阳区红军营南路15号瑞普大厦C座1102<br>
          邮 箱：yuanquan@mfresh.cn<br>
          电 话：86-10-57422471</p>
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
  .contect {
      padding: 55px 70px 500px;
      color:#666;
      background: url(../assets/images/contact.jpg) center bottom no-repeat;
  }
  .contect>h2 {
      width: 329px;
      height: 39px;
      background: url(../assets/images/logo2.gif);
  }
  .contect>h3 {
      margin-top: 25px;
      font-weight: lighter;
      font-size: 18px;
      line-height: 40px;
  }
  .contect>h4 {
      margin-top: 20px;
      font-weight: lighter;
      font-size: 18px;
  }
  .contect>p {
      margin-top: 6px;
      font-size: 14px;
      line-height: 30px;
  }
</style>