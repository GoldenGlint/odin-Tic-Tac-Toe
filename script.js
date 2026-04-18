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
    let board=["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    const getBoard = () => board;
    const printBoard = () => {
  console.log(`
${board[0]} | ${board[1]} | ${board[2]}
---------
${board[3]} | ${board[4]} | ${board[5]}
---------
${board[6]} | ${board[7]} | ${board[8]}
  `);
};
    const markSquare = (pos, symbol) => { board[pos] = symbol; };
    

    return { getBoard, printBoard, markSquare};

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
            board.printBoard();
            
            activePlayer.checkWin();
            
            switchPlayer(activePlayer.getPlayerID());
        }
    }
    return { switchPlayer, getActivePlayer, playRound};
}

const game1 = gameController("Alice", "Bob");
// Player One wins top row [0,1,2]
game1.playRound(0); // Alice: X
game1.playRound(3); // Bob: O
game1.playRound(1); // Alice: X
game1.playRound(4); // Bob: O
game1.playRound(2); // Alice wins!

const game2 = gameController("Alice", "Bob");
// Player Two wins middle row [3,4,5]
game2.playRound(0); // Alice: X
game2.playRound(3); // Bob: O
game2.playRound(1); // Alice: X
game2.playRound(4); // Bob: O
game2.playRound(8); // Alice: X
game2.playRound(5); // Bob wins!

const game3 = gameController("Alice", "Bob");
// Player One wins left column [0,3,6]
game3.playRound(0); // Alice: X
game3.playRound(1); // Bob: O
game3.playRound(3); // Alice: X
game3.playRound(2); // Bob: O
game3.playRound(6); // Alice wins!

const game4 = gameController("Alice", "Bob");
// Player One wins diagonal [0,4,8]
game4.playRound(0); // Alice: X
game4.playRound(1); // Bob: O
game4.playRound(4); // Alice: X
game4.playRound(2); // Bob: O
game4.playRound(8); // Alice wins!

const game5 = gameController("Alice", "Bob");
// Player One wins anti-diagonal [2,4,6]
game5.playRound(2); // Alice: X
game5.playRound(0); // Bob: O
game5.playRound(4); // Alice: X
game5.playRound(1); // Bob: O
game5.playRound(6); // Alice wins!

const game6 = gameController("Alice", "Bob");
// Invalid move test — playing on occupied square
game6.playRound(0); // Alice: X
game6.playRound(0); // Bob: invalid, should be ignored
game6.playRound(1); // Alice: X (still Alice's turn)