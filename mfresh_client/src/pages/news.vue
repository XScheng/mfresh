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
      <div class="news" v-for="(item,index) in list" :key="index">
        <ul>
          <li><span>{{new Date(item.pubTime).toLocaleDateString()}}</span> <router-link :to="{name:'news_details',query:{nid:item.nid}}">{{item.title}}</router-link> </li>
        </ul>
      </div>
      <!-- 分页导航-->
     <div class="verflow-auto" style="margin:0 auto;width:240px;">
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
        list:[],//存储新闻列表
        pageNum:1,//当前页
        pageSize:1,//每页显示数量
        total:0,//总数
        pageTotal:1,//总页数,默认1
      }
    },
    methods:{
      getNews(){
        this.$axios.get("/news/list",{
          params:{
            pageNum:this.pageNum
          }
        }).then((res)=>{
          if(res.data.code==200){
            this.list = res.data.data.list;
            this.pageNum = res.data.data.pageNum;
            this.pageSize = res.data.data.pageSize;
            this.total = res.data.data.totalRecord;
            this.pageTotal = res.data.data.pageCount;
          }
        }).catch((err)=>{
          console.log(err)
        })
      },
      //获取页码
    linkGen(pageNum) {
        // return pageNum === 1 ? '?' : `?page=${pageNum}`
        return {path:`/news?pageNum=${pageNum}`}
      }
    },
    watch:{
      $route(to,from){
    this.pageNum = this.$route.query.pageNum;
    this.getNews();
      }
    },     
    mounted(){
    //组件挂载完成后,给参数赋值
    this.pageNum = this.$route.query.pageNum;
    this.getNews();
  }
}
</script>

<style>
  /*main news*/
  .news {
      margin:20px 0;
      padding:0 20px;
  }
  .news>ul>li {
      padding-left: 25px;
      background: url(../assets/images/iconlist.png) 9px -258px no-repeat;
      line-height: 32px;
      border-bottom: 1px dotted #ccc;
  }
  .news>ul>li>span {
      font-size: 12px;
      color:#999;
      width:80px;
      float:right;
  }
  .news>ul>li>a {
      color:#555;
      font-size: 13px;
  }
  .news>ul>li>a:hover {
      color:#f63;
  }
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
</style>