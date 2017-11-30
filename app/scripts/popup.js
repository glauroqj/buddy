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

  /* SCORE */
  const scoreGame = new Score({
    level: 0,
    score: 0,
    persistant:true,
    levels: [
    {
      "checkmark": 0,
      "status": "Principiante",
      "quote": "continue votando amiga(o)..."
    },
    {
      "checkmark": 10,
      "status": "Experiente",
      "quote": "cada vez melhor..."
    },
    {
      "checkmark": 50,
      "status": "Muito experiente",
      "quote": "que lindo, você é um sucesso..."
    },
    {
      "checkmark": 80,
      "status": "Knight of Buddy",
      "quote": "SEM PALAVRAS, VOCÊ ARRASAAAA..."
    }                       
    ],
    callback:function(){}
  });


  new Vue({
    name: 'Buddy',
    el: '#buddy',
    data: function() {
      return {
        user: {},
        title: '',
        firstLogin: true,
        weekend: false,
        vote: false,
        voted: {},
        errorForm: false,
        company: 'Sympla',
        name: '',
        sector: '',
        lastVote: '',
        loading: false,
        gif: [],
        keyDay: '',
        someoneVote: '',
        message: false,
        scoreUp: false,
        scoreValues: {}
      }
    },
    watch: {
    },
    mounted() {
      var vm = this;
      /* verify data per second */
      setInterval(() => {

        vm.user = JSON.parse( localStorage.getItem('Buddy-Login') );
        if ( vm.user === '' || vm.user === null || vm.user === undefined ) {
          vm.firstLogin = true;
        } else {
          vm.firstLogin = false;
          vm.user = JSON.parse( localStorage.getItem('Buddy-Login') );
          vm.title = vm.user.name;
        }

        vm.voted = localStorage.getItem('Buddy-Vote');
        if ( vm.voted === '' || vm.voted === null || vm.voted === undefined ) {
          vm.vote = false;
        } else {
          vm.vote = true;
        }
      }, 1000);

      /* verify weekend */
      let day = moment().format('dddd');
      if ( day == 'Saturday' || day == 'Sunday' || day == 'sábado' || day == 'domingo' ) { 
        let url = 'https://api.giphy.com/v1/gifs/random?api_key=xmSEm4iAty6mMRGFUm4k3bErZeqmYi1w&tag=happy&rating=G';
        $.ajax({
          url: url,
          method: 'GET',
          dataType: 'json',
        })
        .done(function(data) {
          vm.gif = data.data;
          chrome.browserAction.setIcon({path: '../images/buddy-20x20.png'});
        })
        .fail(function(xhr) {
          console.log('error', xhr);
        });
        vm.weekend = true;
      } else {
        vm.weekend = false;
      }

      /* verify info */
      this.lastVote = JSON.parse( localStorage.getItem('Buddy-Last-Vote') );
      if ( this.lastVote == null || this.lastVote == undefined ) {
        this.lastVote = 0;
      }
      let date = moment().format('DD/MM/YYYY');
      if ( date != this.lastVote.day ) {
        /* verify is valid day of week */
        localStorage.removeItem('Buddy-Vote');
      }

      /* verify first login on buddy */
      this.user = JSON.parse( localStorage.getItem('Buddy-Login') );

      if ( this.user === '' || this.user === null || this.user === undefined ) {
        this.firstLogin = true;
      } else {
        this.firstLogin = false;
        this.user = JSON.parse( localStorage.getItem('Buddy-Login') );
        this.title = this.user.name;
      }

      /* verify last vote on buddy */
      this.voted = localStorage.getItem('Buddy-Vote');
      if ( this.voted === '' || this.voted === null || this.voted === undefined ) {
        this.vote = false;
      } else {
        this.vote = true;
      }

      /* call custom message and show */
      if (this.firstLogin == false && this.vote == false ) {
        /* get custom message */
        this.getCustomMessage();
      }

      vm.scoreValues = scoreGame.scorecard();

    },
    methods: {
      reset: function() {
        this.vote = false;
        this.firstLogin = true;
        this.errorForm = false;
      },
      login: function() {
        let info = {
          company: this.company,
          name: this.name,
          sector: this.sector
        }
        if (this.sector != '') {
        // Vue.ls.set('Buddy-Login', info, 60 * 60 * 100000);
        localStorage.setItem('Buddy-Login', JSON.stringify(info) );
        // Cookies.set('Buddy-Login', info, {expire: 365});
        this.firstLogin = false;
        // this.user = Vue.ls.get('Buddy-Login');   
        this.user = JSON.parse( localStorage.getItem('Buddy-Login') );
        // console.log(this.user)   
        this.title = this.user.name;

        /* get custom message */
        this.getCustomMessage();
        return
      }
      this.errorForm = true;
    },
    send: function(voteDay) {
      var vm = this;
      this.vote = true;
      this.loading = true;

      /* verify if exist vote and resume */
      moment().locale('pt-br');
      let day = moment().format('DD');
      let dateFormat = moment().format('DD/MM/YYYY');
      let month = moment().format('MMMM');
      let year = moment().format('YYYY');
      let urlGET = config.databaseURL+'/'+vm.user.sector+'/'+year+'/'+month+'/'+day+'.json';

      $.ajax({
        url: urlGET,
        method: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        if( data != null) {
          vm.keyDay = Object.keys(data);
          vm.someoneVote = data[vm.keyDay];
          /* call function to update datas with keyday */
          vm.message = false;
          vm.updateDataWithKeyDay(vm.keyDay, voteDay);
          console.log('Key day: '+vm.keyDay);
          return
        }
        /* call function to create first keyday */
        vm.createFirstKeyDay(voteDay);
        console.log('Key day: '+vm.keyDay);
      })
      .fail(function(xhr) {
        console.log('Error Key day: ', xhr);
      });

    },
    createFirstKeyDay: function(voteDay) {
      var vm = this;
      /* no exist key day, create one */
      moment().locale('pt-br');
      let day = moment().format('DD');
      let dateFormat = moment().format('DD/MM/YYYY');
      let month = moment().format('MMMM');
      let year = moment().format('YYYY');

      let urlPOST = config.databaseURL+'/'+vm.user.sector+'/'+year+'/'+month+'/'+day+'.json';
      voteDay = (voteDay).toFixed(2);
      console.log('voteDay: '+ voteDay)
      let vote = {
        'vote': voteDay,
        'month': month,
        'date': dateFormat,
        'quantVotes': 1,
        'mediaVotes': voteDay
      };
      let lastVote = {
        'day': dateFormat
      };

      $.ajax({
        url: urlPOST,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(vote)
      })
      .done(function(data) {
        console.log('success', data) 
        localStorage.setItem('Buddy-Vote', JSON.stringify(vote) );
        localStorage.setItem( 'Buddy-Last-Vote', JSON.stringify(lastVote) );
        vm.lastVote = JSON.parse( localStorage.getItem('Buddy-Last-Vote') );
        /* create cookie and localstorage */
        setTimeout(function() {
          vm.loading = false;
          vm.callScore();
          chrome.browserAction.setIcon({path: '../images/buddy-20x20.png'});
        }, 800);
      })
      .fail(function(xhr) {
        console.log('error', xhr);
        setTimeout(function() {
          vm.loading = false;
        }, 800);
      });

    },
    updateDataWithKeyDay: function(keyday, voteDay) {
      var vm = this;

      moment().locale('pt-br');
      let day = moment().format('DD');
      let dateFormat = moment().format('DD/MM/YYYY');
      let month = moment().format('MMMM');
      let year = moment().format('YYYY');

      let urlPATCH = config.databaseURL+'/'+vm.user.sector+'/'+year+'/'+month+'/'+day+'/'+[keyday]+'.json';
      let soma = 0;
      let media = 0;
      let quantTotalVotes = 0;
      soma = parseInt(vm.someoneVote.vote ) + voteDay;
      quantTotalVotes = parseInt(vm.someoneVote.quantVotes) + 1;
      media = (soma / quantTotalVotes).toFixed(2);
      let vote = {
        'vote': soma,
        'quantVotes': quantTotalVotes,
        'mediaVotes': media
      };
      let lastVote = {
        'day': dateFormat
      };

      $.ajax({
        url: urlPATCH,
        method: 'PATCH',
        dataType: 'json',
        data: JSON.stringify(vote)
      })
      .done(function(data) {
        console.log('success', data) 
        localStorage.setItem('Buddy-Vote', JSON.stringify(vote) );
        localStorage.setItem( 'Buddy-Last-Vote', JSON.stringify(lastVote) );
        vm.lastVote = JSON.parse( localStorage.getItem('Buddy-Last-Vote') );
        /* create cookie and localstorage */
        setTimeout(function() {
          vm.loading = false;
          vm.callScore();
          chrome.browserAction.setIcon({path: '../images/buddy-20x20.png'});
        }, 800);
      })
      .fail(function(xhr) {
        console.log('error', xhr);
        setTimeout(function() {
          vm.loading = false;
        }, 800)
      });

    },
    getCustomMessage: function() {
      var vm = this;
      /* verify custom message */
      let url = config.databaseURL+'/customMessage.json';
      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        vm.message = data[Object.keys(data)];
        console.log(vm.message)
      })
      .fail(function(xhr) {
        console.log('error', xhr);
      });
    },
    callScore: function() {
      console.log('callScore')
      var vm = this;
      setTimeout(function() {
        /* give more exp */
        vm.scoreUp = true;
      }, 200);
    }

  }
});

/*end js*/
})();