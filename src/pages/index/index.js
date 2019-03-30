import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import {
  InfiniteScroll
} from 'mint-ui'
Vue.use(InfiniteScroll);

new Vue({
  el: '.vue-el',
  data: {
    pageNum: 1,
    pageSize: 6,
    lists: null,
    loading: false,
    allLoaded: false,
    bannerLists: null,
  },
  created() {
    this.getLists();
    this.getBanner()
  },
  methods: {
    getLists() {
      if (this.allLoaded) return;
      // 节流
      this.loading = true;
      axios.get(url.hotLists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        let curLists = res.data.lists;
        // 判断所有数据是否加载完毕
        if (curLists.length < this.pageSize) {
          this.allLoaded = true
        }
        if (this.lists) {
          // 非第一次将下次于上一次合并
          this.lists = this.lists.concat(curLists);
          this.pageNum++
        } else {
          // 第一次请求数据
          this.lists = curLists
        }
        this.loading = false;
        this.pageNum++
      })
    },
    getBanner() {
      axios.get(url.banner).then(res => {
        this.bannerLists = res.data.lists
      })
    }
  },
  mixins: [mixin]
});
