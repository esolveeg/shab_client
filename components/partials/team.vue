<template>
  <div class="team">
    <div class="img" :style="`background-image:url(${image(user.Image)})`">
      <div class="bottom">
        <h3>{{ user.NameAr }}</h3>
        <span class="job-title">{{ user.Title }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { image} from '@/utils/Helpers'

export default {
  methods:{
    image,
  },
  props: ['user'],
}
</script>
<style scoped src="../../assets/scss/partials/team.css" />
