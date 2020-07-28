<template>
    <div>
      <!--header-->
      <Header />
      <!-- 轮播图 -->
       <Carousel />
      <!--main-->
      <div class="main container">
        <div class="ind_con1">
          <h2 class="title"><a href="http://localhost:8080/index.html#/product" class="more">more</a>净美仕产品</h2>
          <ul class="clearfloat">
            <li><a href="#" class="link"><img src="../assets/images/01.jpg" alt=""/></a></li>
            <li><a href="#" class="link"><img src="../assets/images/02.jpg" alt=""/></a></li>
            <li><a href="#" class="link"><img src="../assets/images/03.jpg" alt=""/></a></li>
          </ul>
        </div>
        <div class="ind_con2 clearfloat">
          <div class="ind_about">
            <h2 class="title">
              <a href="http://localhost:8080/index.html#/about" class="more">more</a>
              <router-link :to="{name:'about'}">查看更多</router-link> 
              关于净美仕
              </h2>
            <p>北京净美仕环境科技有限公司自诞生起一直关注人类呼吸健康的问题，并专注于室内空气质量的研究与改善。2003年，非典来袭，环境安全威胁到了每个人的生命，全国陷入一片恐慌。净美仕肩负着为人类创造健康安全生活环境的使命应运而生。2012年7月，亿朗以“净美仕(Mfresh)”为品牌重塑，以崭新的面貌屹立在净化行业。
              <router-link :to="{name:'about'}">查看更多</router-link> 
            </p>
          </div>
          <div class="ind_news">
            <h2 class="title"><a href="http://localhost:8080/index.html#/news" class="more">more</a>公司动态</h2>
            <ul>
              <li v-for="(item,index) in list.slice(0,4)" :key="index">
                <router-link :to="{name:'news_details',query:{nid:item.nid}}">{{item.title}}</router-link> 
                <span>{{new Date(item.pubTime).toLocaleDateString()}}</span>
              </li>           
            </ul>
          </div>
        </div>
      <!--footer-->
      <Footer />
      </div>
    </div>
</template>

<script>
  import Footer from "../components/Footer"
  import Carousel from "../components/Carousel"
  import Header from "../components/Header"
  export default {
    components:{
      Footer,
      Carousel,
      Header
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
  }
</script>

<style>
  /*main*/
.title {
    font-size: 16px;
    font-weight: lighter;
    padding-left:25px;
    background: url("../assets/images/iconlist.png") 0 -189px no-repeat;
    line-height: 36px;
    border-bottom: 1px solid #ddd;
    text-align: justify;
}
.title .more {
    float: right;
    font-size: 12px;
    color:#999;
}
.title .more:hover {
    color:#f63;
}
.ind_con1 {
    margin-top:20px;
    width: inherit;
}
.ind_con1 ul {
    margin-top: 20px;
}
.ind_con1 ul li {
    float: left;
    margin-right: 65px;
    width: 280px;
    height: 140px;
}
.ind_con1 ul li:last-child {
    margin-right: 0;
}
.ind_con1 ul li img {
    display: block;
    width: 100%;
    height: 100%;
}

.ind_con2 {
    margin-top: 20px;
    width: inherit;
}
.ind_about {
    float: left;
    width: 460px;
}
.ind_about>p {
    text-indent: 26px;
    font-size: 13px;
    color:#555;
    line-height: 26px;
    margin-top:14px;
}
.ind_about>p>a {
    color:#0066cc;
    text-decoration: underline;
}
.ind_news {
    float: right;
    width: 460px;
}
.ind_news>ul {
    margin-top: 12px;
}
.ind_news>ul>li {
    padding-left: 25px;
    background: url(../assets/images/iconlist.png) 9px -258px no-repeat;
    line-height: 32px;
    border-bottom: 1px dotted #ccc;
}
.ind_news>ul>li>span {
    font-size: 12px;
    color:#999;
    width:80px;
    float:right;
}
.ind_news>ul>li>a {
    color:#555;
    font-size: 13px;
}
.ind_news>ul>li>a:hover {
    color:#f63;
}

</style>