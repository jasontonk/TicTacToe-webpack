var currentPlayer = 'X';
var gameComplete = false;
var gameState = 'Game is unfinished'
var lastWinner = ''
const values = ['','','','','','','','',''];


function getValues(){
    return values
}
function getLastWinner(){
    return lastWinner
}

//checks to see if any player has won
function checkBoard() {
    let counter = 0;

    //count empty spaces
    values.forEach(value => {
        if(value === ''){
            counter++;
        }
    })

    //check if any space left
    if (counter !== 0) {
        //check for horizontal win
        if ((values[0] === currentPlayer && values[1] === currentPlayer && values[2] === currentPlayer) ||
            (values[3] === currentPlayer && values[4] === currentPlayer && values[5] === currentPlayer) ||
            (values[6] === currentPlayer && values[7] === currentPlayer && values[8] === currentPlayer)) {

            endGame(true);

            //check for vertical win
        } else if ((values[0] === currentPlayer && values[3] === currentPlayer && values[6] === currentPlayer) ||
            (values[1] === currentPlayer && values[4] === currentPlayer && values[7] === currentPlayer) ||
            (values[2] === currentPlayer && values[5] === currentPlayer && values[8] === currentPlayer)) {

            endGame(true);

            //check for diagonal win
        } else if ((values[0] === currentPlayer && values[4] === currentPlayer && values[8] === currentPlayer) ||
            (values[2] === currentPlayer && values[4] === currentPlayer && values[6] === currentPlayer)) {

            endGame(true);
        }
    }
    else{
        endGame(false);
    }
}

function endGame(hasWinner){
    if (hasWinner){
        lastWinner = currentPlayer;
        gameState = currentPlayer.concat(' won the game!');
        gameComplete = true;
        document.getElementById('save').style.visibility = 'visible'
    }
    else{
        lastWinner = 'Tie'
        gameState = 'It\'s a tie!'
        gameComplete = true;
        document.getElementById('save').style.visibility = 'visible'
    }
}

//Enters correct values into html
function drawBoard() {
    for (let i=0; i < values.length; i++){
        let gridLocation = 'b'.concat((i+1).toString());
        document.getElementById(gridLocation).value = values[i];
    }
    if (gameComplete){
        document.getElementById('instruction').textContent = gameState;
    }
    else{
        document.getElementById('instruction').textContent = 'It\'s your turn Player '.concat(currentPlayer);
    }

}

//function is called when player clicks on box
function place(gridLocation){
    if(!gameComplete) {
        //get key for array from gridLocation
        let key = parseInt(gridLocation.slice(1)) - 1

        //check is spot is available
        if (values[key] === '') {
            values[key] = currentPlayer;

            checkBoard();

            //switch turn
            if (currentPlayer === 'X')
                currentPlayer = 'O'
            else currentPlayer = 'X'

            drawBoard();

        } else {
            alert('This spot is taken')
        }
    }
}

//reset the game
function reset_Board(){
    for (let i=0; i < values.length; i++){
        values[i] = ''
    }
    gameState = 'Game is unfinished'
    gameComplete = false;
    document.getElementById('save').style.visibility = 'hidden'
    drawBoard();
}