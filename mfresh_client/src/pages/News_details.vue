<template>
  <div>
    <!--header-->
    <Header />
    <!--面包屑导航-->
    <div class="breadcrumb">
        <div class="container">
            <h2>
              <router-link to="/">首页</router-link>&gt;<router-link to="/news">公司动态</router-link>
            </h2>
        </div>
    </div>
    <!--页面主体-->
    <div class="main container">
        <div class="news_details">
            <h2>{{detail.title}}</h2>
            <span>发布时间：{{new Date(detail.pubTime).toLocaleDateString()}}</span>
            <div class="news_content"  v-html="detail.content">
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
    data(){
      return {
        detail:{}
      }
    },
    components:{
      Header,
      Footer
    },
    methods:{
      getDetail(){
        this.$axios.get("/news/detail",{
          params:{
            nid:this.$route.query.nid
          }
        }).then(res=>{
          this.detail = res.data.data;
          this.detail.content = this.detail.content.replace(/<img src="/g, '<img src="../../static/')
        }).catch(err=>{
          console.log(err)
        })
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
  /*newsdetail content*/
  .news_details {
      margin-top: 30px;
  }
  .news_details>h2 {
      font-size: 18px;
      font-weight: lighter;
      color:#002c69;
      text-align: center;
      line-height: 40px;
      border-bottom: 1px dotted #ccc;
  }
  .news_details>span {
      color:#999;
      text-align: center;
      display: block;
  }
  .news_content {
      padding: 40px;
      line-height: 30px;
      font-size: 13px;
      color:#666;
  }
  .news_content p {
      text-indent: 26px;
      margin-bottom: 10px;
  }
  .news_content img {
      display: block;
      margin: 20px auto;
      max-width: 100%;
  }
</style>