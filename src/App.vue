<template>
  <div id="app" class="hello">
    <Header></Header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex: 1;
  margin: 10px;
  align-items: center;
}

#login-form .el-card {
  background-color: rgb(256,256,256, 0.5);
}
</style>
