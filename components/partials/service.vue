<template>


    <div class="service" @click.prevent="send">
        <div class="icon">
            <v-icon>mdi-{{service.Icon}}</v-icon>
        </div>
            <h2>
                {{service.Name}}
            </h2>
            <v-btn class="app-btn" @click.prevent="send">اطلب الان</v-btn>
            
    </div>
   
</template>

<script>
export default {
    props:['service'],
    methods:{
        send(){
            this.$store.commit("user/serviceId" , this.service.Id)
            this.$store.commit('ui/serviceModal' , true)
            
            // this.$store.commit('ui/snackBar' , 'تم استقبال طلبك بنجاح سنقوم بالتواصل معك عبر البريد الالكتروني المربوط بحسابك')
        }
    }
}
</script>
<style scoped src="../../assets/scss/partials/service.css" />
