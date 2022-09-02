<template>
   <div class="member">
       <div class="img" :style="{borderColor : user.Color}">
           <img :src="image(user.Img)" alt="الشاب الريادي">
       </div>
       <h2>{{user.Name_ar}}</h2>
   </div>
</template>
<script>
import {image} from '@/utils/Helpers'

export default {
    props:['user'],
    methods:{
        image
    }
}
</script>
<style scoped src="@/assets/scss/partials/member.css">