<template>
  <div id="app">

    <template v-if="loading">
      <div class="row-fluid">
        <div class="col-xs-12 text-center loading-run">
         <loading :height="80" :width="80"></loading>
       </div>
     </div>
   </template>

   <template v-else>
    <navbar :statusnavbar="statusnavbar"></navbar>
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
import Firebase from 'firebase'
import loading from './components/Loading.vue'
import navbar from './components/Navbar.vue'

export default {
  name: 'Buddy-Admin',
  components: {
    loading,
    navbar
  },
  data () {
    return {
      statusnavbar: '',
      user: '',
      login: true,
      loading: true
    }
  },
  created() {
    var vm = this;
    Firebase.auth().onAuthStateChanged((user) => {
      vm.loading = true;
      setTimeout(() => {
        if (user) {
          vm.user = user;
          vm.$router.push('/painel-de-controle');
          vm.statusnavbar = true;
          vm.login = false;
          vm.loading = false;
        } else {
          vm.$router.push('/')
          vm.loading = false;
          vm.statusnavbar = false;
        }
      }, 1000);
    });
  }
}
</script>

<style lang="scss" src="./assets/css/main.scss"></style>