webpackJsonp([2],{"0C+S":function(t,e){},"A/DB":function(t,e){},NW8W:function(t,e){},TFhR:function(t,e,i){"use strict";var n={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",cartAdd:"/cart/add",cartLists:"/cart/list",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMremove:"/cart/mrremove",details:"/goods/details",deal:"/goods/deal",addCart:"/cart/add"};for(var o in n)n.hasOwnProperty(o)&&(n[o]="http://rap2api.taobao.org/app/mock/22820"+n[o]);e.a=n},"U/rD":function(t,e,i){"use strict";var n=i("pFYg"),o=i.n(n),s=i("mw3O"),r=i.n(s).a.parse(location.search.substr(1)).index,c=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}],a={data:function(){return{navConfig:c,curIndex:parseInt(r)||0}},methods:{changeNav:function(t,e){location.href=t.href+"?index="+e}}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bottom-nav"},[i("ul",t._l(t.navConfig,function(e,n){return i("li",{key:e.icon,class:{active:n===t.curIndex},on:{click:function(i){t.changeNav(e,n)}}},[i("a",[i("i",{class:e.icon}),i("div",[t._v(t._s(e.name))])])])}))])},staticRenderFns:[]};var h=i("VU/8")(a,d,!1,function(t){i("UTo7")},null,null).exports,u=i("DNVT"),l=(i("v2ns"),{props:{lists:{type:Array,required:!0},name:{type:String}},created:function(){},mounted:function(){this.init()},methods:{init:function(){new u.a(".swiper-container",{loop:!0,pagination:{el:".swiper-pagination"}})}}}),f={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper"},this._l(this.lists,function(t){return e("div",{key:t.img,staticClass:"swp-page swiper-slide"},[e("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[e("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.img}})])])})),this._v(" "),this._m(0)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"swiper-pagination"},[e("span")])}]};var g={filters:{toFixed2:function(t){return(void 0===t?"undefined":o()(t))===Number?t.toFixed(2):t}},components:{Foot:h,Swipe:i("VU/8")(l,f,!1,function(t){i("A/DB")},null,null).exports}};e.a=g},UTo7:function(t,e){},eC21:function(t,e){},gWPi:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("NW8W"),o=(i.n(n),i("0C+S")),s=(i.n(o),i("eC21")),r=(i.n(s),i("7+uW")),c=i("U/rD"),a=i("mtWM"),d=i.n(a),h=i("TFhR"),u=i("9qgI"),l=i.n(u);new r.default({el:".container",data:{lists:null,total:0,userCart:null,editingShop:null,editingShopIndex:-1,removeData:null},computed:{allSelected:{get:function(){return!(!this.lists||!this.lists.length)&&this.lists.every(function(t){return t.checked})},set:function(t){this.lists.forEach(function(e){e.checked=t,e.goodsList.forEach(function(e){e.checked=t})})}},allRemoveSelected:{get:function(){return!!this.editingShop&&this.editingShop.removeChecked},set:function(t){this.editingShop&&(this.editingShop.removeChecked=t,this.editingShop.goodsList.forEach(function(e){e.removeChecked=t}))}},selectLists:function(){if(this.lists&&this.lists.length){var t=[],e=0;return this.lists.forEach(function(i){i.goodsList.forEach(function(i){i.checked&&(t.push(i),e+=i.price*i.number)})}),this.total=e,t}return[]},removeLists:function(){if(this.editingShop){var t=[];return this.editingShop.goodsList.forEach(function(e){e.removeChecked&&t.push(e)}),t}return[]}},created:function(){this.getList(),this.getUsedCart()},methods:{getList:function(){var t=this;d.a.get(h.a.cartLists).then(function(e){var i=e.data.cartList;i.forEach(function(t){t.checked=!0,t.editing=!1,t.removeChecked=!1,t.editingMsg="编辑",t.goodsList.forEach(function(t){t.checked=!0,t.removeChecked=!1})}),t.lists=i})},selectGood:function(t,e){console.log(e.checked,"1");var i=this.editingShop?"removeChecked":"checked";e[i]=!e[i],t[i]=t.goodsList.every(function(t){return t[i]})},selectShop:function(t){var e=this.editingShop?"removeChecked":"checked";t[e]=!t[e],t.goodsList.forEach(function(i){i[e]=t[e]})},selectAll:function(){var t=this.editingShop?"allRemoveSelected":"allSelected";this[t]=!this[t]},edit:function(t,e){t.editing=!t.editing,t.editingMsg=t.editing?"完成":"编辑",this.lists.forEach(function(i,n){e!==n&&(i.editing=!1,i.editingMsg=t.editing?"":"编辑")}),this.editingShop=t.editing?t:null,this.editingShopIndex=t.editing?e:-1},reduce:function(t){1!==t.number&&d.a.post(h.a.cartAdd,{id:t.id,number:1}).then(function(e){t.number--})},add:function(t){d.a.post(h.a.cartAdd,{id:t.id,number:1}).then(function(e){t.number++})},remove:function(t,e,i,n){var o=this;this.removeData={shop:t,shopIndex:e,good:i,goodIndex:n},d.a.post(h.a.cartRemove,{id:i.id}).then(function(i){t.goodsList.splice(n,1),0===t.goodsList.length&&(o.lists.splice(e,1),o.editingShop=null,o.editingShopIndex=-1,o.lists.forEach(function(t){t.editing=!1,t.editingMsg="编辑"}))})},removeShops:function(){var t=this,e=[];this.removeLists.forEach(function(t){e.push(t.id)}),d.a.post(h.a.cartMremove,{ids:e}).then(function(e){var i=[];t.editingShop.goodsList.forEach(function(e){-1===t.removeLists.findIndex(function(t){return t.id===e.id})&&i.push(e)}),i.length?t.editingShop.goodsList=i:(t.lists.splice(t.editingShopIndex,1),t.editingShop=null,t.editingShopIndex=-1,t.lists.forEach(function(t){t.editing=!1,t.editingMsg="编辑"}))})},start:function(t,e){e.startX=t.changedTouches[0].clientX,console.log(e.startX,"start")},move:function(t,e,i,n){var o=t.changedTouches[0].clientX;i.startX-o>100&&i.startX-o<105&&(console.log("move",i.startX-o),l()(this.$refs["goods-"+e+"-"+n],{left:"-120px"}))},end:function(t,e,i,n){var o=t.changedTouches[0].clientX,s="0";i.startX-o>100&&(s="-60px"),o-i.startX>100&&(s="0px"),console.log(o,i.startX),l()(this.$refs["goods-"+e+"-"+n],{left:s})},getUsedCart:function(){for(var t=JSON.parse(localStorage.getItem("userCart"))||[],e=0;e<t.length;e++)for(var i=e+1;i<t.length;i++)t[e].id===t[i].id&&(t[e].number+=t[i].number,t.splice(i,1),i-=1)}},mixins:[c.a]})},v2ns:function(t,e){}},["gWPi"]);
//# sourceMappingURL=cart.465d77ff369efc8c3b02.js.map