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
        data: {
        },
        mounted() {
            var vm = this;
            setTimeout(function() {
                console.log(vm.scorecard)
            }, 850)
        },
        methods: {
            setScore: function() {
                console.log('score increment')
                score.increment();
            }
        }
    });
})();