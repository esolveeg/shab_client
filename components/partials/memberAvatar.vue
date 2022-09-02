<template>
    <div class="member-avatar">
        <img :src="image(img)" alt="">
    </div>
</template>


<script>
import {image} from '@/utils/Helpers'
export default {
    props:['img'],
    methods:{
        image
    }
}
</script>

<style scoped src="@/assets/scss/partials/member-avatar.css">