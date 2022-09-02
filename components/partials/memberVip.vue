<template>
 <div class="vip" :style="`background-image:url(${image(user.Img)})`">
     <div class="content">
        <h2>{{user.Name_ar}}</h2>
        <p>{{user.Breif}}</p>    
     </div>
     
 </div>
</template>
<script>
import { image} from '@/utils/Helpers'
export default {
    props:['user'],
    methods:{
        image
    }
 
}
</script>

<style scoped src="@/assets/scss/partials/member-vip.css" />
