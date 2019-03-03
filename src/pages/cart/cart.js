import "./cart_base.css";
import "./cart_trade.css";
import "./cart.css";
import Vue from "vue";
import mixin from "js/mixin.js";
import axios from "axios";
import url from "js/api.js";
import Velocity from "velocity-animate";
import Cart from 'js/cartService.js'
import fetch from 'js/fetch.js'

new Vue({
  el: ".container",
  data: {
    lists: null,
    total: 0,
    userCart: null,
    editingShop: null,
    editingShopIndex: -1,
    removeData: null,
    animateRun: false,
    moveRestore: 0,
    movePrevious: null
  },
  computed: {
    allSelected: {
      get() {
        if (this.lists && this.lists.length) {
          return this.lists.every(shop => {
            return shop.checked;
          });
        } else {
          return false;
        }
      },
      set(newVal) {
        this.lists.forEach(shop => {
          shop.checked = newVal;
          shop.goodsList.forEach(good => {
            good.checked = newVal;
          });
        });
      }
    },
    allRemoveSelected: {
      get() {
        if (this.editingShop) {
          return this.editingShop.removeChecked;
        }
        return false;
      },
      set(newVal) {
        if (this.editingShop) {
          this.editingShop.removeChecked = newVal;
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal;
          });
        }
      }
    },
    selectLists() {
      if (this.lists && this.lists.length) {
        let ids = [];
        let total = 0;
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              ids.push(good);
              total += good.price * good.number;
            }
          });
        });
        this.total = total;
        return ids;
      } else {
        return [];
      }
    },
    removeLists() {
      if (this.editingShop) {
        let ids = [];
        this.editingShop.goodsList.forEach(good => {
          if (good.removeChecked) {
            ids.push(good);
          }
        });
        return ids;
      }
      return [];
    }
  },
  created() {
    this.getList();
    this.getUsedCart();
  },
  methods: {
    getList() {
      axios.get(url.cartLists).then(res => {
        let lists = res.data.cartList;
        lists.forEach(shop => {
          shop.checked = true;
          shop.editing = false;
          shop.removeChecked = false;
          shop.editingMsg = "编辑";
          shop.goodsList.forEach(good => {
            good.checked = true;
            good.removeChecked = false;
          });
        });
        this.lists = lists;
      });
    },
    selectGood(shop, good) {
      // window.location.href = `goods.html?id=${shop.shopId}`
      console.log(good.checked, "1");
      let attr = this.editingShop ? "removeChecked" : "checked";
      good[attr] = !good[attr];
      shop[attr] = shop.goodsList.every(good => {
        return good[attr];
      });
    },
    selectShop(shop) {
      let attr = this.editingShop ? "removeChecked" : "checked";
      shop[attr] = !shop[attr];
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr];
      });
    },
    selectAll() {
      let attr = this.editingShop ? "allRemoveSelected" : "allSelected";
      this[attr] = !this[attr];
    },
    edit(shop, shopIndex) {
      shop.editing = !shop.editing;
      shop.editingMsg = shop.editing ? "完成" : "编辑";
      this.lists.forEach((item, index) => {
        if (shopIndex !== index) {
          item.editing = false;
          item.editingMsg = shop.editing ? "" : "编辑";
        }
      });
      this.editingShop = shop.editing ? shop : null;
      this.editingShopIndex = shop.editing ? shopIndex : -1;
    },
    reduce(good) {
      if (good.number === 1) return;
      // axios
      //   .post(url.cartAdd, {
      //     id: good.id,
      //     number: 1
      //   })
      //   .then(res => {
      //     good.number--;
      //   });
        Cart.reduce(good.id).then(res=>{
          good.number--;
        })
    },
    add(good) {
      // axios
      //   .post(url.cartAdd, {
      //     id: good.id,
      //     number: 1
      //   })
      //   .then(res => {
      //     good.number++;
      //   });
        Cart.add(good.id).then(res => {
          good.number++
        })
    },
    remove(shop, shopIndex, good, goodIndex) {
      this.removeData = {
        shop,
        shopIndex,
        good,
        goodIndex
      };
      axios
        .post(url.cartRemove, {
          id: good.id
        })
        .then(res => {
          shop.goodsList.splice(goodIndex, 1);
          if (shop.goodsList.length === 0) {
            this.lists.splice(shopIndex, 1);
            this.editingShop = null;
            this.editingShopIndex = -1;
            this.lists.forEach(item => {
              item.editing = false;
              item.editingMsg = "编辑";
            });
          }
        });
    },
    removeShops() {
      // let {shop, shopIndex, good, goodIndex} = this.removeData;
      let ids = [];
      this.removeLists.forEach(item => {
        ids.push(item.id);
      });
      axios
        .post(url.cartMremove, {
          ids
        })
        .then(res => {
          let arr = [];
          this.editingShop.goodsList.forEach(good => {
            let index = this.removeLists.findIndex(item => {
              return item.id === good.id;
            });
            if (index === -1) {
              arr.push(good);
            }
          });
          if (arr.length) {
            this.editingShop.goodsList = arr;
          } else {
            this.lists.splice(this.editingShopIndex, 1);
            this.editingShop = null;
            this.editingShopIndex = -1;
            this.lists.forEach(item => {
              item.editing = false;
              item.editingMsg = "编辑";
            });
          }
        });
    },
    start(e, good) {
      this.animateRun = true;
      good.startX = e.changedTouches[0].clientX;
      console.log(good.startX, "start");
    },
    move(e, shopIndex, good, goodIndex) {
      let moveX = e.changedTouches[0].clientX>0?e.changedTouches[0].clientX:0;
      console.log({moveX})
      if (
        good.startX - moveX > 0 &&
        good.startX - moveX > 60 &&
        this.animateRun === true
      ) {
        this.animateRun = false;
        let traction = "-" + moveX / 2 + "px";
        this.moveRestore = moveX / 2
        console.log({
          traction
        });
        Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {
          left: traction
        });
      }
    },
    end(e, shopIndex, good, goodIndex) {
      if (this.moveRestore > 60) {
        Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {
          right: `${this.moveRestore -60}px`
        });
      }
      this.animateRun = true;
      let endX = e.changedTouches[0].clientX;
      let left = "0";
      if (good.startX - endX > 20) {
        left = "-60px";
      }
      if (endX - good.startX > 20) {
        left = "0px";
      }
      console.log({
        endX
      }, good.startX);
      console.log({
        left
      });
      Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {
        left: left
      });
    },
    getUsedCart() {
      //获取本地缓存中用户购物车信息并且商品去重
      let usedCart = JSON.parse(localStorage.getItem("userCart")) || [];
      for (let i = 0; i < usedCart.length; i++) {
        for (let j = i + 1; j < usedCart.length; j++) {
          if (usedCart[i].id === usedCart[j].id) {
            usedCart[i].number += usedCart[j].number;
            usedCart.splice(j, 1);
            j = j - 1; // 关键，因为splice()删除元素之后，会使得数组长度减小，此时如果没有j=j-1的话，会导致相同id项在重复两次以上之后无法进行去重，且会错误删除id没有重复的项。
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
