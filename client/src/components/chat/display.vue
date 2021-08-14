<template>
  <div class="no-info" v-if="cur_id === null">
    You dont choose the display
  </div>
  <div class="chat" v-if="cur_id !== null">
    <h2>You choose: <b>{{cur_id}}</b></h2>
    <ul>
      <li v-for="message in getCurrentMessages()">#<b>{{message.from}} - </b>{{message.message}}</li>
    </ul>
    <input  class="input" type="text" @keydown.enter="sendMessage()" v-model="message">
    <button @click="sendMessage()">Send</button>
  </div>
</template>

<script>
export default {
  name: "display",
  props: ['cur_id', 'user_id', 'socket'],
  data(){
    return {
      messages: [],
      message: ""
    }
  },
  created() {
    this.socket.on('sendmessage', (message) => {
      this.messages.push(message);
    })
  },
  methods: {
    sendMessage(){
      const message = {from: this.user_id, to: this.cur_id, message: this.message};
      this.socket.emit('sendmessage', message);
      this.messages.push(message);
      this.message = '';
    },
    getCurrentMessages(){
      return this.messages.filter(message => {
        if(message.from === this.cur_id || message.to === this.cur_id){
          return message;
        }
      })
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
  font-size: 1.2rem;
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
  font-size: 1.2rem;
  border-radius: 12px;
}
.no-info{
  font-size: 1.5rem;
}
li{
  font-size: 1.2rem;
}
ul{
  margin-bottom: 10%;
}
</style>
