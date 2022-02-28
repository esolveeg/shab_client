<template>
 <div class="vip" :style="`background-image:url(${user.Img})`">
     <h2>{{user.Name_ar}}</h2>

     <p>{{user.Breif}}</p>
 </div>
</template>
<script>
export default {
    props:['user'],
 
}
</script>

<style scoped src="@/assets/scss/partials/member-vip.css" />
