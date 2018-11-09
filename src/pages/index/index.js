import 'css/common.css';
import './index.css';
import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import Mint from 'mint-ui';
import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'
Vue.use(Mint);
const app = new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoaded: false,
    bannerLists:null,
  },
  created() {
    this.getLists()
    this.getBanner()
  },
  methods: {
    getLists() {
      if (this.allLoaded) return
      this.loading = true
      axios.get(url.hotLists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then(res => {
        let curLists = res.data.lists
        // 判断是否全部数据都已请求完
        console.log(res)
        if (curLists < this.pageSize) {
          this.allLoaded = true
        }
        if (this.lists) {
          this.lists = [...this.lists, ...curLists]
        } else {
          //第一次请求数据
          this.lists = curLists
        }
        this.pageNum++
          this.loading = false
      })
    },
    getBanner(){
      axios.get(url.banner).then(res =>{
        this.bannerLists = res.data.lists
      })
    }
  },
  components:{
    /* 
      es6语法
      相当于Foot:Foot
     */
    Foot,
    Swipe
  }
})
