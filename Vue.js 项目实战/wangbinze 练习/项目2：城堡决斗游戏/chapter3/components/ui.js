//顶部组件
Vue.component('top-bar', {
    template: `
        <div class="top-bar"  :class="'player-' + currentPlayerIndex">
            <div class="player p0">{{ players[0].name }}</div>
            <div class="turn-counter">
                <img class="arrow" src="svg/turn.svg">
                <div class="turn"> 回合 {{ turn }}</div>
            </div>
            <div class="player p1">{{ players[1].name }}</div>
        </div>
    `,
    props: [
        'players', 'currentPlayerIndex', 'turn'
    ],
    created() {
        console.log(this.players)
    },

})

//卡片组件
Vue.component('card', {
    template: `
        <div class="card" :class="'type-' +def.type" >
            <div class="title">{{ def.title }}</div>
            <img class="separator" src="svg/card-separator.svg"/>
            <div class="description">
                <div v-html="def.description"></div>
            </div>
        </div>
    `,
    props: [
        'def'
    ],
    methods: {
        play() {
            this.$emit('play')
        }
    },
})

//手牌
Vue.component('hand', {
    template: `
        <div class="hand">
            <div class="wrapper">
                <!-- 卡牌 -->
                <card v-for="card of cards" :def="card.def" />
            </div>
        </div>
    `,
    props: [
        'cards'
    ],
})