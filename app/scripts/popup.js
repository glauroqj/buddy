options = {
  namespace: 'vuejs__'
};
 
Vue.use(VueLocalStorage, options);

new Vue({
  name: 'Buddy',
  el: '#buddy',
  data: {
    user: '',
    title: 'Olá, fala pra gente? Como está seu dia?',
    firstLogin: true,
    vote: false,
    company: 'Sympla',
    registration: '',
    name: '',
    sector: ''
  },
  mounted() {
    /* verify first login on buddy */
    this.user = Vue.ls.get('Buddy');
    console.log(this.user)
    if ( this.user === '' || this.user === null ) {
      this.firstLogin = true;
    } else {
      this.firstLogin = false;
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
      Vue.ls.set('Buddy', info, 60 * 60 * 100000);
      this.firstLogin = false;
    },
    send: function(value) {
      console.log(value)
      this.vote = true;
    }
  }
});