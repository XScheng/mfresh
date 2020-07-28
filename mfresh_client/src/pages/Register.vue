<template>
  <div>
    <!--header-->
    <Header />
    <!--页面主体-->
    <div class="register">
      <h2>新用户注册</h2>
      <!-- <ul>
        <li>
          <span>用户名：</span>
          <input type="text" id="uname" :v-model="form.uname" @blur = "checkUname" placeholder="请输入用户名"/>
          <em></em>
          <i></i>
        </li>
        <li>
          <span>密码：</span>
          <input type="password" id="upwd" :v-model="form.upwd" placeholder="请输入密码"/>
          <em></em>
          <i></i>
        </li>
        <li>
          <span>重复密码：</span>
          <input type="password" id="upwd2" :v-model="form.upwd2" placeholder="请重复输入密码"/>
          <em></em>
          <i></i>
        </li>
        <li>
          <span>手机号：</span>
          <input type="text" id="phone" :v-model="form.phone" @blur="checkPhone" placeholder="请输入手机号"/>
          <em></em>
          <i></i>
        </li>
        <li>
          <span>验证码：</span>
          <input type="text" class="inp_yzm" placeholder="请输入验证码"/>
          <img src="../assets/images/yzm.png" alt=""/>
          <strong class="icon_refresh"></strong>
        </li>
        <li class="li_checkbox"><label>
          <input type="checkbox" :checked="0==1"/>
          <span>我已阅读并同意用户注册协议</span>
        </label>
        </li>
        <li class="li_btn">
        <button type="button" @submit="register">提交注册</button>
        </li>>
      </ul> -->
      <b-container>
        <b-row class="m-auto">
          <b-col cols="12">
            <b-form @submit="register">
                <b-form-group
                  id="input-group-1"
                  label="用户名:"
                  label-for="uname"
                  description="请输入用户名"
                >
                  <b-form-input
                    id="uname"
                    v-model="form.uname"
                    type="text"
                    required
                    @blur = "checkUname"
                    placeholder="用户名"
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="手机号:" label-for="phone">
                  <b-form-input
                    id="phone"
                    v-model="form.phone"
                    type="text"
                    required
                    @blur = "checkPhone"
                    :state="validatePhone"
                    placeholder="请输入手机号"
                  ></b-form-input>
                  <b-form-invalid-feedback :state="validatePhone">
                  手机号非法
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="validatePhone">
                  手机号正确
                  </b-form-valid-feedback>
                </b-form-group>

                <b-form-group id="input-group-2" label="密码:" label-for="upwd">
                  <b-form-input
                    id="upwd"
                    v-model="form.upwd"
                    type="password"
                    required
                    placeholder="请输入密码"
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="确认密码:" label-for="upwd2">
                  <b-form-input
                    id="upwd2"
                    v-model="form.upwd2"
                    type="password"
                    required
                    placeholder="请输入确认密码"
                  ></b-form-input>
                </b-form-group> 
                <li class="li_checkbox" style="list-style:none">
                  <label>
                    <input type="checkbox" :checked="0==1"/>
                    <span>我已阅读并同意用户注册协议</span>
                  </label>
                </li>
                <b-button type="submit" variant="primary"  class="m-auto">注册</b-button>
                <b-button type="reset" variant="danger" class="m-auto">取消</b-button>
              </b-form>
            </b-col>
          </b-row>
        <!--footer-->
        <Footer />
      </b-container>  
    </div>
  </div>
</template>

<script>
  import Footer from "../components/Footer"
  import Header from "../components/Header"
  import qs from "qs"
  export default {
    components:{
      Footer,
      Header
    },
    data(){
      return {
        form:{
          uname:"",
          upwd:"",
          upwd2:"",
          phone:""
        }
      }
    },
    methods:{
      register(){
        // console.log(this.form)
        this.$axios.post("/user/register",qs.stringify(
          this.form
        )).then(res=>{
          // console.log(res)
          if(res.data.code==500){
            //Assigns the uid and uname of the registered user to the session
            sessionStorage.uid = res.data.data.uid;
            sessionStorage.uname = res.data.data.uname;
            alert("register success")
            //jump to the upper page
            history.back();
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      // check uname or phone is exists
      checkUname(){
        this.$axios.post("/user/check/uname",qs.stringify(
          {uname:this.form.uname}
        )).then(res=>{
          // console.log(res);
          if(res.data.code==1){
            alert("uname exists")
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      checkPhone(){
        this.$axios.post("/user/check/phone",qs.stringify(
          {phone:this.form.phone}
        )).then(res=>{
          // console.log(res);
          if(res.data.code==301){
            alert("phone exists")
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },
     computed: {
    //状态校验会解析成oninput事件
      validatePhone() {
        var pt = /^1[3-9]\d{9}$/;
        return pt.test(this.form.phone);
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
    /*register main content*/
  .register {
      width: 800px;
      margin: 45px auto 0;
  }
  .register>h2 {
      line-height: 70px;
      border-bottom: 1px solid #ddd;
      text-align: center;
      font-size: 18px;
      color:#f90;
      font-weight: lighter;
  }
  .register>ul {
      margin-top: 36px;
  }
  .register>ul>li {
      margin-bottom: 22px;
      line-height: 40px;
      height: 40px;
  }
  .register>ul>li>span,.register>ul>li>input, .register>ul>li>em, .register>ul>li>i,.register>ul>li>img,.register>ul>li>strong,.register>ul>li>button {
      float: left;
  }
  .register>ul>li>span {
      margin-left:120px;
      width: 120px;
      text-align: right;
      font-size: 16px;
      color:#666;
  }
  .register>ul>li>input {
      width: 320px;
      height: 38px;
      box-sizing: border-box;
      border:1px solid #ccc;
      border-radius: 3px;
      padding: 0 10px;
  }
  .register>ul>li>input.inp_yzm {
      width: 160px;
  }
  .register>ul>li>em {
      margin:12px 6px 0;
      width:20px;
      height:14px;
      background:url(../assets/images/iconlist.png) no-repeat;
      display: none;
  }
  .register>ul>li>em.icon_ok {
      background-position:0 -550px;
  }
  .register>ul>li>em.icon_error {
      background-position:0 -570px;
  }
  .register>ul>li>i {
      color:#f00;
      font-style: normal;
      display: none;
  }
  .register>ul>li>img {
      margin-left: 16px;
  }
  .register>ul>li>strong {
      width:22px;
      height:26px;
      margin-left: 14px;
      cursor: pointer;
      background:url(../assets/images/iconlist.png) 0px -600px no-repeat;
  }
  .register .li_checkbox {
      margin-top: 40px;
  }
  .register .li_checkbox label {
      margin-left:240px;
  }
  .register .li_checkbox input {
      vertical-align: middle;
  }
  .register .li_checkbox span {
      display: inline-block;
      vertical-align: middle;
  }

  .register button {
      outline: none;
      margin-left: 240px;
      width: 320px;
      height:38px;
      border-radius: 3px;
      border:0;
      margin-top:8px;
      background: #72b134;
      color:#fff;
      font-size: 18px;
      cursor: pointer;
  }
  .register button:hover {
      background: #65a428;
  }
  .li_btn>button.disabled{
      background: #ccc;
      cursor: default;
  }
  .container {
    width: 100%;
    height: 40px;
    margin: 0 auto;
}
</style>