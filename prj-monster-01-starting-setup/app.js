function getRandomValue(min, max) {
   return Math.floor(Math.random() * (max - min) + min);

}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            gameResult: null,
            logMassage: [],

        }
    },

    methods: {
        startGame() {
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.currentRound = 0,
            this.gameResult = null,
            this.logMassage = []
            
        },

        attackMonster() {
            this.currentRound++
            let attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMassages('player', 'attack', attackValue);
            this.attackPlayer();

        },

        attackPlayer() {
            let attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMassages('monster', 'attack', attackValue);

        },

        specialAttackMonster() {
            this.currentRound++
            let attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMassages('player', 'special-attack', attackValue);
            this.attackPlayer();
        },

        healPlayer() {
            this.currentRound++
            let healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100
                
            } else {
                this.playerHealth += healValue;

            }
            this.addLogMassages('player', 'heal', healValue);
            this.attackPlayer();

        },

        surrender() {
            this.gameResult = 'monster';

        },

        addLogMassages(who, what, value) {
            this.logMassage.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,

            });
        }
    },

    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.gameResult = 'draw'
            } else if (value <= 0) {
                this.gameResult = 'monster'
            }
        },

        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.gameResult = 'draw'
            } else if (value <= 0) {
                this.gameResult = 'player'
            }
        }

    },

    computed: {
        monsterStyleBar() {
            if (this.monsterHealth < 0) {
                return { width: "0%"}
            };
            return { width: this.monsterHealth + "%" }
            
        },

        playerStyleBar() {
            if (this.playerHealth < 0) {
                return { width: "0%"}
            };
            return { width: this.playerHealth + "%" }
            
        },

        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }

    },

})

app.mount("#game")

