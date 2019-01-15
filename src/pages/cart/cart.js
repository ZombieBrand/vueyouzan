import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import mixin from 'js/mixin.js'
import axios from 'axios'
import url from 'js/api.js'

new Vue({
  el: '.container',
  data: {
    lists: null,
    total:0
  },
  computed: {
    allSelected: {
      get() {
        if (this.lists && this.lists.length) {
          return this.lists.every(shop => {
            return shop.checked
          })
        } else {
          return false
        }
      },
      set(newVal) {
        this.lists.forEach(shop => {
          shop.checked = newVal;
          shop.goodsList.forEach(good => {
            good.checked = newVal
          })
        })
      }
    },
    selectLists(){
      if(this.lists&&this.lists.length){
        this.lists.forEach(shop=>{
          shop.goodsList.forEach(good=>{
            if(good.checked){

            }
          })
        })
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      axios.get(url.cartLists).then(res => {
        let lists = res.data.cartList;
        lists.forEach(shop => {
          shop.checked = true;
          shop.goodsList.forEach(good => {
            good.checked = true
          })
        });
        this.lists = lists
      });
    },
    selectGood(shop, good) {
      // window.location.href = `goods.html?id=${shop.shopId}`
      console.log(good.checked);
      good.checked = !good.checked;
      shop.checked = shop.goodsList.every(good => {
        return good.checked
      })
    },
    selectShop(shop, shopIndex) {
      let editShop = this.lists[shopIndex];
      if (editShop.checked) {
        editShop.checked = false;
        editShop.goodsList.forEach(good => {
          good.checked = false
        })
      } else {
        editShop.checked = true;
        editShop.goodsList.forEach(good => {
          good.checked = true
        })
      }
    },
    selectAll() {
      this.allSelected = !this.allSelected
    }
  },
  mixins: [mixin]
});
