<template>
  <div class="team">
    <div class="img" :style="`background-image:url(${user.Img})`">
      <div class="bottom">
        <h3>{{ user.Name_ar }}</h3>
        <span class="job-title">{{ user.Title }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['user'],
}
</script>
<style scoped src="../../assets/scss/partials/team.css" />
