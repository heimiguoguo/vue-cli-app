<template>
  <div id="login-form">
    <el-card>
      <div slot="header">
        <span>登录</span>
      </div>
      <el-form
        ref="loginForm"
        label-width="50px"
        :model="user"
      >
        <el-form-item
          prop="account"
          name="account"
          label="账号"
          :rules="[{ required: true, message: '请输入账号(可以是昵称、邮箱或电话号码)' }]"
        >
          <el-input v-model="user.account" autocomplete></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          name="password"
          label="密码"
          :rules="[
            { required: true, message: '请输入密码' },
            { min: 6, max: 8, message: '请输入6-8位密码' },
          ]"
        >
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="login"
            :loading="loading"
          >登录</el-button>
        </el-form-item>
        <router-link
          to="/register"
          style="margin-left: 80px"
        >暂无账号，去注册</router-link>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      user: {
        account: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    login () {
      this.loading = true
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          try {
            const res = await axios.post('/api/signin', this.user)
            this.loading = false
            if (res.data) {
              console.log(res.data)
              // 将userx信息存储在vuex中
              this.setUser(res.data)
              console.log(this.$store.state.user)
              this.$router.push('/room')
            }
          } catch (err) {
            this.loading = false
          }
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
#login-form {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  margin-right: 50px;
}

.el-card {
  width: 400px;
}

</style>
