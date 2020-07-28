<template>
  <div>
    <header class="header container">
      <h1 class="logo"><a href="index.html" class="link"></a></h1>
      <div class="h_con">
        <ul class="clearfloat">
          <li class="phone">4000-585-116</li>
          <li><a href="#">中文</a></li>
          <li><em>|</em></li>
          <li><a href="#">English</a></li>
          <li><a href="#" class="weixin"></a></li>
          <li><a href="#" class="weibo"></a></li>
          <li> <router-link to="/login" class="h_login" v-if="$global.isLogin==false">登录</router-link> </li>
          <li><em>|</em></li>
          <li> <router-link to="/register" class="h_register" v-if="$global.isLogin==false">注册</router-link> </li>
          <li class="top_user"><a href="" v-if="$global.isLogin==true">{{uname}}</a></li>
          <li class="top_quit"><a href="" v-if="$global.isLogin==true" @click="logout">退出</a></li>
        </ul>
        <div class="search clearfloat">
          <button type="button"></button>
          <input type="text"/>
        </div>
      </div>
    </header>
    <!--nav-->
    <nav class="navbar">
      <div class="nav">
        <ul>
          <li> <router-link to="/"><span class="icon_home"></span>首页</router-link> </li>
          <li> <router-link to="/about">关于净美仕</router-link> </li>
          <li> <router-link to="/news">公司动态</router-link> </li>
          <li class="nav_pd">
            <router-link to="/product">产品中心<span class="icon_pd"></span></router-link>
            <div class="pd_dropdown">
              <router-link  :to="{name:'product',query:{pageNum:1,type:1}}">净美仕净化器</router-link>
              <router-link  :to="{name:'product',query:{pageNum:1,type:2}}">净美仕滤网</router-link>
            </div>
          </li>
          <li> <router-link to="/contact">联系我们</router-link> </li>
        </ul>
      </div>
      <div class="s_cart">
        <a>
          <span class="icon_cart"></span>购物车(<strong id="cart_sum">{{list.length}}</strong>)<span class="icon_sj"></span>
        </a>
        <div class="cart_dropdown">
          <h3 v-show="$global.isLogin==false">请 <router-link to="/login" class="btn btn-success">登录</router-link>后查看您的购物车</h3>
          <h3 v-show="$global.isLogin==false && list.length==0">您的购物车为空~</h3>
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <a><img :src="require(`@/assets/${item.pic}`)" alt=""/></a>            
                <span>{{item.title1}}</span>
                <span>{{item.count}}</span>
              <strong>¥{{item.price}}</strong>
              <em></em>
            </li>
          </ul>
          <div class="cd_js clearfloat" v-show="$global.isLogin==true">
            <span>共计：<strong>&yen;{{orderAmount}}</strong></span>
            <router-link class="jsp" to="/cart">结算</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
      name:'Header',
      data(){
        return {
          uname:'',
          list:[],
          orderAmount:0
        }
      },
      methods:{
        //获取购物车中的商品
        getCart(){
        if(this.$global.isLogin){
          this.$axios.post("/cart/list", this.$qs.stringify(
            {uid:sessionStorage.getItem("uid")}
          )).then(res=>{
            console.log(res)
            if(res.data.code==200){
              this.list = res.data.data;
              console.log(this.list)
              //给选中的商品添加状态
              for(var i=0;i<this.list.length;i++){
                this.list[i].isChecked = false;
              }
              //计算订单金额
              this.getOrderAmount();
            }
          }).catch(err=>{
            console.log(err)
          });
        }
      },
        //删除购物车中的商品
      delCart(index){
        if(this.$global.isLogin){
          this.$axios.post('/cart/delete',this.$qs.stringify(
            {cid:this.list[index].cid}
          )).then(res=>{
            if(res.data.code==1){
              //刷新当前页面
              this.list.splice(index,1);
              this.checkCount--;
              this.getOrderAmount();
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      },
        //计算当前订单金额
        getOrderAmount(){
          this.orderAmount = 0;
          for(var i=0;i<this.list.length;i++){
            this.orderAmount += this.list[i].price * this.list[i].count;
          }
        },
        getUname(){
          if(this.$global.isLogin){
            this.uname = sessionStorage.getItem("uname");
          }
        },
        logout(){
          //delete session's info when login have value
          sessionStorage.removeItem('uid')
          sessionStorage.removeItem('uname')
          //reload location page
          location.reload();
        }
      },
    mounted(){
      this.getUname()
      this.getCart()
    }
  }
</script>

<style>
  /*header*/
.header {
    height:90px;
}
.logo {
    float: left;
    width:238px;
    height:54px;
    background: url(../assets/images/logo.png) 0 0 no-repeat;
    margin-top:18px;
}
.h_con {
    float: right;
    margin-top:2px;
}
.h_con ul li {
    float: left;
    margin-left:8px;
}
.h_con .phone {
    padding-left:23px;
    background: url(../assets/images/iconlist.png) 0 4px no-repeat;
}
.h_con ul li em {
    color:#ccc;
    font-style: normal;
}
.weibo,.weixin {
    display: block;
    width:24px;
    height:24px;
    background: url(../assets/images/iconlist.png) no-repeat;
}
.weixin {
    background-position:0 -30px;
}
.weibo {
    background-position:0 -60px;
}

.h_login {
    display: block;
    width: 46px;
    height: 20px;
    background: #72b134;
    color: #fff;
    line-height: 20px;
    text-align: center;
    border-radius: 3px;
    margin-top:2px;
}
.h_login:hover {
    color:#fff;
    background: #86c647;
}
.h_register {
    color: #f90;
}

.search {
    margin-top:21px;
}
.search input,.search button {
    box-sizing: border-box;
    border:1px solid #ccc;
    float: right;
    height:26px;
}
.search input {
    width: 228px;
    border-right:none;
    padding:0 9px;
}
.search button {
    width: 32px;
    background: url(../assets/images/iconlist.png) 5px -96px no-repeat;
    cursor: pointer;
}
.search button:hover {
    background-color: #eee;
}
/*nav*/
.navbar {
    height: 40px;
    background: #002c69;
    padding: 0 !important;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;    
    display: block !important;
}
.nav {
    float: left;
    margin: 0 auto;
    position:absolute;
}
.nav:before, .nav:after {
    content: "";
    display: block;
    height: 0;
    width: 0;
    visibility: hidden;
    clear: both;
}

.nav>ul>li {
    float:left;
    position: relative;
}
.nav>ul>li>a {
    display: block;
    line-height: 40px;
    color: #fff;
    font-size: 15px;
    padding: 0 36px;
}
.nav>ul>li:hover>a {
    background: #194788;
}
.icon_home {
    width:17px;
    height: 15px;
    background: url(../assets/images/iconlist.png) 0 -130px no-repeat;
    display: inline-block;
    vertical-align: middle;
    margin-top:-4px;
    margin-right:13px;
}
.nav>ul>li.cur>a {
    background:#f39700 ;
}
.icon_pd {
    display: inline-block;
    vertical-align: middle;
    width:10px;
    height:5px;
    background: url(../assets/images/iconlist.png) 0 -230px no-repeat;
    margin-left:12px;
    transition:all 0.3s;
}
.nav_pd:hover .icon_pd {
    transform: rotate(180deg);
}

.s_cart {
    float: right;
    position: relative;
    /* margin-right: 100px; */
    margin: 0 auto;
}
.s_cart>a {
     display: block;
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 13px;
    padding: 0 8px 0 10px;
    background: #2080bd;
}
.s_cart:hover>a {
      color:#555;
      background: #fff;
      border-bottom: 0;
  }
.s_cart>a>strong {
    font-weight: lighter;
    color:#fc9;
}
.s_cart .icon_cart {
    width:22px;
    height: 16px;
    background: url(../assets/images/iconlist.png) 0 -160px no-repeat;
    margin-right:10px;
    display: inline-block;
    vertical-align:middle;
    margin-top:-3px;
}
.s_cart .icon_sj {
    width:7px;
    height: 4px;
    background: url(../assets/images/iconlist.png) 0 -250px no-repeat;
    margin-left:10px;
    display: inline-block;
    vertical-align: middle;
    margin-top:-2px;
}
  .s_cart:hover .cart_dropdown {
      display: block;
  }
  .s_cart:hover .icon-arrows {
      transform: rotate(180deg);
  }
.pd_dropdown {
    position: absolute;
    top:40px;
    width:100%;
    background: #fff;
    box-shadow: 1px 1px 3px #999;
    display: none;
    z-index: 100;
}
.pd_dropdown>a {
    display: block;
    line-height: 40px;
    text-align: center;
    color:#333;
    border-bottom:1px solid #ccc;
    background: #fff;
}
.pd_dropdown>a:hover {
    background: #eee;
}
.pd_dropdown>a:last-child {
    border-bottom:none;
}
.nav_pd:hover .pd_dropdown {
    display: block;
}

.cart_dropdown {
    width:260px;
    height: auto;
    background: #fff;
    box-shadow: 1px 1px 3px #999;
    position: absolute;
    top:40px;
    right: 0;
    display: none;
    z-index: 800;
}
.cart_dropdown>h3 {
    font-size: 18px;
    text-align: center;
    font-weight: lighter;
    padding: 30px 0;
}
.cart_dropdown ul {
    float: none;
}
.cart_dropdown ul li {
    padding:10px;
    border-bottom: 1px dotted #ccc;
    float: none;
}
.cart_dropdown ul li a,.cart_dropdown ul li span,.cart_dropdown ul li strong,.cart_dropdown ul li em {
    display: inline-block;
    vertical-align: middle;
    margin-left:16px;
}
.cart_dropdown ul li a {
    border:1px solid #eee;
    padding: 4px;
    width: 40px;
    height: 40px;
    margin-left:0;
}
.cart_dropdown ul li a img {
    width:40px;
    height:40px;
}
.cart_dropdown ul li span:nth-child(1) {
  width: 80px;
  height:20px;
  background: #e8e8e8;
  text-align: center;
  line-height: 20px;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cart_dropdown ul li span:nth-child(2) {
  width: 80px;
  height:20px;
  background: #e8e8e8;
  text-align: center;
  line-height: 20px;
  display: inline-block;
  vertical-align: middle;
}
.cart_dropdown ul li span:hover {
    cursor: pointer;
    background: #eee;
}
.cart_dropdown ul li strong {
    font-size: 13px;
    color:#f63;
}
.cart_dropdown ul li em {
    border:1px solid transparent;
    border-radius: 3px;
    padding: 2px;
    width: 14px;
    height: 14px;
    background: url(../assets/images/iconlist.png) 2px -298px no-repeat;
    cursor: pointer;

}
.cart_dropdown ul li em:hover {
    border:1px solid #ddd;
}
.cd_js {
    padding:10px;
    display: block;
}
.cd_js>span {
    float: left;
    font-size: 13px;
}
.cd_js>span>strong {
    color:#f63;
}
.jsp {
    float: right;
    border-radius: 3px;
    width: 60px;
    height: 30px;
    background: #f63;
    color:#fff;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
}

</style>