new Vue({
    name: "game",
    el: "#app",

    template: `
        <div id="#app">

            <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>  

            <card :def="testCard" @click.native="handlePlay"/>

            <hand :cards="testHand" />

        </div>
    `,

    data: state,

    mounted() {
        console.log(this.$data === state)
    },
    computed: {
        //临时的，cards.js cards  --> :def -->  获取card相关属性
        testCard() {
            return cards.archers
        }
    },

    methods: {
        //@click.native="handlePlay"
        handlePlay() {
            console.log('You played a card')
        },
        // play() {
        //     this.$emit('play')
        // }

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
            //使用id随机选取一张卡牌
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random() * ids.length)]
                //返回一张卡牌
            return {
                uid: cardUid++,
                //定义的id
                id: randomId,
                //定义对象
                def: cards[randomId],
            }
        }

    },

    //放置位置不名？？？？？？？？ 
    created() {
        this.testHand = this.createTestHand()
    },
})

// 窗口大小变化的处理
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})