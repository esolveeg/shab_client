<template>
  <div class="app-card">
    <div class="wrapper">
      <img
        src="@/assets/images/temp01.png"
        alt="الشاب الريادي"
        v-if="role == 1"
      />
      <img
        src="@/assets/images/temp02.png"
        alt="الشاب الريادي"
        v-if="role == 2"
      />
      <img
        src="@/assets/images/temp03.png"
        alt="الشاب الريادي"
        v-if="role == 3"
      />
      <div class="card-data">
    <div class="water_mark"  v-if="test">
      <p v-for="i in 20" :key="i">معاينة</p>
    </div>
        <h4 class="card-name"></h4>
        <div class="card-user">
          <h4>{{ user.Name_ar }}</h4>
          <h5>{{ user.Name }}</h5>
        </div>
        <div class="card-serial">
          <h4 class="date">12/{{year}}</h4>
          <h4 class="serial">{{ user.Serial }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user' , 'role' , 'test'],
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>


<style  src="@/assets/scss/partials/app-card.css" />
