let url = {
  hotLists: "/index/hotLists",
  banner: "/index/banner"
};
// 开发环境和上线环境的切换
let host = "http://rap2api.taobao.org/app/mock/7058";
for (const key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key];
    console.log(url)
  }
}
export default url;
