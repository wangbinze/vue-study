Vue.component('top-bar', {
    template: `<div class="top-bar" :class="'player-' + currentPlayerIndex">
        <div class="player p0">{{ players[0].name }}</div>
        <div class="turn-counter">
            <img class="arrow" src="svg/turn.svg" />
            <div class="turn">回合 {{ turn }}</div>
        </div>
        <div class="player p1">{{ players[1].name }}</div>
    </div>`,
    props: ['players', 'currentPlayerIndex', 'turn'],
    created() {
        console.log(this.players)
    },
})

Vue.component('card', {
    props: ['def'],
    template: `<div class="card" :class="'type-' + def.type" @click="play">
      <div class="title">{{ def.title }}</div>
      <img class="separator" src="svg/card-separator.svg" />
      <div class="description"><div v-html="def.description"></div></div>
      <div class="note" v-if="def.note"><div v-html="def.note"></div></div>
    </div>`,
    methods: {
        play() {
            this.$emit('play')
        },
    },
})

Vue.component('hand', {
    template: `<div class="hand">
        <div class="wrapper">
            <!-- 卡牌 -->
            <car v-for="card of cards" :def="card.def" />
        </div>
    </div>`,
    props: ['cards'],
})