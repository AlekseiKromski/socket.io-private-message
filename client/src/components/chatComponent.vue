<template>
  <div class="user_id">User id #<b>{{user_id}}</b></div>
  <div class="chat">
    <div class="chat-leftbar">
      <listOfUsers :users="listUsers" :socket="socket" v-model="cur_id"></listOfUsers>
    </div>
    <div class="chat-rightdisplay">
      <display :cur_id="cur_id" :user_id="user_id" :socket="socket"></display>
    </div>
  </div>
</template>

<script>
import listOfUsers from "@/components/chat/listOfUsers";
import display from "@/components/chat/display";
export default {
  name: "chatComponent",
  props: ['socket', 'users', 'user_id', "socket"],
  components: {
    listOfUsers, display
  },
  data(){
    return {
      cur_id: null,
      listUsers: this.users
    }
  },
  mounted() {
    this.socket.on('userconnect', (user) => {
      if(this.user_id !== user.id){
        this.listUsers.unshift(user);
      }
    })
    this.socket.on('userdisconnect', (user) => {
      this.listUsers = this.listUsers.filter( element => {
       if(element.id !== user.id) {
         return element;
       }
     })
    })

  }
}
</script>

<style scoped>
.chat{
  width: 80%;
  display: flex;
  margin: auto;
  text-align: left;
}
.chat-leftbar{
  width: 40%;
}
.chat-rightdisplay{
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user_id{
  margin-bottom: 5%;
  font-size: 1.7rem;
}
</style>
