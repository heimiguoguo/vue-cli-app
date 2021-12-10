<template>
  <div id="register-form">
    <el-card>
      <div slot="header">
        <span>注册</span>
      </div>
      <el-form ref="registerForm" label-width="80px" :model="user">
        <el-form-item
          prop="name"
          label="姓名"
          :rules="[
            { required: true, message: '请输入用户名' },
            { validator: this.validateNameOccupied, trigger: 'blur' },
          ]"
        >
          <el-input v-model="user.name" autocomplete></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :rules="[
            { required: true, message: '请输入密码' },
            { min: 6, max: 8, message: '请输入6-8位密码' },
          ]"
        >
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入正确格式邮箱' },
            { validator: validateEmailOccupied, trigger: 'blur' },
          ]"
        >
          <el-input v-model="user.email" autocomplete></el-input>
        </el-form-item>
        <el-form-item
          prop="phone"
          label="电话"
          :rules="[
            { required: true, message: '请输入电话' },
            {
              pattern: /^1[3|4|5|7|8][0-9]{9}$/,
              message: '请输入有效电话号码',
            },
            { validator: validatePhoneOccupied, trigger: 'blur' },
          ]"
        >
          <el-input v-model="user.phone" autocomplete></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register" :loading="loading"
            >注册</el-button
          >
        </el-form-item>
        <router-link to="/login1" style="margin-left: 80px"
          >已有账号，去登录1</router-link
        >
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
function checkUserExist (params) {
  return axios
    .get('/api/checkUserExist', {
      params
    })
    .then((res) => {
      return res.data
    })
}
export default {
  data () {
    return {
      user: {
        name: '',
        password: '',
        email: '',
        phone: ''
      },
      loading: false
    }
  },
  methods: {
    validateNameOccupied (rule, value, callback) {
      checkUserExist({ name: value }).then((result) => {
        if (result) {
          callback(new Error('该用户名已被注册！'))
        } else {
          callback()
        }
      })
    },
    validateEmailOccupied (rule, value, callback) {
      checkUserExist({ email: value }).then((result) => {
        if (result) {
          callback(new Error('该邮箱已被注册！'))
        } else {
          callback()
        }
      })
    },
    validatePhoneOccupied (rule, value, callback) {
      checkUserExist({ phone: value }).then((result) => {
        if (result) {
          callback(new Error('该手机号码已被注册！'))
        } else {
          callback()
        }
      })
    },
    register () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true
          axios
            .post('/api/signup', this.user)
            .then((res) => {
              this.loading = false
              if (res.data) {
                this.$confirm('注册成功, 点击确定去登录?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'success'
                })
                  .then(() => {
                    this.$router.push('login')
                  })
                  .catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消删除'
                    })
                  })
              }
            })
            .catch((err) => {
              console.log(err)
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
