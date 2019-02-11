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
    total: 0,
    userCart: null
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
    selectLists() {
      if (this.lists && this.lists.length) {
        let arr = [];
        let total = 0;
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              arr.push(good);
              total += good.price * good.number
            }
          })
        });
        this.total = total;
        return arr
      } else {
        return []
      }
    }
  },
  created() {
    this.getList();
    this.getUsedCart()
  },
  methods: {
    getList() {
      axios.get(url.cartLists).then(res => {
        let lists = res.data.cartList;
        lists.forEach(shop => {
          shop.checked = true;
          shop.editing = false;
          shop.editingMsg = '编辑'
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
    },
    edit(shop,shopIndex){
      console.log('编辑')
       shop.editing = !shop.editing
       shop.editingMsg = this.editing ? '完成':'编辑'
       this.lists.forEach((item,index) =>{
        if(shopIndex !== index){
          item.editing = false
          item.editingMsg = this.editing?'完成':'编辑'
        }
       })
    },
    changeSkuNum(good, goodIndex, num) {
      //判断选购数量
      if (num < 0 && good.number === 1) return;
      good.number += num
    },
    getUsedCart() {
      let usedCart = JSON.parse(localStorage.getItem('userCart')) || [];
      for (let i = 0; i < usedCart.length; i++) {
        for (let j = i + 1; j < usedCart.length; j++) {
          if (usedCart[i].id === usedCart[j].id) {
            usedCart[i].number += usedCart[j].number;
            usedCart.splice(j, 1);
            j = j - 1;  // 关键，因为splice()删除元素之后，会使得数组长度减小，此时如果没有j=j-1的话，会导致相同id项在重复两次以上之后无法进行去重，且会错误删除id没有重复的项。
          }
        }
      }
      // if (usedCart) {
      //   usedCart.push(userCart);
      //   this.userCart = usedCart;
      // } else {
      //   localStorage.setItem('userCart', JSON.stringify(userCart));
      //   this.userCart = localStorage.getItem('userCart');
      // }
    }
  },
  mixins: [mixin]
});
