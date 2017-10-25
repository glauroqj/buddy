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
    <navbar :statusNavbar="statusNavbar" :navbarUser="user"></navbar>
    <div class="row-fluid">
      <aside class="col-xs-3">
        <sidebar :statusSidebar="statusSidebar"></sidebar>
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
import sidebar from './components/Sidebar.vue'

export default {
  name: 'Buddy-Admin',
  components: {
    loading,
    navbar,
    sidebar
  },
  data () {
    return {
      user: {},
      loading: true,
      statusNavbar: false,
      statusSidebar: false
    }
  },
  created() {
    var vm = this;
    Firebase.auth().onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          vm.user = user;
          vm.statusNavbar = true;
          vm.statusSidebar = true;
          vm.loading = false;
          vm.$router.push('/painel-de-controle');
        } else {
          vm.loading = false;
          vm.statusNavbar = false;
          vm.statusSidebar = false;
          vm.$router.push('/');
        }
      }, 1500);
    });
  },
  mounted() {
  }
}
</script>

<style lang="scss" src="./assets/css/main.scss"></style>