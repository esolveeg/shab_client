<template>
  <div class="contact">
    <v-container>
      <div class="wrapper">
        
          <div>
           
              <v-form ref="contactForm" v-model="valid">
                <v-row>
                  <!-- {{user}} -->
                  <v-col cols="12">
                    <h2 class="app-title">اتصل بنا</h2>
                  </v-col>
                  <v-col cols="12" v-show="error != null">
                    <p class="app-error">{{ error }}</p>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    v-for="(input, index) in inputs"
                    :key="index"
                  >
                    <v-text-field
                      :label="input.label"
                      :ref="input.key"
                      v-model="form[input.key]"
                      :value="input.value"
                      :disabled="input.disabled"
                      :rules="
                        typeof contactUsValidation[input.key] != 'undefined'
                          ? contactUsValidation[input.key]
                          : []
                      "
                      :hint="input.hint ? input.hint : ''"
                      :error-messages="errors[input.key]"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      :label="msg.label"
                      @keyup.enter="valid ? update : ''"
                      v-model="form[msg.key]"
                      rows="3"
                      :error-messages="errors[msg.key]"
                      outlined
                    ></v-textarea>
                  </v-col>

                  <v-col cols="12" class="text-center">
                    <v-btn
                      :disabled="!valid"
                      :loading="loading"
                      @click.prevent="send"
                      class="app-btn"
                      >ارسال
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
          
          </div>
        
       
          <div class="info-wrapper">

            <div class="app-info mb-10">
              <h2 class="app-title">
                معلومات الاتصال
              </h2>
              <div class="ul">
                <li>
                <p><v-icon>mdi-message-outline</v-icon> البريد الاكتروني :</p>
                <p> info@alshabalriyadi.net</p>
                </li>
                <li>
                <p><v-icon class="phone">mdi-phone-outline</v-icon>رقم الجوال :</p>
                <p> 966551651833</p>
                </li>
                <li>
                <p><v-icon>mdi-map-outline</v-icon> العنوان :</p>
                <p>المملكة العربية السعودية - الادارة الرئيسية جدة</p>
                <p>المملكة العربية السعودية - ادارة المشاريع الرياض</p>
                
                </li>
              </div>
          </div>
          
          </div>
       
      </div>
    </v-container>
  </div>
</template>


<script>
import { required } from '@/utils/Helpers'
import { contactUsValidation } from '@/utils/validations'
import { snackBar } from '@/utils/Helpers'
import {SendContactMsg} from '@/repositoreis/contact'
export default {
  data() {
    const Role_id = parseInt(this.$route.query.role)
    return {
      error: null,
      loading: false,
      stepper: 1,
      valid: false,
      snackBar,
      contactUsValidation,
      inputs: [
        {
          label: 'الاسم ',
          key: 'Name',
          value: '',
        },
        {
          label: 'البريد الالكتروني',
          key: 'Email',
          value: '',
        },
        {
          label: 'رقم الهاتف',
          key: 'Phone',
          value: '',
        },
        {
          label: 'الموضوع',
          key: 'Subject',
          value: '',
        },
      ],

      msg: {
        label: 'الرسالة',
        key: 'Breif',
      },
      form: {
        Name: "asd",
        Email: "Asd@asd.com",
        Subject: "asd",
        Phone: "asdasd",
        Breif: "asd",
      },
      errors: {},
      form: {},
      required,
    }
  },
  methods: {
    send() {
      SendContactMsg(this.form).then(res => {
        this.$store.commit('ui/snackBar' , 'تم ارسال رسالتك بنجاح سنقوم بالرد في اقرب وقت')
        this.$refs.contactForm.reset()
      })
     
    },
    validate() {},
  },
  watch: {
    // form:{
    //     handler: function(val)  {
    //       this.validate()
    //     },
    //     deep:true
    // }
  },
  created() {
    Object.keys(this.form).forEach((key) => {
      this.errors[key] = []
    })
  },
}
</script>

<style src="@/assets/scss/pages/contact.css"></style>