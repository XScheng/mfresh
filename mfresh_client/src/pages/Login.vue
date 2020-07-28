<template>
  <div>
    <!--header-->
    <Header />
    <!--页面主体-->
    <div class="login_box">
      <div class="container">
        <div class="login">
          <h2>用户登录</h2>
          <dl class="clearfloat">
            <dt><span class="tips" id="uname_prompt_text"></span>用户名：</dt>
            <dd>
              <input type="text" id="uname" v-model="form.uname" placeholder="邮箱/手机号"/>
              <em class="icon_user"></em>
              <i class="icon_error" id="uname_prompt_icon"></i>
            </dd>
          </dl>
          <dl>
            <dt><span class="tips" id="pwd_prompt_text">请输入密码</span>密码：</dt>
            <dd>
              <input type="password" v-model="form.upwd" id="pwd" placeholder="密码"/>
              <em class="icon_pwd"></em>
              <i class="icon_error" id="pwd_prompt_icon"></i>
            </dd>
          </dl>
          <p><label>
            <input type="checkbox" :checked="0==1"/>
            <span>自动登录</span>
          </label></p>
          <b-button type="submit" variant="success" @click="login">立即登陆</b-button>
        </div>
      </div>
    </div>
    <!--footer-->
    <Footer />
  </div>
</template>

<script>
  import Header from "../components/Header"
  import Footer from "../components/Footer"
  import qs from "qs"
  export default {
    components:{
      Header,
      Footer
    },
    data(){
      return {
        form:{
          uname:"",
          upwd:""
        }
      }
    },
    methods:{
      login(){
        this.$axios.post("/user/login",qs.stringify(
          this.form
        )).then(res=>{
          console.log(res)
          if(res.data.code==400){
            sessionStorage.uid = res.data.data.uid;
            sessionStorage.uname = res.data.data.uname;
            alert("login success");
            //jump to frontpage
            this.$router.push({path: '/'});
            location.reload();
          }
        }).catch(err=>{
          console.log(err)
        })
      }
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
  /*login content*/
  .login_box {
      height: 500px;
      background: url(../assets/images/login_bg.jpg) center 0 no-repeat;
      margin-bottom: -60px;
  }
  .login {
      box-sizing: border-box;
      width: 400px;
      padding:6px 20px 0;
      height: 380px;
      float: right;
      margin-top: 60px;
      right: 0;
      background: rgba(223,226,233,0.9);
      border-radius: 10px;
      box-shadow: 0px 0px 5px #7e858f;
  }
  .login>h2 {
      font-weight: lighter;
      text-align: center;
      line-height: 50px;
      border-bottom: 1px solid #b5bdca;
      font-size: 18px;
      margin-bottom: 18px;
  }
  .login dl {
      margin-bottom: 6px;
  }
  .login dl dt {
      font-size: 16px;
      color:#666;
      line-height: 40px;
  }
  .login .tips {
      font-size: 12px;
      color:#f00;
      float: right;
      display: none;
  }
  .login dl dd {
      position: relative;
  }
  .login dl dd input {
      box-sizing: border-box;
      width: 100%;
      display: block;
      padding-left: 45px;
      height:38px;
      border:1px solid #b5bdca;
      border-radius: 2px;
  }
  .login dl dd em {
      position: absolute;
      top: 1px;
      left:1px;
      width: 36px;
      height: 36px;
      background: #eaecef url(../assets/images/iconlist.png) no-repeat;
      border-right: 1px solid #c4ccd7;
      border-radius: 2px 0 0 2px;
  }
  .login dl dd em.icon_user {
      background-position: 6px -474px;
  }
  .login dl dd em.icon_pwd {
      background-position: 9px -512px;
  }
  .login dl dd i {
      position: absolute;
      width:20px;
      height:14px;
      background:url(../assets/images/iconlist.png) no-repeat;
      right:6px;
      top:12px;
      display: none;
  }
  .login dl dd i.icon_ok {
      background-position:0 -550px;
  }
  .login dl dd i.icon_error {
      background-position:0 -570px;
  }
  .login p input {
      vertical-align: middle;
  }
  .login p span {
      font-size: 14px;
      color:#666;
      display: inline-block;
      vertical-align: middle;
      margin:16px 0;
  }
  .login button {
      outline: none;
      display: block;
      width: 100%;
      height:38px;
      border-radius: 3px;
      border:0;
      margin-top:8px;
      background: #72b134;
      color:#fff;
      font-size: 18px;
  }
  .login button:hover {
      background: #7dbc3f;
  }
  .login button:active {
      background: #85c447;
  }
</style>