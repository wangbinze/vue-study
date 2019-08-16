new Vue({
    name: "game",
    el: "#app",
    data: state,
    template: `
        <div id="#app">
           <top-bar :turn="turn" :currentPlayerIndex="currentPlayerIndex" :players="players" />
           <card :def="testCard" @click.native="handlePlay"/>
        </div>
    `,
    mounted() {
        console.log(this.$data === state)
    },
    computed: {
        testCard() {
            return cards.archers
        }
    },
    methods: {
        handlePlay() {
            console.log('你打了一张牌')
        },
    },
})

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})