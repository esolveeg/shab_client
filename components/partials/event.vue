<template>
   <div class="event"  @click.prevent="goToEvent(event.Id)">
       <div class="top">
           <img :src="event.Img"/>
           <p class="cat">
               {{event.CatName}}
           </p>
           
           <div class="join">
               <v-btn class="app-btn" @click.prevent="goToEvent(event.Id)">انضم الينا</v-btn>
           </div>
            <div class="date">
                <p>{{event.Day}}</p>
                <p>{{months[event.Month - 1]}}</p>
                <p>{{event.Year}}</p>
            </div>
            
       </div>
       <h2>{{event.Title}}</h2>
       <p class="status"  v-if="finished">
              تم الانتهاء
           </p>
       <h3 v-else>{{price(event.Price)}}</h3>
   </div>
</template>


<script>
import {price} from '@/utils/Helpers'
export default {
    data(){
        return {
            months:[
                'يناير',
                'فبراير',
                'مارس',
                'أبريل',
                'مايو',
                'يونيو',
                'يوليو',
                'أغسطس',
                'سبتمبر',
                'أكتوبر',
                'نوفمبر',
                'ديسمبر',
            ]
        }
    },
    methods:{
        price,
        goToEvent(id){
            if(this.finished){
                this.$store.commit('ui/snackBar' , 'عفوا هذه الفعالية انتهت بالفعل ترقب اخر فعاليات الشب الريادي')
            }
            this.$router.push(`/events/${id}`)
        }
    },
    props:['event'],
    computed:{
      
        finished:{
           get(){
                let eventDate = new Date(`${this.event.Year}-${this.event.Month}-${this.event.Day}`)
                let today = new Date()
                return today > eventDate

            } 
        }
    }
}
</script>
<style scoped src="../../assets/scss/partials/event.css" />
