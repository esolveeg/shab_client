<template>
  <div class="user">
    <v-container v-if="userLoading">
      <v-skeleton-loader></v-skeleton-loader>
    </v-container>
    <v-container v-else>
      <v-tabs :vertical="vertical" v-model="tab">
        <div class="user__data">
          <div class="avatar">
            <v-icon class="camera-icon">mdi-camera</v-icon>
            <partials-member-avatar :img="user.Img" @click.prevent="toggle()" />
          </div>
          <v-file-input
            class="hidden-file-input"
            truncate-length="15"
            v-model="img"
            outlined
          ></v-file-input>
          <h2>{{ user.Name_ar }}</h2>
          <h3>لديك {{ user.Points }} نقطة</h3>
        </div>
        <v-tab v-for="(i, index) in AccountNav" :key="index">
          <v-icon right>
            {{ i.icon }}
          </v-icon>
          {{ i.title }}
        </v-tab>
        <v-tab v-if="user.Role_id < 3">
          <v-icon right>
           mdi-shield-crown-outline
          </v-icon>
          ترقية العضوية
        </v-tab>
       

        <v-tab @click.prevent="logout">
          <v-icon right> mdi-logout </v-icon>
          تسجيل خروج
        </v-tab>
        <v-tab-item>
          <profile-membership />
        </v-tab-item>
        <v-tab-item>
          <div class="user__edit">
            <v-form ref="form" v-model="valid">
              <v-row>
                <!-- {{user}} -->

                <v-col
                  cols="12"
                  md="6"
                  v-for="(input, index) in inputs"
                  :key="index"
                >
                  <v-text-field
                    :label="input.label"
                    @keyup.enter="$refs[inputs[index + 1].key].focus()"
                    :ref="input.key"
                    v-model="form[input.key]"
                    :type="input.key == 'Password' ? 'password' : 'text'"
                    :disabled="input.disabled"
                    :rules="
                      typeof updateUserValidation[input.key] != 'undefined'
                        ? updateUserValidation[input.key]
                        : []
                    "
                    :hint="input.hint ? input.hint : ''"
                    :error-messages="errors[input.key]"
                    outlined
                  ></v-text-field>
                  <p
                    class="app-error"
                    v-if="input.key == 'Email' && error != null"
                  >
                    {{ error }}
                  </p>
                </v-col>

                <v-col cols="12" md="6">
                  <v-textarea
                    :label="breif.label"
                    @keyup.enter="valid ? update : ''"
                    v-model="form[breif.key]"
                    rows="4"
                    counter="140"
                    :error-messages="errors[breif.key]"
                    outlined
                  ></v-textarea>
                </v-col>
                <v-col cols="12" md="6">
                  <v-combobox
                    label="المدينة"
                    ref="city"
                    :items="cities"
                    :loading="citiesLoading"
                    item-text="Name"
                    :menu-props="{ top: true, offsetY: true }"
                    item-value="Id"
                    v-model="city"
                    outlined
                  ></v-combobox>
                </v-col>

                <v-col cols="12" class="text-center">
                  <v-btn
                    :loading="loading"
                    @click.prevent="update"
                    class="app-btn"
                    >تحديث</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </div>
        </v-tab-item>
        <v-tab-item>
          <profile-sms />
        </v-tab-item>
        <v-tab-item>
          <profile-projects />
        </v-tab-item>
        <v-tab-item>
          <profile-articles />
        </v-tab-item>
        <v-tab-item>
          <profile-services />
        </v-tab-item>
        <v-tab-item>
          <profile-upgrade @changeTab="changeTab"/>
        </v-tab-item>
       
      </v-tabs>
    </v-container>
  </div>
</template>


<script>
import AccountNav from '@/utils/AccountNav'
import { logout, addParamsToLocation, required } from '@/utils/Helpers'
import { UpdateUser, Upload } from '@/repositoreis/user'
import { mapGetters } from 'vuex'
import { updateUserValidation } from '@/utils/validations'
import { ListCities } from '@/repositoreis/global'

