<template>
  <div class="user__msgs">
    <div class="chat" v-if="true">
      <p
        v-for="msg in msgs"
        :key="msg.Id"
        class="user_msg"
        v-text="msg.Msg"
      ></p>
    </div>
    <div class="no-msgs" v-else>
      <v-icon lg @click.prevent="getMsgs()">mdi-message-alert-outline</v-icon>
      <h2>ليس لديك اي رسائل</h2>
    </div>
  </div>
</template>



<script>
import { mapGetters } from 'vuex'
import { Messages } from '@/repositoreis/user.js'
export default {
  data() {
    return {
      msgs: [],
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      userLoading: 'user/loading',
    }),
  },
  methods: {
    getMsgs() {
      Messages().then((res) => {
        console.log(res)
        this.msgs = res
        this.loading = false
      })
    },
  },

  created() {
    this.getMsgs()
  },
}
</script>
<style>
.chat-msg {
  padding: 20px 30px;
  background-color: var(--alpha-bg);
  color: #fff !important;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 10px;
  width: 100%;

  text-align: center;
}
</style>
