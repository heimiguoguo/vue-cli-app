<template>
  <div class="chat-panel">
    <div class="left-panel">
        <div class="user-item" v-for="user in users" :key="user.id" @click='selectFriend(user.id)'>
            <el-avatar size="large" shape="square" fit="fill" :src="getUserAvatar(user)"></el-avatar>
            <div class="user-item-right">
                <span class="user-item-name" v-text="user.name"></span>
                <span class="user-item-latest-message"></span>
            </div>
        </div>
    </div>
    <div class="right-panel">
      <div class="right-panel-header">
        <span>{{activeFriend.name}}</span>
      </div>
      <div class="message-list">
        <Message v-for="(msg, index) in messages" :key="index" :msg="msg" :user="user"></Message>
      </div>
      <div class="message-edit-area">
        {{message}}
        <div class="message-textarea" :value="message" @change="onMessageChange" contenteditable="true"></div>
        <div>
          <el-button class="send-button" type="primary" size="mini" @click='send'>发送</el-button>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Message from './Message.vue'
function addToUserList (list, user) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === user.id) {
      return
    }
  }
  list.push(user)
}

function removeFromUserList (list, user) {
  let target = -1
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === user.id) {
      target = i
      break
    }
  }
  if (target >= 0) {
    list.splice(target, 1)
  }
}

function addMessage (list, msg) {
  list.push(msg)
  // $('#message-list').parent().animate({
  //   scrollTop: $('#message-list').height()
  // }, 1000)
}

export default {
  components: {
    Message
  },
  data () {
    return {
      messages: [],
      message: '',
      users: []
    }
  },
  mounted () {
    var ws = new WebSocket('ws://localhost:4000/ws/chat')
    this.ws = ws
    const self = this

    ws.onmessage = function (event) {
      var data = event.data
      console.log(data)
      var msg = JSON.parse(data)
      if (msg.type === 'list') {
        self.users = msg.data
      } else if (msg.type === 'join') {
        addToUserList(self.users, msg.user)
      } else if (msg.type === 'left') {
        removeFromUserList(self.users, msg.user)
      } else if (msg.type === 'chat') {
        addMessage(self.messages, msg)
      }
    }

    ws.onclose = function (evt) {
      console.log('[closed] ' + evt.code)
      // var input = $('#form-chat').find('input[type=text]')
      // input.attr('placeholder', 'WebSocket disconnected.')
      // input.attr('disabled', 'disabled')
      // $('#form-chat').find('button').attr('disabled', 'disabled')
    }

    ws.onerror = function (code, msg) {
      console.log('[ERROR] ' + code + ': ' + msg)
    }
  },
  computed: {
    activeFriend: function () {
      return this.users.length && (this.users.find(item => item.active) || this.users[0])
    },
    ...mapState(['user'])
  },
  methods: {
    selectFriend (id) {
      this.users = this.users.map(item => item.id === id ? Object.assign({}, item, { active: true }) : Object.assign({}, item, { active: false }))
    },
    onMessageChange (e) {
      console.log(e.target.value)
    },
    send () {
      this.ws.send(this.message)
    }
  }
}
</script>

<style scoped>
.chat-panel {
  display: flex;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.left-panel {
    width: 300px;
    background-color: rgb(235, 233, 232);
}
.user-item {
  display: flex;
  align-items: center;
  padding: 10px;
}
.user-item:hover{
  background-color: rgb(220, 219, 218);
}
.user-item-right {
   margin-left: 10px;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.right-panel-header {
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
  background-color: rgb(245,245,245);
}

.message-list {
  flex: 1;
  padding: 18px 20px;
  background-color: rgb(245,245,245);
}
.message-edit-area {
  height: 100px;
  border-top: 1px solid #ebeef5;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
}
.message-textarea {
  outline: none;
  margin-bottom: 10px;
  flex: 1;
  overflow: auto;
}
.send-button {
  float: right;
}
</style>
