// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// The consolidated state of our app
var state = {
    //用户界面
    activeOverlay: null,


    // World
    worldRatio: getWorldRatio(),
    // TODO Other things


    //游戏
    turn: 1,
    players: [
        { name: '王彬泽' },
        { name: '雷思成' }
    ],
    //将随机使用0或1来决定谁先行动
    currentPlayerIndex: Math.round(Math.random()),
    testHand: [],
}