<template>
 <div class="consultunt" >
     <div class="img"  :style="`background-image:url(${user.Img})`">
         
     </div>
     <div class="bottom" style="background-color: var(--primary);
color: #fff;
padding: 10px;
border-radius: 10px;">
         <h2>{{user.Name_ar}}</h2>
         <span class="job-title">{{user.Title}}</span>
     </div>
    
 </div>
</template>
<script>
export default {
    props:['user'],
 
}
</script>
<style scoped src="../../assets/scss/partials/consultunt.css" />
