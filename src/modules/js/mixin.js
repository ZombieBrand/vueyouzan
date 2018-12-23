import Foot from 'components/Foot'
import Swipe from 'components/Swipe'
let mixin={
    filters:{
        toFixed2(price){
            if(typeof price === Number){
                return price.toFixed(2)
            }else{
                return price
            }
        }
    },
    components: {
        Foot,
        Swipe
      }
}
export default mixin

