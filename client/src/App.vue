<template>
  <div v-if="loading" class="loading">
    Loading ...
  </div>
  <div v-if="isError" class="error">
    Sorry, error
  </div>
  <div class="app">
   <div class="data">
     <enterUsername v-if="username === null" @setUsername="setUsername"></enterUsername>
     <serverLoading
         v-if="username !== null && !isConnected"
         :socket="socket"
         @connect-server="connect_server"
         @error-server="isError = true"
         @send-users="sendUsers"
     ></serverLoading>
     <chatComponent v-if="isConnected" :socket="socket" :users="users" :user_id="user_id"></chatComponent>
   </div>
  </div>
</template>

<script>

import enterUsername from "@/components/enterUsername";
import serverLoading from "@/components/serverLoading";
import chatComponent from "@/components/chatComponent";
import {io} from "socket.io-client";
export default {
  name: 'App',
  components: {
    enterUsername, serverLoading, chatComponent
  },
  data(){
    return {
      username: null,
      loading: false,
      isConnected: false,
      isError: false,
      socket: null,
      socketProps: {
        ip: '192.168.1.200',
        port: 3000,
        autoConnect: false,
      },
      users: [],
      user_id: null
    }
  },
  mounted() {
    this.socket = io(`${this.socketProps.ip}:${this.socketProps.port}`, {
      autoConnect: this.socketProps.autoConnect
    })
  },
  methods: {
    setUsername(username){
      this.loading = true;
      setTimeout(() => {
        this.socket.on("connect", () => {
          this.user_id = this.socket.id;
        });
        this.username = username;
        this.loading = false;
        this.socket.auth = { username: this.username}
      }, 1000)
    },
    connect_server(){
      setTimeout(() => {
        this.isConnected = true
      }, 1000);
    },
    sendUsers(users){
      users.forEach( e => {
        if(e.id !== this.user_id){
          e.active = false;
          this.users.unshift(e)
        }
      })

    }
  }
}
</script>

<style>
body{
  margin: 0px;
  padding: 0px;
}
.loading{
  position: absolute;
  top: 12px;
  left: 12px;
  color: #383d41;
  background-color: #e2e3e5;
  border-color: #d6d8db;
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: .25rem;
}
.app{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: column;
}
.data{
  width: 70%;
  margin: auto;
  text-align: center;
}
h1{
  font-size: 2.5rem;
}
.error{
  color: #721c24;
  background-color: #f8d7da;
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: .25rem;
  position: absolute;
  top: 12px;
  left: 12px;
}
</style>
