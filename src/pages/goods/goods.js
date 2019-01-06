import './goods.css'
import './goods_common.css'
import './goods_custom.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_theme.css'
import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import mixin from 'js/mixin'
import qs from 'qs'
let {
  id
} = qs.parse(location.search.substr(1))
let cancelScroll = function (event) {
  event.preventDefault()
}
new Vue({
  el: '#app',
  data: {
    details: null,
    detailTab: ['商品详情', '本店成交'],
    tabIndex: 0,
    dealLists: null,
    loading: false,
    bannerLists: null,
    skuType: null,
    showSku: false
  },
  created() {
    this.getDetails()
  },
  mounted() {

  },
  methods: {
    getDetails() {
      axios.post(url.details, {
        id
      }).then(res => {
        this.details = res.data.data
        this.bannerLists = []
        this.details.imgs.forEach(element => {
          this.bannerLists.push({
            clickUrl: 'javascript:;',
            img: element
          })
        });
        console.log(res)
      }).catch(res => {
        console.log(404)
      })
    },
    tabSwitch(index) {
      this.tabIndex = index
      if (index) {
        this.loading = true
        this.getDeal()
      }

    },
    getDeal() {
      axios.post(url.deal, {
        id
      }).then(res => {
        this.dealLists = res.data.data.lists
        this.loading = false
        console.log(res)
      }).catch(res => {
        console.log(404)
      })
    },
    chooseSku(type) {
      this.skuType = type
      this.showSku = true
    },
    touchstart() {},
    skuCancel() {
      this.showSku = false
    }
  },
  watch: {
    // 监视蒙版出现触发禁止滑动事件
    showSku(val) { 
      if (val) { 
        window.addEventListener('wheel',cancelScroll)
        window.addEventListener('keydown',cancelScroll)
      } else {
        window.removeEventListener('wheel',cancelScroll)
        window.removeEventListener('keydown',cancelScroll) 
    }}
  },
  mixins: [mixin]
})
