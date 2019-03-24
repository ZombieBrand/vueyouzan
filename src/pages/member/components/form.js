import Address from 'js/addressService.js'

export default {
  data() {
    return {
      name: '',
      tel: '',
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address: '',
      id: '',
      type: '',
      instance: '',
      addressData: require('js/address.json'),
      cityList: null,
      districtList: null
    }
  },
  created() {
    let query = this.$route.query
    console.log(query)
    this.type = query.type
    this.instance = query.instance
    if (this.type === 'edit') {
      let ad = this.instance
      this.provinceValue = ad.provinceValue
      this.name = ad.name
      this.tel = ad.tel
      this.address = ad.address
      this.id = ad.id
    }
  },
  computed: {
    lists() {
      return this.$store.state.lists
    }
  },
  methods: {
    add() {
      /* 最后将数据提交到服务器,返回all页面会从新触发组件生命周期,也就是All页面会从新向服务器获取地址列表 */
      let verify = true
      console.log('add')
      if (this.name === '' || this.name === '请输入中文') {
        alert('请正确输入用户名')
        verify = false
      }
      if (this.tel === '' || this.tel === '请输入手机号') {
        alert('请正确输入手机号')
        verify = false
      }
      if (verify === true) {
        let {
          name,
          tel,
          provinceValue,
          cityValue,
          districtValue,
          address,
          id
        } = this
        let data = {
          name,
          tel,
          provinceValue,
          cityValue,
          districtValue,
          address,
          id
        }
        if (this.type === 'add') {
          // Address.add(data).then(res => {
          //   this.$router.go(-1)
          // })
          console.log(data)
          this.$store.dispatch('addAction', data)
        }
        if (this.type === 'edit') {
          // Address.update(data).then(res => {
          //   this.$router.go(-1)
          // })
          this.$store.dispatch('updateAction', data)
        }
      }
    },
    remove() {
      if (window.confirm('确认删除?')) {
        // Address.remove(this.id).then(res => {
        //   console.log(res) 
        //   this.$router.go(-1)
        // })
        this.$store.dispatch('removeAction', this.id)
      }
    },
    setDefault() {
      // Address.setDefault(this.id).then(res => {
      //   this.$router.go(-1)
      // })
      this.$store.dispatch('setDefaultAction', this.id)
    },
    /* 下边是Input校验 */
    nameReset() {
      console.log(this.name)
      if (this.name === "请输入中文") {
        this.name = ''
      }
    },
    nameJudge() {
      let reg = /[\u4e00-\u9fa5]/gm;
      if (reg.test(this.name) === true) {
        return this.name
      } else {
        return this.name = "请输入中文"
      }
    },
    phoneReset() {
      console.log(this.tel)
      if (this.tel === "请输入手机号") {
        this.tel = ''
      }
    },
    phoneJudge() {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(this.tel) === true) {
        return this.tel
      } else {
        return this.tel = "请输入手机号"
      }
    }
  },
  watch: {
    lists:{
      handler(){
        this.$router.go(-1)
      },
      deep:true
    },
    provinceValue(val) {
      if (val === -1) return
      let list = this.addressData.list
      let index = list.findIndex(item => {
        return item.value === val
      })
      this.cityList = list[index].children
      this.cityValue = -1
      this.districtValue = -1
      if (this.type === 'edit') {
        this.cityValue = parseInt(this.instance.cityValue)
      }
    },
    cityValue(val) {
      if (val === -1) return
      let list = this.cityList
      let index = list.findIndex(item => {
        return item.value === val
      })
      this.districtList = list[index].children
      this.districtValue = -1
      if (this.type === 'edit') {
        this.districtValue = parseInt(this.instance.districtValue)
      }
    }
  }
}
