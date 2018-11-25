import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'

let {
  keyword,
  id
} = qs.parse(location.search.substr(1))

new Vue({
  el: '.container',
  data: {
    searchList:null
  },
  created() {
    this.getSearchList()
  },
  methods: {
    getSearchList() {
      axios.post(url.searchList, {
        keyword,
        id,
      }).then(res=>{
        console.log(res)
        this.searchList = res.data.lists
      }).catch(res=>{
        console.log('getSearchlist404')
      })
    }
  }
})
