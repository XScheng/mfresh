<template>
  <div>
    <!--header-->
    <Header />
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">产品中心</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="cart">
        <div class="cart_header">
          <span>已选商品<em>{{checkCount}}</em>件</span>
          <span>总金额：<strong>{{orderAmount}}</strong></span>
          <button type="button" @click="orderConfirm">结算</button>
        </div>
        <div class="cart_con">
          <div class="cartcon_title">
            <span><input type="checkbox" @click="checkAll" :checked="checkAllState"/> 全选</span>
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>金额</span>
            <span>操作</span>
          </div>
          <ul>
            <h2 v-show="$global.isLogin==true && list.length==0">购物车中没有任何商品！</h2>
            <li v-for="(item,index) in list" :key="index">
              <input type="checkbox" class="cart_checkbox" :checked="item.isChecked" @change="checkItem(index)"/>
              <a href="" class="cart_img"><img :src="require(`@/assets/${item.pic}`)" alt=""/></a>
              <a href="" class="cart_title">{{item.title1}}</a>
              <i>¥{{item.price}}</i>
              <div>
                <span @click="decNum(index)">-</span><input type="text" value="2"/><span @click="incNum(index)">+</span>
              </div>
              <strong>¥{{item.price * item.count}}</strong>
              <em @click="delCart(index)"></em>
            </li>
          </ul>
        </div>
        <div class="cart_header">
          <p><input type="checkbox" class="checkbox_all" @click="checkAll" :checked="checkAllState"> 全选</p>
          <span class="btn btn-outline-primary" @click="cartEmpty()">清空购物车</span>
          <span>已选商品<em>{{checkCount}}</em>件</span>
          <span>总金额：<strong>{{orderAmount}}</strong></span>
          <button type="button" @click="orderConfirm">结算</button>
        </div>
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
        list:[],
        orderAmount:0,
        checkAllState:false,
        checkCount:0
      }
    },
    methods:{
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
      //计算订单金额
      getOrderAmount(){
        this.orderAmount = 0;
        for(var i=0;i<this.list.length;i++){
          if(this.list[i].isChecked){
            this.orderAmount += this.list[i].price * this.list[i].count;
          }
        }
      },
      //清空购物车
      cartEmpty(){
        if(this.$global.isLogin){
          this.$axios.post("/cart/empty",this.$qs.stringify({
            uid:sessionStorage.getItem("uid")
          })).then(res=>{
            if(res.data.code==200){
              this.list = [];
              this.checkCount = 0;
              this.getOrderAmount();
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          alert("please login first");
          this.$router.push("/login");
        }
      },
      //全选
    checkAll(){
        this.checkAllState = !this.checkAllState;
        for(let i=0;i<this.list.length;i++){
            //每个商品的选中状态与全选一致
            this.list[i].isChecked = this.checkAllState;
        }
        //计算选中的商品
        if(this.checkAllState){
            this.checkCount = this.list.length;
        }else{
            this.checkCount = 0;
        }
        //计算订单金额
        this.getOrderAmount();
    },
      //单选
    checkItem(index){
        this.list[index].isChecked = !this.list[index].isChecked;     
        //每个商品的选中状态与全选一致
        if(this.list[index].isChecked){
            //选中
            this.checkCount += 1;
        }else{
            //取消
            this.checkCount -= 1;
        } 
        //如果选中的商品数等于总的商品数
        this.checkAllState = (this.checkCount==this.list.length)
        //计算订单金额
        this.getOrderAmount()       
    },
      // 商品数量递增
      incNum(index){
        this.list[index].count += 1;
        //订单金额
        this.getOrderAmount();
      },
      //商品数量递减
      decNum(index){
        this.list[index].count -= 1;
        //订单金额
        this.getOrderAmount();
      },
      //结算
      orderConfirm(){
        if(this.orderAmount>0){
          var selected = [];
          for(var i=0;i<this.list.length;i++){
            if(this.list[i].isChecked){
              selected.push(this.list[i]);
            }
          }
          //将选中的商品存到session中
          sessionStorage.setItem('selected',JSON.stringify(selected));
          sessionStorage.setItem('orderAmount',this.orderAmount);
          //跳转到订单确认页
          this.$router.push("/order_confirm");
        }else{
          alert("请选择商品")
        }
      }
    },
    mounted(){
        this.getCart();
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
  /*cart main content*/
  .cart {
      margin-top:20px;
  }
  .cart_header {
      text-align: right;
      font-size: 14px;
      line-height: 36px;
  }
  .cart_header>button{
      display: inline-block;
      vertical-align: middle;
      width: 100px;
      height: 36px;
      background: #f63;
      border:none;
      border-radius: 3px;
      color:#fff;
      font-size: 18px;
  }
  .cart_header>span {
      margin-right: 10px;
      display: inline-block;
      vertical-align: middle;
  }
  .cart_header>span>em {
      font-style: normal;
      color:#f63;
  }
  .cart_header>span>strong{
      font-size: 18px;
      color:#f63;
  }
  .cart_con {
      margin: 10px 0;
      font-size: 14px;
  }
  .cartcon_title {
      line-height: 33px;
      background: #eee;
      border:1px solid #ddd;
  }
  .cartcon_title>span {
      display: inline-block;
      vertical-align: middle;
      text-align: center;
  }
  .cartcon_title>span:nth-child(1){
      width: 80px;
  }
  .cartcon_title>span:nth-child(2){
      width: 370px;
  }
  .cartcon_title>span:nth-child(3){
      width: 120px;
  }
  .cartcon_title>span:nth-child(4){
      width: 140px;
  }
  .cartcon_title>span:nth-child(5){
      width: 130px;
      margin-right:40px;
  }

  .cart_con h2 {
      line-height: 60px;
      text-align: center;
      font-size: 18px;
      font-weight: lighter;
  }
  .cart_con ul li {
      padding:20px;
      border: 1px solid #ddd;
      border-top: none;
  }
  .cart_con>ul>li>a,
  .cart_con>ul>li>i,
  .cart_con>ul>li>div,
  .cart_con ul>li>strong,
  .cart_con ul>li>em,
  .cart_con ul li input {
      display: inline-block;
      vertical-align: middle;
      font-style: normal;
  }

  .cart_con>ul>li>a.cart_img {
      margin-left: 20px;
      border:1px solid #eee;
      padding: 4px;
      width: 90px;
      height: 90px;
  }
  .cart_con>ul>li>a.cart_img:hover {
      border:1px solid #ccc;
  }
  .cart_con>ul>li>a.cart_img img {
      max-width:100%;
  }
  .cart_con>ul>li>a.cart_title {
      width: 310px;
      margin-left: 20px;
      font-size: 18px;
  }
  .cart_con ul li>i {
      width: 120px;
  }
  .cart_con ul li>strong {
      width: 140px;
      color:#f63;
  }
  .cart_con ul li>em {
      border:1px solid transparent;
      border-radius: 3px;
      padding: 2px;
      width: 14px;
      height: 14px;
      background: url(../assets/images/iconlist.png) 2px -298px no-repeat;
      cursor: pointer;
  }
  .cart_con ul li>em:hover {
      border:1px solid #ddd;
  }
  .cart_con>ul>li>div {
      width: 140px;
  }
  .cart_con>ul>li>div span {
      width: 20px;
      height:20px;
      background: #e8e8e8;
      text-align: center;
      line-height: 20px;
      display: inline-block;
      vertical-align: middle;
  }
  .cart_con>ul>li>div span:hover {
      cursor: pointer;
      background: #eee;
  }
  .cart_con>ul>li>div input {
      width: 28px;
      height:18px;
      border:1px solid #ccc;
      text-align: center;
      vertical-align: middle;
  }
</style>