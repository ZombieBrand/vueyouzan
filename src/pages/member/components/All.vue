<template>
  <div class="container" style="min-height: 597px;">
    <div
      class="block-list address-list section section-first js-no-webview-block"
      v-if="lists&&lists.length"
    >
      <a
        class="block-item js-address-item address-item"
        href="javascript:"
        @click="toEdit(list)"
        v-for="list in lists"
        :key="list.id"
        v-bind:class="{'address-item-default':list.isDefault}"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit">修改</a>
      </a>
      <div v-if="lists&&!lists.length">没有数据</div>
    </div>
    <div class="block stick-bottom-row center">
      <router-link
        class="btn btn-blue js-no-webview-block js-add-address-btn"
        v-bind:to="{name:'form',query:{type:'add'}}"
      >新增地址</router-link>
    </div>
  </div>
</template>
<script>
import Address from "js/addressService.js";

export default {
  // data() {
  //   return {
  //     lists: null
  //   }
  // },
  computed: {
    // vuex中获取state下的lists
    lists() {
      return this.$store.state.lists;
    }
  },
  created() {
    // 因为请求数据是异步操作需要dispatch触发vuex中getLists
    if (!this.lists) {
      this.$store.dispatch("getLists");
    }

    // Address.list().then(res => {
    //   this.lists = res.data.lists
    // })
  },
  methods: {
    toEdit(list) {
      // this.$router.push({path: '/address/form'});
      this.$router.push({
        name: "form",
        query: {
          type: "edit",
          instance: list
        }
      });
    }
  }
};
</script>
