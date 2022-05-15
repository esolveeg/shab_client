<template>
<div>
  <v-form ref="form" v-model="valid">
    <v-row>
      <p class="user_msg" v-if="disabled">لقد تم استقبال طلبك بنجاح و سنقوم بارسال لك رسالة بعد تاكيد طلبك</p>
      <v-col cols="8">
        <partials-card
          :user="userCLone"
          :role="newRole"
          :test="true"
        ></partials-card>
      </v-col>
      <v-col cols="4">
        <div class="pricing">
          <h3>الحالية : {{ this.user.Role }}</h3>
          <h4>فرق الترقية</h4>
          <h1>{{ upgradeFee }} ريال</h1>
        </div>
      </v-col>
      <v-col cols="12">
        <v-combobox
          label="العضوية"
          ref="role"
          :readonly="disabled"
          :items="roles"
          item-text="Name"
          item-value="Id"
          v-model="role"
          outlined
        ></v-combobox>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn
          :loading="loading"
          :disabled="disabled"
          @click.prevent="upgradeRequest()"
          class="app-btn"
          >ترقية</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</div>
</template>


<script>
import { mapGetters } from 'vuex'
import {Upgrade , FindUpgradeRequests} from '@/repositoreis/user.js'
export default {
  data() {
    let newRole = this.$store.getters['user/user'].Role_id
    return {
      showBank: false,
      upgradeFee: null,
      valid: false,
      newRole,
      role: null,
      currentRequest: null,
      disabled : false,
      loading: false,
    }
  },
  methods: {
    upgradeRequest() {
      Upgrade(this.newRole).then(res => {
        this.$store.commit(
          'ui/snackBar',
          'تم استلام الطلب بنجاح سنقوم بالتواصل معك'
        )
        this.$emit('changeTab' , 0)
      })
    },
    getCurrenRequest(){
      FindUpgradeRequests().then(res => {
        console.log(res)
        console.log(res.PriceToPay)
        this.newRole = res.NewRoleId 
        this.disabled = true
        this.currentRequest = res
        this.role = {
          Id : res.NewRoleId ,
          Name : res.NewRole ,
          Price : res.PriceToPay
        }

      })
    }
  },
  watch: {
    role(val) {
      this.showBank = true
      this.upgradeFee = val.Price
      this.newRole = val.Id
    },
  },
  computed: {
    roles() {
      return this.$store.getters['ui/roles'].filter(
        (role) => role.Id > this.$store.getters['user/user'].Role_id
      )
    },
    ...mapGetters({
      user: 'user/user',
      userLoading: 'user/loading',
    }),

    userCLone: {
      get: function () {
        return { ...this.user }
      },
    },
  },
  created(){
    this.getCurrenRequest()
  }
}
</script>


<style>
.pricing {
  font-weight: bold;
  color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}
.pricing h3 {
  font-size: 25px;
}
.pricing h1 {
  font-size: 50px;
}
</style>