options = {
  namespace: 'vuejs__'
};

Vue.use(VueLocalStorage, options);

(function () {

  new Vue({
    name: 'Buddy',
    el: '#buddy',
    data: {
      user: {},
      title: '',
      firstLogin: true,
      vote: false,
      voted: {},
      company: 'Sympla',
      registration: '',
      name: '',
      sector: ''
    },
    mounted() {
      var vm = this;
      /* verify first login on buddy */
      // this.user = Vue.ls.get('Buddy-Login');
      this.user = Cookies.get('Buddy-Login');
      console.log(this.user)
      if ( this.user === '' || this.user === null || this.user === undefined ) {
        this.firstLogin = true;
      } else {
        this.firstLogin = false;
        this.user = JSON.parse(Cookies.get('Buddy-Login'));        
        this.title = this.user.name;
      }

      /* verify last vote on buddy */
      // this.voted = Vue.ls.get('Buddy-Vote');
      this.voted = Cookies.get('Buddy-Vote');
      console.log(this.voted)
      if ( this.voted === '' || this.voted === null || this.voted === undefined ) {
        this.vote = false;
      } else {
        this.vote = true;
      }
    },
    methods: {
      reset: function() {
        this.vote = false;
        this.firstLogin = true;
      },
      login: function() {
        let info = {
          company: this.company,
          registration: this.registration,
          name: this.name,
          sector: this.sector
        }
        // Vue.ls.set('Buddy-Login', info, 60 * 60 * 100000);
        Cookies.set('Buddy-Login', info, {expire: 365});
        this.firstLogin = false;
        this.user = JSON.parse(Cookies.get('Buddy-Login'));        
        this.title = this.user.name;
      },
      send: function(value) {
        console.log(value)
        this.vote = true;
      // Vue.ls.set('Buddy-Vote', value, 3600000);
      // Vue.ls.set('Buddy-Vote', value, 86400000); /* 24 hours */
      // Vue.ls.set('Buddy-Vote', value, 5000);
      Cookies.set('Buddy-Vote', value, {expire: 1});
      let bgJS = chrome.extension.getBackgroundPage();
      bgJS.verifyVote();
    }
  }
});
  /*end js*/
})();