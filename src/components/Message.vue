<template>
  <div :class="['message-item', {'message-item-right': msg.user.id===user.id}]">
    <el-avatar size="large" shape="square" fit="fill" :src="getUserAvatar(msg.user)"></el-avatar>
    <div class="message-item-content">
      <span v-if="user.id!==msg.user.id" v-text="msg.user.name"></span>
      <div :class="['bubble', {'bubble-right': msg.user.id===user.id}]">{{msg.data}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    msg: {
      content: String,
      align: String
    }
  }
}
</script>

<style scoped>
.message-item {
  display: flex;
  margin-bottom: 10px;
}
.message-item-right {
  flex-direction: row-reverse;
}
.message-item-right .el-avatar {
  margin-left: 10px;
}
.message-item-content {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.bubble {
  border: 2px solid #ccc;
  position: relative;
  border-radius: 7px;
  padding: 6px 10px;
}
.bubble::before{
  content: '';
  width: 0;
  height: 0;
  border: 5px solid;
  position: absolute;
  bottom: 15px;
  left: -12px;
  border-color: transparent #ccc transparent transparent;
}
.bubble::after{
  content: '';
  width: 0;
  height: 0;
  border: 5px solid;
  position: absolute;
  bottom: 15px;
  left: -10px;
  border-color: transparent white transparent transparent;
}

.bubble-right {
  border-color: rgb(158, 234, 106);
  background-color: rgb(158, 234, 106);
}
.bubble-right::before{
  border-color: transparent transparent transparent rgb(158, 234, 106);
  left: unset;
  right: -12px;
}
.bubble-right::after{
  border-color: transparent transparent transparent rgb(158, 234, 106);
  left: unset;
  right: -12px;
}
</style>
