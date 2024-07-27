document.addEventListener('DOMContentLoaded', () => {
    let rockButton = document.querySelector('.js-rock-button');
    let paperButton = document.querySelector('.js-paper-button');
    let scissorsButton = document.querySelector('.js-seasor-button');
    let resetButton = document.querySelector('.js-reset-button');
    let autoPlayButton = document.querySelector('.js-auto-play');
    let intervalid=null;

    let score = JSON.parse(localStorage.getItem('score'));
    if (score === null) {
        score = {
            win: 0,
            lose: 0,
            tie: 0
        };
    }

    function generateComputerMove() {
        let randomNumber = Math.random();
        if (randomNumber <= 1 / 3) {
            return 'rock';
        } else if (randomNumber <= 2 / 3) {
            return 'paper';
        } else {
            return 'scissors';
        }
    }

    function autoplay() {
        if (autoPlayButton.innerText !== 'stop') {
            autoPlayButton.innerText = 'stop';
            intervalid=setInterval(() => {
                playerMove = generateComputerMove()
                playGame(playerMove);
            }, 1000);
        }else{
            autoPlayButton.innerText='Auto Play';
            clearInterval(intervalid);
        }
    }

    function display(computerMove = '', playerMove = '', result = '') {
        document.querySelector('.result').innerText = `Computer Move is ${computerMove} and Player Move is ${playerMove}. You ${result}.
Result: win: ${score.win}, lose: ${score.lose}, tie: ${score.tie}`;
    }

    function reset() {
        score.win = 0,
            score.lose = 0,
            score.tie = 0
        localStorage.removeItem('score')
        display();
    }

    function playGame(playerMove) {
        let result = '';
        const computerMove = generateComputerMove();
        if (playerMove === 'rock') {
            if (computerMove === 'rock') {
                result = 'tie';
            } else if (computerMove === 'paper') {
                result = 'lose';
            } else {
                result = 'win';
            }
        } else if (playerMove === 'paper') {
            if (computerMove === 'rock') {
                result = 'win';
            } else if (computerMove === 'paper') {
                result = 'tie';
            } else {
                result = 'lose';
            }
        } else if (playerMove === 'scissors') {
            if (computerMove === 'rock') {
                result = 'lose';
            } else if (computerMove === 'paper') {
                result = 'win';
            } else {
                result = 'tie';
            }
        }

        if (result === 'win') {
            score.win++;
        } else if (result === 'lose') {
            score.lose++;
        } else {
            score.tie++;
        }

        localStorage.setItem('score', JSON.stringify(score));
        display(computerMove, playerMove, result);
    }

    rockButton.addEventListener('click', () => {
        playGame('rock');
    });

    paperButton.addEventListener('click', () => {
        playGame('paper');
    });

    scissorsButton.addEventListener('click', () => {
        playGame('scissors');
    });

    resetButton.addEventListener('click', reset);

    autoPlayButton.addEventListener('click', () => {
        autoplay();
    });

    // Display initial score
    //display();
})