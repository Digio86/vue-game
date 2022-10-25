// Random function
function getRandomVal(max, min){
    return Math.floor((Math.random() * (max-min)) + min);
}

const app = Vue.createApp({
    data() {
      return { 
        playerHealth : 100,
        monsterHealth: 100,
        currentRound: 0,
        winner:null,
        logMessages:[]
      };
    },
  
    methods:{
        attackMonster(){
            // incremento round
            this.currentRound ++;
            // Attacco al mostro valore randomico tra 5 e 12 punti
            const attackValue = getRandomVal(12,5);
            // this.monsterHealth = this.monsterHealth - attackValue;
            this.monsterHealth -= attackValue;
            // Risposta mostro
            this.attackPlayer();
            // Registra dati log
            this.dataLogMessage('player','attacco',attackValue);
        },

        //Attacco al mostro valore randomico tra 8 e 15 punti
        attackPlayer(){
            const attackValue = getRandomVal(15,8);
            this.playerHealth -= attackValue;
            // Registra dati log
            this.dataLogMessage('mostro','attacco',attackValue);
        },
        
        specialAttackMonster(){
            // incremento round
            this.currentRound ++;
            // Attacco speciale mostro
            const attackValue = getRandomVal(10,25); 
            this.monsterHealth -= attackValue;
            // Risposta mostro
            this.attackPlayer();
            // Registra dati log
            this.dataLogMessage('player','super-attacco',attackValue);
        }, 
        healPlayer(){
            // incremento round
            this.currentRound ++;
            const healValue = getRandomVal(8,20); 
            if(this.playerHealth + healValue > 100){
                this.playerBar = 100;
            } else {
                this.playerHealth += healValue;
            }
            // Risposta mostro
            this.attackPlayer();    
            this.dataLogMessage('player','heal',healValue);     
        },
        restartGame(){
            this.playerHealth = 100,
            this.monsterHealth =  100,
            this.currentRound =  0,
            this.winner = null,
            this.logMessages = []
        },
        surrender(){
            this.winner = 'monster';
        },
        dataLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy : who,
                actiontype : what,
                actionValue :value
            });
        }
    },

    computed:{
        monsterBar(){
            if(this.monsterHealth < 0){
                return {width:'0%'};
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBar(){
            if(this.playerHealth < 0){
                return {width:'0%'};
            }
            return {width: this.playerHealth + '%'}
        },
        // Abilitazione tasto super attacco ogni 3 round
        statusRound(){
            return this.currentRound % 3 != 0;
        }

    },

    watch:{
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                // Pareggio
                this.winner = 'draw';
            } else if(value <= 0){
                // Sconfitta giocatore
                this.winner = 'monster'
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                // Pareggio
                this.winner = 'draw';
            } else if(value <= 0) {
                // Sconfitta giocatore
                this.winner = 'player'
            }
        }
    }
  
});
  
 app.mount('#game');
  