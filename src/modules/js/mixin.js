import Foot from 'components/Foot'
import Swipe from 'components/Swipe'
let mixin={
    filters:{
        toFixed2(price){
            return price.toFixed(2)
        }
    },
    components: {
        Foot,
        Swipe
      }
}
export default mixin

