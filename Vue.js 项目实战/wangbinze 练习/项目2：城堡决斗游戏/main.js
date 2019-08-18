new Vue({
    name: "game",
    el: "#app",
    data: state,
    template: `
        <div id="#app">
            <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
            <card v-for="card of cards" :def="testCard" @play="handlePlay(card)"/>
            <transition name="fade">
                <hand :cards="testHand" v-if="!activeOverlay"/>
            </transition>
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
            console.log('你点击了')
        },
        created() {
            this.testHand = this.createTestHand()
        },
        createTestHand() {
            const cards = []
                //遍历获取卡牌的id
            const ids = Object.keys(cards)

            //抽取5张卡牌
            for (let i = 0; i < 5; i++) {
                cards.push(testDrawCard())
            }
            return cards
        },
        testDrawCard() {
            //使用id随机抽取一张卡牌
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random() * ids.length)]
                //返回一张新的卡牌
            return {
                //卡牌的唯一标识符
                uid: cardUid++,
                //定义的id
                id: randomId,
                //定义对象
                def: cards[randomId]
            }
        },
        handlePlay(card) {
            this.$emit('card-play', card)
        },
        testPlayCard(card) {
            //讲卡牌从玩家手牌中移除
            const index = this.testHand.indexOf(card);
            this.testHand.splice(index, 1)
        }
    },

})

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})