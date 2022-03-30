<template>
    <v-row justify="center">
      <v-dialog
      v-model="modal"
      max-width="400px"
    >
      <v-card class="radius">
        <v-card-text>
          <v-container>
            <v-form >
               <v-row>
                    <v-col cols="12" class="my-8">
                        <h2 class="app-title">اطلب خدمة</h2>
                    </v-col>
                <v-col cols="12">
                    <p class="app-error" v-show="error">من فضلك قم بكتابة 40 حرف بحد اقصي</p>

                    <v-textarea
                    label="من فضلك قم بتلخيص طلبك"
                    counter="400"
                    v-model="breif"
                    outlined
                    ></v-textarea>
                </v-col>
                 <v-col cols="12" class="text-center">
                    <v-btn @click.prevent="submit()" class="app-btn">طلب</v-btn>
                </v-col>
               </v-row>
            </v-form>
           
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import {RequestService} from '@/repositoreis/user.js'
import {required } from '@/utils/Helpers'
  export default {
    data: () => ({
      breif : "",
      error:false,
       required,
    }),
    computed:{
      modal :{
        get: function(){
          return this.$store.getters['ui/serviceModal']
        },
        set: function(val){
          return this.$store.commit('ui/serviceModal' , val)
        },
      }
    
    },
    methods:{
      submit(){
        if(this.breif.length > 400){
          this.error= true;
          return
        }
        RequestService(this.$store.getters['user/serviceId'] ,  this.breif).then(()  => {
          this.$store.commit('ui/snackBar' , 'تم استقبال طلبك بنجاح سنقوم بالتواصل معك عبر البريد الالكتروني المربوط بحسابك')
          this.modal = false
        })
      },
    },
   
  
  }
</script>

<style scoped>
.app-btn{
    margin : 0 !important;
    width: 100% !important;
    background-color: var(--primary) !important;
    color:#fff !important
}

</style>