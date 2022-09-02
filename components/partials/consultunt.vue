<template>
 <div class="consultunt" >
     <div class="img"  :style="`background-image:url(${image(user.Image)})`">
         
     </div>
     <div class="bottom">
         <h2>{{user.Name_ar}}</h2>
         <span class="job-title">{{user.Title}}</span>
         <p>{{user.Breif}}</p>
     </div>
     <div class="skills">
         <v-chip
      class="chip"

      center
      v-for="skill in user.Skills.split(',')"
      :key="skill"

    >
      {{skill}}
    </v-chip>
   
        
     </div>
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
<style scoped src="../../assets/scss/partials/consultunt.css" />
