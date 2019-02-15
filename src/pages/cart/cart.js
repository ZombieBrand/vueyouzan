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
    userCart: null,
    editingShop: null,
    editingShopIndex: -1
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
    allRemoveSelected: {
      get() {
        if (this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal) {
        if (this.editingShop) {
          this.editingShop.removeChecked = newVal;
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
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
    },
    removeLists() {
      if (this.editingShop) {
        let arr = [];
        this.editingShop.goodsList.forEach(good => {
          if (good.removeChecked) {
            arr.push(good)
          }
        });
        return arr
      }
      return []
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
          shop.removeChecked = false;
          shop.editingMsg = '编辑';
          shop.goodsList.forEach(good => {
            good.checked = true;
            good.removeChecked = false;
          })
        });
        this.lists = lists
      });
    },
    selectGood(shop, good) {
      // window.location.href = `goods.html?id=${shop.shopId}`
      console.log(good.checked, '1');
      let attr = this.editingShop ? 'removeChecked' : 'checked';
      good[attr] = !good[attr];
      shop[attr] = shop.goodsList.every(good => {
        return good[attr]
      })
    },
    selectShop(shop) {
      let attr = this.editingShop ? 'removeChecked' : 'checked';
      shop[attr] = !shop[attr];
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr]
      })
    },
    selectAll() {
      let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
      this[attr] = !this[attr]
    },
    edit(shop, shopIndex) {
      shop.editing = !shop.editing;
      shop.editingMsg = shop.editing ? '完成' : '编辑';
      this.lists.forEach((item, index) => {
        if (shopIndex !== index) {
          item.editing = false;
          item.editingMsg = shop.editing ? '' : '编辑'
        }
      });
      this.editingShop = shop.editing ? shop : null;
      this.editingShopIndex = shop.editing ? shopIndex : -1;
    },
    changeSkuNum(good, goodIndex, num) {
      //判断选购数量
      if (num < 0 && good.number === 1) return;
      good.number += num
    },
    getUsedCart() {
      // let usedCart = JSON.parse(localStorage.getItem('userCart')) || [];
      // for (let i = 0; i < usedCart.length; i++) {
      //   for (let j = i + 1; j < usedCart.length; j++) {
      //     if (usedCart[i].id === usedCart[j].id) {
      //       usedCart[i].number += usedCart[j].number;
      //       usedCart.splice(j, 1);
      //       j = j - 1;  // 关键，因为splice()删除元素之后，会使得数组长度减小，此时如果没有j=j-1的话，会导致相同id项在重复两次以上之后无法进行去重，且会错误删除id没有重复的项。
      //     }
      //   }
      // }
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
