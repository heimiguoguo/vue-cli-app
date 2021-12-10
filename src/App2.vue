<template>
  <div id="app" style="width: 200px; height: 200px">
    <vue-cropper
      ref="cropper"
      :img="option.img"
      :outputSize="option.size"
      :outputType="option.outputType"
      autoCrop
      centerBox
    ></vue-cropper>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  components: {
    VueCropper
  },
  data () {
    return {
      option: {
        img: 'static/bg.png',
        size: 1,
        outputType: 'webp'
      }
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
