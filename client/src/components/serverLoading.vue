<template>
  <h1>Start connection to the server</h1>
  <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="">
</template>

<script>
export default {
  name: "serverLoading",
  props: {
    socket: {
      required: true
    }
  },
  mounted() {
    this.socket.connect();
    this.socket.on('connect', () => this.$emit('connect-server'))
    this.socket.on('connect_error', () => this.$emit('error-server'))
    this.socket.on('disconnect', () => this.$emit('disconnect-server'))
    this.socket.on('users', (users) => this.$emit('send-users', users))
  }
}
</script>

<style scoped>

</style>
