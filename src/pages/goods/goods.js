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
let {id} = qs.parse(location.search.substr(1))
console.log({id})
new Vue({
    el:'#app',
    data:{
        details:null
    },
    created(){
        this.getDetails()
    },
    methods:{
        getDetails(){
            axios.get(url.details,{id}).then(res=>{
               this.details = res.data.data
               console.log(res)
            }).catch(res=>{
                console.log(404)
            })
        }
    },
    mixins:[mixin]
})