<template>
  <div class="user__membership" v-if="!userLoading">
    <v-tabs
          v-model="tab"
        >
          <v-tab>
            معلومات العضوية
          </v-tab>
          <v-tab>
           مميزات العضوية
          </v-tab>
        </v-tabs>
    
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <div class="img">
          <partials-card :user="user"  :role="user.Role_id" :test="false"></partials-card>
      <!-- <img src="http://34.159.3.254:8585/assets/memberships/ryady.png" /> -->
    </div>
    <div class="form">
      <v-row>
        <v-col cols="12" md="6">
          <p>اسمك على البطاقة بالعربي</p>
          <v-text-field append-icon="mdi-abjad-arabic" hide-details :value="user.Name_ar" solo disabled></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <p>اسمك على البطاقة بالإنجليزي</p>
          <v-text-field hide-details append-icon="mdi-alphabetical" :value="user.Name" solo disabled></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <p>تاريخ البداية</p>
          <v-text-field hide-details  append-icon="mdi-calendar-month" value="01/01/2022" solo disabled></v-text-field >

        </v-col>
        <v-col cols="12" md="6">
          <p>تاريخ الانتهاء</p>
          <v-text-field hide-details  append-icon="mdi-calendar-month" value="01/01/2023" solo disabled></v-text-field >
        </v-col>
      </v-row>
       <v-row>
        <v-col cols="12" md="6">
          <p>رقم العضوية</p>
          <v-text-field hide-details  append-icon="mdi-numeric" :value="user.Serial" solo disabled></v-text-field >
        </v-col>
        <v-col cols="12" md="6">
          <p> نوع العضوية </p>
          <v-text-field hide-details  append-icon="mdi-wallet-membership" :value="user.Role" solo disabled></v-text-field >
        </v-col>
        
      </v-row>
    </div>
      </v-tab-item>
      <v-tab-item>
        <v-row>
            <v-col cols="12">
              <partials-features :level="0"/>
            </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>



<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    let newRole  = this.$store.getters['user/user'].Role_id
    return {
      tab : 2,
      showBank:false,
      upgradeFee: null,
      valid:false,
      newRole,
      role : null,
      loading:false,
    }
  },
  methods:{
    upgradeRequest(){
      this.$store.commit(
            'ui/snackBar',
            'تم استلام الطلب بنجاح سنقوم بالتواصل معك'
          )
          this.tab  = 0
    },
  },

  computed: {
    ...mapGetters({
      user: 'user/user',
      userLoading: 'user/loading',
    }),
   
    userCLone:{
      get : function(){
        return {...this.user}
      }
    },
  },
}
</script>