export default {
  data() {
    return {
      AccountNav,
      vertical: true,
      img: null,
      error: null,
      loading: false,
      upgradeFee:null,
      valid: true,
      newRole: null,
      showBank: false,
      updateUserValidation,
      inputs: [
        {
          label: 'الاسم باللغة العربية',
          disabled: true,
          key: 'Name_ar',
        },
        {
          label: 'الاسم باللغة الانجليزية',
          key: 'Name',
          disabled: true,
        },
        {
          label: 'البريد الالكتروني',
          key: 'Email',
        },
        {
          label: 'كلمة السر',
          key: 'Password',
          hint: 'اترك هذا الحقل خاليا ان كنت لا تريد تغيير كلمة السر',
        },

        {
          label: 'الهاتف',
          key: 'Phone',
        },
        {
          label: 'العضوية',
          key: 'Role',
          disabled: true,
        },
      ],
      breif: {
        label: 'النبذة التعرفية',
        key: 'Breif',
      },
      form: {
        Name: null,
        Name_ar: null,
        Email: null,
        Img: null,
        Password: null,
        Phone: null,
        Role: null,
        Breif: null,
        Website: null,
        Twitter: null,
        Instagram: null,
      },
      city: null,
      errors: {},
      required,
      // tab:0,
    }
  },
  computed: {
    tab: {
      get: function () {
        return this.$store.getters['ui/profileTab']
      },
      set: function (val) {
        this.$store.commit('ui/profileTab', val)
      },
    },
    roles: {
      get: function () {
        return this.$store.getters['ui/roles'].filter(role => role.Id > this.$store.getters['user/user'].Role_id)
      },
     
    },

    ...mapGetters({
      user: 'user/user',
      userLoading: 'user/loading',
      cities: 'city/cities',
      citiesLoading: 'city/loading',
    }),
  },
  watch: {
    tab: {
      handler: function () {
        addParamsToLocation({ tab: this.tab }, this.$route.path)
      },
      deep: true,
    },
    newRole: {
      handler: function (val) {
        this.showBank = true
        this.upgradeFee = val.Price
      },
    },
    img: {
      handler: function (val) {
        let formData = new FormData()
        formData.append('file', val)
        console.log(formData)
        Upload(formData).then((d) => {
          this.form.Img = d
          this.update()
        })

        console.log(val)
      },
    },
  },
  methods: {
    changeTab(tab){
      this.tab = tab
    },
    upgradeRequest(){
      this.$store.commit(
            'ui/snackBar',
            'تم استلام الطلب بنجاح سنقوم بالتواصل معك'
          )
          this.tab  = 0
    },
    getCities() {
      ListCities().then((res) => {
        this.$store.commit('city/cities', res)
        this.$store.commit('city/loading', false)
      })
    },
    logout() {
      logout(this.$store)
      this.$router.push({ name: 'index' })
    },
    update() {
      this.$refs.form.validate()
      if (this.valid) {
        this.loading = true
        if (this.img == null) this.form.Img = ''
        if (this.city != null) this.form.City_id = this.city.Id
        UpdateUser(this.form)
          .then((d) => {
            this.error = null
            this.loading = false
            this.error = null
            this.$store.commit('ui/snackBar', 'تم تحديث البيانات بنجاح')
            this.$store.commit('user/user', d)
          })
          .catch((e) => {
            this.error = 'البريد الالكتروني محجوز'
            this.loading = false
            window.scrollTo({
              top: 300,
              left: 0,
              behavior: 'smooth',
            })
          })
      }
    },
  },
  mounted() {
    // this.roles = this.storeRoles.filter(role => role.Id > this.user.Role_id)
    if (window.innerWidth < 1000) this.vertical = false
    if (this.user == null) {
      this.$router.push('/')
    }

    this.form = { ...this.user }
  },
  created() {
    this.getCities()
    if (this.$route.query.tab) this.tab = parseInt(this.$route.query.tab)
  },
}
</script>


<style  src="@/assets/scss/pages/profile.css"/>