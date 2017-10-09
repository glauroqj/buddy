<template>
  <div id="app">

<!--     <template v-if="loading">
      <div class="row-fluid">
        <div class="col-xs-12 text-center">
         <loading :height="80" :width="80"></loading>
       </div>
     </div>
   </template> -->

   <template>
    <!-- <navBar :statusnavbar="statusnavbar"></navBar> -->
    <div class="row-fluid">
      <aside class="col-xs-3">
        <!-- <sideMenu :statusMenu="menuChange"></sideMenu> -->
      </aside>
      <div class="col-xs-9">
        <router-view></router-view>
      </div>
    </div>
  </template>

</div>
</template>

<script>
import Login from './components/Login.vue'

export default {
  name: 'app',
  components: {
    Login
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
