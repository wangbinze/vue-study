new Vue({
    name: "game",
    el: "#app",

    template: `
        <div id="#app">

            <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>  

            <card :def="testCard"/>


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
})

// 窗口大小变化的处理
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})