<template>
  <div id="app">
    <h3>{{count}}</h3>
    <h3>{{age}}</h3>
    <button @click="increment()">increment</button>
    <button @click="incrementBy({amount:10})">incrementBy</button>
    <button @click="incrementAsync({amount:10})">incrementAsync</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  computed: mapState(["count", "age"]),
  methods: {
    ...mapMutations(["increment", "incrementBy"]),
    ...mapActions(["incrementAsync"])
  }
};
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
