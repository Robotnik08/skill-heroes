import { setup } from "./setup.mjs";
import { Colors } from "./colors.mjs";
import { RandomHelper } from "./random.mjs";
import { formatTime } from "./time.mjs";
import { Score } from "./score.mjs";

export class Game {
    constructor () {
        // size init
        this.game_sizes = [6,8];
        this.size = this.game_sizes[0];

        // amount of colors
        this.difficulty = 6;

        // set up initial board
        this.color_squares = null;
        this.setupBoard();

        // init win/lose boxes
        this.win_box = document.getElementById('winner-dialog');
        this.lose_box = document.getElementById('loser-dialog');

        // set the moves left
        this.starting_moves = 15
        this.moves_left = this.starting_moves;

        this.gameActive = false;

        // init timer
        this.timer_element = document.getElementById('timer');
        this.timestamp = -1; // -1 means not running
        this.updateTimerDisplay();

        // win log
        this.wins = [];


        // initialize events on UI
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startGame();
        });

        const size_select = document.getElementById('size-btn')
        size_select.onchange = () => {
            this.changeSize(this.game_sizes[size_select.value]);
        };

        const difficulty_select = document.getElementById('dif-btn')
        difficulty_select.onchange = () => {
            this.changeDifficulty(parseInt(difficulty_select.value));
        };

    }   

    startGame () {
        for (let c_box of this.color_squares) {
            c_box.setAttribute('color', RandomHelper.randomRange(0, this.difficulty));
        }

        this.moves_left = this.starting_moves;

        this.updateInfo();

        this.gameActive = true;

        this.timestamp = new Date().getTime();
    }

    setupBoard () {
        this.timestamp = -1;
        this.color_squares = setup(this.size);

        for (let c in this.color_squares) {
            if (isNaN(c)) break;

            this.color_squares[c].addEventListener('click', () => {
                if (this.gameActive)
                    this.clickMove(c);
            });
        }
    }

    changeSize (size) {
        this.size = size;

        this.resetState();
    }

    changeDifficulty (diff) {
        if (diff > Colors.game_colors.length) {
            console.warn('difficulty too high, too little colors');
            this.difficulty = Colors.game_colors.length;
            return;
        }
        this.difficulty = diff;

        this.resetState();
    }

    resetState () {
        // reset states
        document.getElementById('game-container').remove();

        this.setupBoard();

        this.moves_left = this.starting_moves;
        this.gameActive = false;
    }

    clickMove (id) {

        this.updateInfo();

        const clicked_box = this.color_squares[id];

        const old_color = this.color_squares[0].getAttribute('color');

        const new_color = clicked_box.getAttribute('color');

        if (old_color != new_color) {
            this.changeAround(0, old_color, new_color);
        }


        if (this.checkWin()) {
            // you win
            this.winGame();
            return;
        }
        
        if (!--this.moves_left) {
            // you lose
            this.loseGame();
            return;
        }

    }

    changeAround (loc, check_color, new_color) {
        if (this.color_squares[loc].getAttribute('color') != check_color) 
            return; // stop searching

        // change the current one
        this.color_squares[loc].setAttribute('color', new_color);

        // animation
        this.color_squares[loc].getAnimations().forEach((a) => {
            a.cancel();
            a.play();
        });

        // top
        if (loc >= this.size) {
            this.changeAround(loc - this.size, check_color, new_color);
        }
        // bottom
        if (loc < this.size**2 - this.size) {
            this.changeAround(loc + this.size, check_color, new_color);
        }
        // left
        if (loc % this.size) {
            this.changeAround(loc - 1, check_color, new_color);
        }
        //right
        if ((loc + 1) % this.size) {
            this.changeAround(loc + 1, check_color, new_color);
        }
    }

    updateInfo () {
        const info_element = document.getElementById('info');
        info_element.innerHTML = 'Moves left: ' + (this.moves_left - 1);
    }

    winGame () {
        this.gameActive = false;
        this.win_box.showModal();

        const time = new Date().getTime() - this.timestamp;

        document.getElementById('score-span').innerHTML = "Time: " + formatTime(time) + ", Score: " + (this.starting_moves - this.moves_left);

        // display best wins
        this.wins.push(new Score(document.getElementById('user-name').value, time, this.starting_moves - this.moves_left));
        const best_scores = this.sortWins();

        const time_box = document.getElementById('score-time-box');
        const move_box = document.getElementById('score-moves-box');

        time_box.innerHTML = "";
        move_box.innerHTML = "";

        for (let i = 0; i < Math.min(this.wins.length, 5); i++) {
            time_box.innerHTML += `${i + 1}. ${best_scores.time[i].name}: ${formatTime(best_scores.time[i].time)}<br>`
            move_box.innerHTML += `${i + 1}. ${best_scores.score[i].name}: ${best_scores.score[i].moves}<br>`
        }

        // reset time
        this.timestamp = -1;
    }

    sortWins () {
        const result = {
            'score': this.wins.slice(),
            'time': this.wins.slice()
        }

        // sort based on score
        result.score.sort((a, b) => {
            if (a.score < b.score) {
                return -1;
            } else if (a.score < b.score) {
                return 1;
            }

            return 0;
        });

        // sort based on time
        result.time.sort((a, b) => {
            if (a.time < b.time) {
                return -1;
            } else if (a.time < b.time) {
                return 1;
            }

            return 0;
        });

        return result;
    }

    loseGame () {
        this.gameActive = false;
        this.lose_box.showModal();

        // reset timer
        this.timestamp = -1;
    }

    checkWin () {
        const check_color = this.color_squares[0].getAttribute('color');

        for (let c_box of this.color_squares) {
            if (c_box.getAttribute('color') != check_color) {
                return false;
            }
        }
        return true;
    }

    updateTimerDisplay () {
        this.timer_element.innerHTML = "Time: " + (this.timestamp == -1 ? '---' : formatTime(new Date().getTime() - this.timestamp));
        requestAnimationFrame(() => this.updateTimerDisplay());
    }
}