new Vue({
    el: '#app',
    data:   {
                // máu người chơi
                playerHealth: 100,
                // máu titan
                titanHealth: 100,
                // trạng thái của game ( start ? )
                gameIsRunning: false,
                // Mảng lưu số lượng máu bị trừ khi bị tấn công
                turns: []
            },
    methods:{
                // bắt đầu vào game
                startNewGame: function()
                {
                    this.gameIsRunning = true;
                    this.playerHealth = 100;
                    this.titanHealth  = 100;
                },
                attack: function()
                {
                // checkOption
                    if(this.checkOption())
                    {
                        return;
                    }
                // Titan ( tự động chơi )
                    damage = this.inputDamage(5, 10);
                    this.titanHealth -= damage;
                    this.turns.unshift({
                        isPlayer: true,
                        textLog: 'Player hit titan for ' + damage
                    });

                // Người chơi
                    this.titanAttack();
                },
                specialAttack: function()
                {
                // checkOption
                    if(this.checkOption())
                    {
                        return;
                    }
                // titan
                    damage = this.inputDamage(10, 20);
                    this.titanHealth -= damage;
                    this.turns.unshift({
                        isPlayer: true,
                        textLog: 'Player hit Titan for ' + damage
                    });
                // player
                    this.titanAttack();
                },
                heal: function()
                {
                //player
                    if(this.playerHealth > 70)
                    {
                        return false;
                    }
                    else if(this.playerHealth <= 60)
                    {
                        this.playerHealth +=10
                    }
                    else
                    {
                        this.playerHealth = 70
                    }
                //titan
                    // this.titanAttack();
                },
                run: function()
                {
                    alert('Run like a bitch !!!')
                    this.gameIsRunning = false;
                    this.turns = [];
                    this.playerHealth = 100;
                    this.titanHealth = 100;
                },
                titanAttack: function()
                {
                // player
                    damage = this.inputDamage(8, 12);
                    this.playerHealth -= damage;
                    this.turns.unshift({
                        isPlayer: false,
                        textLog: 'Titan hit player  for ' + damage
                    });
                    this.checkOption();
                },
                inputDamage: function(minDamage, maxDamage)
                {
                    return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
                },
                checkOption: function()
                {
                    if(this.titanHealth <= 0)
                    {
                        if(confirm('Bạn thắng !! Có muốn chơi lại ko ?'))
                        {
                            this.startNewGame();
                            // this.gameIsRunning = true;
                        }
                        else
                        {
                            this.gameIsRunning = false;
                            this.playerHealth = 100;
                            this.titanHealth = 100;
                        }
                        return true;
                    }
                    else if(this.playerHealth <= 0)
                    {
                        if(confirm('Titan PS thắng !! Có muốn đập chết mẹ nó lại ko ?'))
                        {
                            this.startNewGame();
                            // this.gameIsRunning = true;
                        }
                        else
                        {
                            this.gameIsRunning = false;
                            this.playerHealth = 100;
                            this.titanHealth = 100;
                        }
                        return true;
                    }
                    return;
                }
            }
});
