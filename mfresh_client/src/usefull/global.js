var isLogin = sessionStorage.getItem("uid") ? true:false;
var uname = sessionStorage.getItem("uname");
const siteName = "mfresh"; //站点名称

// module export
export default {
  isLogin,
  uname,
  siteName
}