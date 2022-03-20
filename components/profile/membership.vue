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
          <v-tab v-if="user.Role_id < 3">
           ترقية العضوية
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
      <v-tab-item  v-if="user.Role_id < 3">
         <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12">
                <partials-card :user="userCLone" :role="newRole" :test="true"></partials-card>
              </v-col>
              <v-col cols="12">
                <v-combobox
                  label="العضوية"
                  ref="role"
                  :items="roles"
                  item-text="Name"
                  item-value="Id"
                  v-model="role"
                  outlined
                ></v-combobox>
              </v-col>
              <v-col cols="6" v-if="showBank">
                <p>تحويل بنكي بقمة {{upgradeFee}} ر.س</p>
                <ul>
                  <li>آيبان : SA9010000012472813000102</li>
                  <li>الحساب : 12472813000102</li>
                </ul>
              </v-col>
              <v-col cols="6" v-if="showBank">
                <p>دفع الكتروني</p>
                <ul>
                  <li>غير مفعل ف الوقت الحالي</li>
                </ul>
              </v-col>

              <v-col cols="12" class="text-center">
                <v-btn
                  :loading="loading"
                  @click.prevent="upgradeRequest()"
                  class="app-btn"
                  >ترقية</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
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
      tab : null,
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
  watch:{
    role(val){
      this.showBank = true
      this.upgradeFee = val.Price
      this.newRole = val.Id
    }
  },
  computed: {
    roles () {
        return this.$store.getters['ui/roles'].filter(role => role.Id > this.$store.getters['user/user'].Role_id)
    },
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