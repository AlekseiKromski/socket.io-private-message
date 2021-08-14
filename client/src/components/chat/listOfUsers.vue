<template>
  <div class="blocks">
    <div class="block" v-bind:class="{'active':user.active}" v-for="user in users" @click="chooseCurrentDisplay(user.id)">{{user.username}}</div>
    <p style="font-size: 1.5rem;" v-if="users.length === 0">
      <b>No users online, try wait</b>
    </p>
  </div>
</template>

<script>
export default {
  name: "listOfUsers",
  props: ['users', 'socket'],
  methods: {
    chooseCurrentDisplay(id){
      this.users.forEach(user => {
        if(user.active === true){
          user.active = false;
        }
        if(user.id === id){
          user.active = true;
        }
      })
      this.$emit('update:modelValue', id);
    }
  }
}
</script>

<style scoped>
.blocks{
  width: 100%;
}
.block{
  padding: 5%;
  border-radius: 15px;
  margin-bottom: 2%;
  background: #eeeeee;
  font-size: 1.5rem;
}
.active{
  background: #2140d4;
  color: white;
}
.block:hover{
  cursor: pointer;
  color: white;
  background: #576fd7;
}
</style>
