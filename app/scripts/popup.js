(function () {

  const config = {
    apiKey: "AIzaSyCmL6EppiFzE8BrY_xMRV0k4VG_NtJ6IWU",
    authDomain: "buddy-339dc.firebaseapp.com",
    databaseURL: "https://buddy-339dc.firebaseio.com",
    projectId: "buddy-339dc",
    storageBucket: "buddy-339dc.appspot.com",
    messagingSenderId: "799103313911"
  };
  firebase.initializeApp(config);

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
      sector: '',
      lastVote: '',
      loading: false,
    },
    watch: {

    },
    mounted() {
      var vm = this;
      this.lastVote = JSON.parse( localStorage.getItem('Buddy-Last-Vote') );
      console.log(this.lastVote)
      /* verify first login on buddy */
      // this.user = Vue.ls.get('Buddy-Login');
      // this.user = Cookies.get('Buddy-Login');
      this.user = localStorage.getItem('Buddy-Login');

      // console.log( this.user )
      if ( this.user === '' || this.user === null || this.user === undefined ) {
        this.firstLogin = true;
      } else {
        this.firstLogin = false;
        this.user = JSON.parse( localStorage.getItem('Buddy-Login') );
        // this.user = Vue.ls.get('Buddy-Login');     
        this.title = this.user.name;
      }

      /* verify last vote on buddy */
      // this.voted = Vue.ls.get('Buddy-Vote');
      // this.voted = Cookies.get('Buddy-Vote')
      this.voted = localStorage.getItem('Buddy-Vote');
      // console.log(this.voted)
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
        localStorage.setItem('Buddy-Login', JSON.stringify(info) );
        // Cookies.set('Buddy-Login', info, {expire: 365});
        this.firstLogin = false;
        // this.user = Vue.ls.get('Buddy-Login');   
        this.user = JSON.parse( localStorage.getItem('Buddy-Login') );
        // console.log(this.user)   
        this.title = this.user.name;
      },
      send: function(value) {
        var vm = this;
        
        this.vote = true;
        let date = moment().format('DD-MM-YYYY');
        let dateFormat = moment().format('DD/MM/YYYY');
        let month = moment().format('MMM');
        let urlSend = config.databaseURL+'/'+vm.user.sector+'/'+date+'/vote.json';
        let data = {
          'vote': value
        };
        let lastVote = {
          'day': dateFormat
        };
        console.log(lastVote)
        this.loading = true;
        $.ajax({
          url: urlSend,
          method: 'POST',
          dataType: 'json',
          data: JSON.stringify(data)
        })
        .done(function(data) {
          console.log('success', data) 
          setTimeout(function() {
            vm.loading = false;
          }, 800)
        })
        .fail(function(xhr) {
          console.log('error', xhr);
          setTimeout(function() {
            vm.loading = false;
          }, 800)
        });
        localStorage.setItem('Buddy-Vote', JSON.stringify(data) );
        localStorage.setItem( 'Buddy-Last-Vote', JSON.stringify(lastVote) );
        /* create cookie and localstorage */
        

        // Cookies.set('Buddy-Vote', value, {expire: 1});
        // Vue.ls.set('Buddy-Vote', value, 15000);
       // Vue.ls.set('Buddy-Vote', value, 86400000); /* 24 hours */

      // Vue.ls.set('Buddy-Vote', value, 3600000);
      // let bgJS = chrome.extension.getBackgroundPage();
      // bgJS.verifyVote();
    }
  }
});
  /*end js*/
})();