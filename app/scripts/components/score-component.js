(function(){
    Vue.component('score', {
        template: '#score',
        name: 'score',
        props: {
            scorecard: {
                type: Object,
                required: true
            },
            callscore: {
                type: Boolean,
                required: true
            }
        },
        data: function() {
            return {
                
            }
        },
        watch: {
            callscore: function() {
                console.log('watch: '+this.callscore)
                if(this.callscore) {
                    this.setScore();
                }
            }
        },
        mounted() {
            var vm = this;
        },
        methods: {
            setScore: function() {
                var vm = this;
                var scoreGame = new Score();
                setTimeout(function() {
                    console.log('score increment')
                    scoreGame.increment();
                    vm.scorecard = scoreGame.scorecard();
                }, 600);
            }
        }
    });
})();