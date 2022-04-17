<template>
   <div class="breadcrumbs" >
       <v-container>
       <div class="title">
           <h2 style="text-align:center !important">{{breadcrumb.title}}</h2>
       </div>
            <v-breadcrumbs
            :items="items"
            :light="true"
            large
            >
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              :href="item.href"
              nuxt
              :disabled="item.disabled"
            >
              {{ item.text.toUpperCase() }}
            </v-breadcrumbs-item>
          </template>
            </v-breadcrumbs>
       </v-container>
   </div>
</template>

<script>
import {breadCrumb} from '@/utils/Helpers'
  export default {
    computed:{
      breadcrumb(){
        if (typeof breadCrumb(this.$route.name) == 'undefined') return {title: 'اضافة مشروع',page: 'projects-create',}
        return breadCrumb(this.$route.name)
      },

      items(){
        return  [
        {
          text: 'الرئيسية',
          disabled: false,
          href: '/',
        },
        {
          text:  typeof breadCrumb(this.$route.name).title  != 'undefined' ?  breadCrumb(this.$route.name).title : '',
          disabled: false,
          href: this.$route.to,
        }
        ]
      }
      
    },
    
  }
</script>

<style>
h2{
  font-family: "Tjwal";

}
.nav:not(.fixed-nav){
  background-color: transparent;
}
.breadcrumbs{
    display: flex;
    justify-content: flex-end;
    align-content: center;
    background-color: var(--primary);
    background-image: url(../../assets/images/breadcrumb.jpg);
    background-position: center;
    background-size: cover;
    padding: 20px;
    flex-direction: column;
    color: #fff;
    text-align: center;
    height: calc(30vh + 140px);
    transform : translateY(-140px);
    position: relative;
}
.breadcrumbs::before{
  content: "";
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.7);
  position: absolute;
  top: 0;
  left: 0;
}
.title h2{
    z-index: 2;
    display: block;
    position: relative;
}
.v-breadcrumbs{
    margin-top: 30px;
    justify-content: center;
}
.breadcrumbs li,.breadcrumbs a {
    color :#fff !important;
    z-index: 2;
    text-align: center;
}
</style>