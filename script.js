let score = JSON.parse(localStorage.getItem('score'));
let isAutoPlay = false;
let intervalId = '';
if(score === null){
    score = {
        wins: 0,
        losses: 0,
        draws: 0
    };
}

function autoPlay(){
    if(!isAutoPlay){
        alert('The auto pilot is started.');
        intervalId = setInterval(function(){
        let botMove = Math.random();
        botMove = computerSelector(botMove);
        playGame(botMove);
        }, 1200);
        isAutoPlay = true;
    } else {
        clearInterval(intervalId);
        isAutoPlay = false;
        alert('The auto pilot has stopped.');
    }
}

function resetScore(){
    matchResult = document.querySelector('.matchResult');
    localStorage.removeItem('score');
    alert('The score has been reset.');
    score = {
        wins: 0,
        losses: 0,
        draws: 0
    };
    matchResult.innerHTML = `
    <p> Score is resetted. <br> <br>
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.draws}
    `
}


function checkResult(result){
    if(result === 'You win'){
        score.wins++;
    } else if (result === 'You lose'){
        score.losses++;
    } else {
        score.draws++;
    }
}

function playGame(playerMove){
    let result = '';
    let computerMove = Math.random();
    computerMove = computerSelector(computerMove);
    
    if(playerMove === 'scissors'){
        if(playerMove === computerMove){
            result = "It's a draws";
        } else if (computerMove === 'rock'){
            result = 'You lose';
        } else {
            result = 'You win';
        }
    }

    else if(playerMove === 'paper'){
        if(playerMove === computerMove){
            result = "It's a draws";
        } else if (computerMove === 'scissors'){
            result = 'You lose';
        } else {
            result = 'You win';
        }
    }

    else{
        if(playerMove === computerMove){
            result = "It's a draws";
        } else if (computerMove === 'paper'){
            result = 'You lose';
        } else {
            result = 'You win';
        }   
    }

    checkResult(result);
    displayResult(result, computerMove, playerMove);
    localStorage.setItem('score', JSON.stringify(score));
}   

function computerSelector(computerMove){
    if(computerMove >= 0 && computerMove < 1/3){
    computerMove = 'rock';
    } else if (computerMove >= 1/3 && computerMove < 2/3){
        computerMove = 'paper';
    } else {
    computerMove = 'scissors';
    }
    return computerMove;
}

function displayResult(result, computerMove, playerMove){
    matchResult = document.querySelector('.matchResult');
     matchResult.innerHTML = 
     `<p class="final-result"> ${result}. </p>
    <p class="minor-result"> You <img class="player-move-icon"src="images/${playerMove}.png"></img> - <img class="computer-move-icon"src="images/${computerMove}.png"> </img> Computer <br> 
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.draws} </p>`
}