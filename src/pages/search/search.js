import axios from "axios";
import "css/common.css";
import url from "js/api.js";
import mixin from "js/mixin.js";
import { InfiniteScroll } from 'mint-ui';
import qs from "qs";
import Vue from "vue";
import "./search.css";


Vue.use(InfiniteScroll)

let {
  keyword,
  id
} = qs.parse(location.search.substr(1));

new Vue({
  el: ".container",
  data: {
    pageNum: 1,
    pageSize: 8,
    loading: false,
    allLoaded: false,
    searchList: null,
    keyword: keyword,
    isShow: false
  },
  created() {
    this.getSearchList();
  },
  methods: {
    getSearchList() {
      if (this.allLoaded) {
        return
      }
      this.loading=true
      axios
        .post(url.searchList, {
          keyword,
          id,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          let curLists = res.data.lists
          console.log(curLists)
          if (curLists.length < this.pageSize) {
            this.allLoaded = true
          }
          if (this.searchList) {
            this.searchList = this.searchList.concat(curLists)
            this.pageNum++
          } else {
            this.searchList = curLists
          }

          this.loading = false
        })
        .catch(res => {
          console.log("getSearchlist404");
        });
    },
    move() {
      console.log(document.documentElement.scrollTop);
      if (document.documentElement.scrollTop || document.body.scrollTop > 100) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    returnTop() {
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
      let step = distance / 20; //每步的距离
      (function jump() {
        console.log(1);
        if (distance > 0) {
          distance -= step;
          window.scrollTo(0, distance);
          setTimeout(jump, 10);
        }
      })();
    }
  },
  mixins: [mixin]
});
