<template>
  <h1>Enter your name: </h1>
  <input type="text" v-model="username" @keydown.enter="$emit('setUsername', username)" >
  <button @click="$emit('setUsername', username)">Start</button>
</template>

<script>
export default {
  name: "enterUsernameComponent",
  data(){
    return {
      username: ""
    }
  }
}
</script>

<style scoped>


input{
  padding: 2%;
  border: 2px solid #84bc8d;
  border-radius: 12px;
  margin-right: 1%;
  font-size: 2rem;
}
input:focus{
  outline: none;
}
button{
  color: black;
  border: 2px solid #84bc8d;
  background: #91d29c;
  padding: 2%;
  cursor: pointer;
  font-size: 2rem;
  border-radius: 12px;
}

</style>
