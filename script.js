function createPlayer(name, id){
    let positions=[];
    let playerID=id;
    const getPositions = () => positions;
    const addPositions = (pos) => {
        positions.push(pos);
    }

    const getPlayerID = () => id;
    const getPlayerName = () => name;

    const checkWin = () => {
        const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        const posSet = new Set(positions);
        if(winningCombos.some(combo => combo.every(i => posSet.has(i)))){
            console.log(`${name} won!`);
            return true;
        }
        return false;
    };

    return { getPositions, addPositions, getPlayerID, getPlayerName, checkWin};
}

function createBoard(){
    let board=["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;

    const renderBoard = () => {
        const cells=document.querySelectorAll(".digit-button");
        cells.forEach((cell, index) =>{
            cell.textContent=board[index];
            if(board[index]=="X"){
                cell.classList.add("X");
            }
            else{
                cell.classList.add("O");
            }

    });
};
    const markSquare = (pos, symbol) => { board[pos] = symbol; };
    

    return { getBoard, renderBoard, markSquare};

}

function gameController(playerOneName="PlayerOne", playerTwoName="PlayerTwo"){
    const players = [
        createPlayer(playerOneName, 0),
        createPlayer(playerTwoName, 1),

    ];
    let board=createBoard();

    let activePlayer=players[0];
    
    const switchPlayer = (id) => {
        if(activePlayer===players[0]){
            activePlayer=players[1];
        }
        else{
            activePlayer=players[0];
        }
    }
    const getActivePlayer=() => activePlayer;


    const drop = (pos, activePlayer) =>{
        let available=[0,1,2,3,4,5,6,7,8];
        const combined=players[0].getPositions().concat(players[1].getPositions());
        let remaining=available.filter(x => !combined.includes(x));

        if(remaining.includes(pos)){
            if(activePlayer.getPlayerID()==0){
                board.markSquare(pos, "X");

            }
            else{
               board.markSquare(pos, "O");
                
            }
            activePlayer.addPositions(pos);
            return true;
        }
        else{
            return false;
        }

    }

    const playRound = (pos) => {
        if(drop(pos, activePlayer)===true){
            board.renderBoard();
            
            activePlayer.checkWin();
            
            switchPlayer(activePlayer.getPlayerID());
        }
    }
    return { switchPlayer, getActivePlayer, playRound};
}

const game=gameController("Player1", "Player2");
game.playRound(7);

//////////////////////////////////////////////////// listeners

