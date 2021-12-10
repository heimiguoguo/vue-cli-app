<template>
  <div
    class="header-container"
  >
    <h2 style="color: #fff; margin: 0">不开心，你就来 Soul 啊！</h2>
    <div style="display: flex; align-items: center">
      <el-dropdown @command="handleCommand">
        <el-avatar size="medium" fit="contain" src="/static/"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus" command="change-avatar"
            >修改头像</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-circle-plus" command="sign_out"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="更换头像"
      destroy-on-close
      :visible.sync="showDialog"
    >
      <el-form ref="form" :model="form">
        <el-form-item
          prop="avatar"
          :rules="[
            { required: true, message: '请选择图片' },
            { validator: validateFile },
          ]"
        >
          <el-upload
            action=""
            :http-request="httpRequest"
            :accept="acceptedTypes.join(',')"
            :fileList="fileList"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选择图片</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="handleUpload"
              >上传</el-button
            >
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      showDialog: false,
      acceptedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
      form: {
        avatar: null
      },
      fileList: []
    }
  },
  computed: mapState({
    user: state => state.user
  }),
  methods: {
    ...mapMutations(['setUser']),
    async handleCommand (command) {
      if (command === 'change-avatar') {
        this.showDialog = true
      } else {
        const res = await axios.get('api/signout')
        if (res === 'logout成功') {
          // 重置store里边user
          this.setUser(null)
        }
        console.log(this.user)
      }
    },
    httpRequest ({ file }) {
      this.form.avatar = file
      this.fileList = [file]
      this.$refs.form.validateField('avatar')
    },
    validateFile (rule, value, callback) {
      const { type } = value
      if (!this.acceptedTypes.map(type => `image/${type.slice(1)}`).includes(type)) {
        callback(new Error(`请选择格式为${this.acceptedTypes.join(',')}的图片！`))
      } else {
        callback()
      }
    },
    handleUpload () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const formData = new FormData()
          formData.set('avatar', this.form.avatar)
          axios.post('/changeAvatar', formData).then(res => {
            console.log(res)
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #cdbfe3;
  background-color: #6f5499;
  padding: 10px;
}
</style>
