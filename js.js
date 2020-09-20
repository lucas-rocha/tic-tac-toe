const tic_tac_toe = {
    board: Array(9).fill(''),
    container: null,
    gameOver: false,
    options: {
        marks: ['X', 'O'],
        pos: 0,
        change() {
            this.pos = (this.pos == 0 ? 1:0);
        }
    },
    winningSequencies: [
        [0,1,2], 
        [3,4,5], 
        [6,7,8],
        [0,3,6],
        [1,4,7], 
        [2,5,8], 
        [0,4,8],
        [2,4,6],
    ],

    init(container) {
        this.container = container;
        this.start();
        
    },

    start() {
        this.draw();
        this.gameOver = false;
    },

    draw() {
        this.container.innerHTML = `
            <div class='container_game'>
                ${this.board.map((elem, ind) => `<div class='square' onclick="tic_tac_toe.fillBoard(${ind})">${elem}</div>`).join('')}
            </div>
        `;
    },

    fillBoard(indice) {
        if(this.gameOver || this.board[indice] !== '') return false;
        this.board[indice] = this.options.marks[this.options.pos];
        this.draw();
        let checkWinner = this.checkSequencies(this.board[indice]);
        if(checkWinner >= 0) {
            this.winningStyle(this.winningSequencies[checkWinner]);
            this.game_is_over();
        } else {
            this.options.change();
        }
    },

    winningStyle(sequencie) {
        sequencie.forEach(elem => {
            this.container.querySelector(`.square:nth-child(${elem + 1})`).classList.add('winner')
        });
    },

    game_is_over() {
        this.gameOver = true;
        this.board.fill('')
    },

    checkSequencies(mark) {
        // 0 a 7
        for(i in this.winningSequencies) {
            if(this.board[this.winningSequencies[i][0]] == mark && 
               this.board[this.winningSequencies[i][1]] == mark &&
               this.board[this.winningSequencies[i][2]] == mark
            ) {
                return i;
                console.log(i)
            } 
        };
        return -1;
    },
    
}

