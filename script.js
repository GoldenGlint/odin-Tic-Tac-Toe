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

    const resetPlayer = () => {
        positions=[];
    }

    return { getPositions, addPositions, getPlayerID, getPlayerName, checkWin, resetPlayer};
}

function createBoard(){
    let board=["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;

    const resetBoard= ()=> {
        board=["", "", "", "", "", "", "", "", ""];
    }

    const renderBoard = () => {
        const cells=document.querySelectorAll(".digit-button");
        cells.forEach((cell, index) =>{
            cell.classList.remove("X", "O"); 
            cell.textContent=board[index];
            if(board[index]=="X"){
                cell.classList.add("X");
            }
            else if(board[index]=="O"){
                cell.classList.add("O");
            }

    });
};
    const markSquare = (pos, symbol) => { board[pos] = symbol; };
    

    return { getBoard, renderBoard, markSquare, resetBoard};

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

    const resetGame= () => {
        players[0].resetPlayer();
        players[1].resetPlayer();
        board.resetBoard();
        activePlayer=players[0];
        board.renderBoard();

    }

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
            
            if(activePlayer.checkWin()){

                return "win";

                
            };
            
            switchPlayer(activePlayer.getPlayerID());
            return true;
        }
        else{
            return false;
        }
    }
    return { switchPlayer, getActivePlayer, playRound, resetGame};
}

function screenController(){
    let game;
    const startScreen=document.querySelector("#initial-screen");
    const startButton=document.querySelector("#start-game");

    startScreen.showModal();

    startButton.addEventListener("click", () => {
        const playerOneName = document.querySelector("#player-one-name").value || "PlayerOne";
        const playerTwoName = document.querySelector("#player-two-name").value || "PlayerTwo";
        startScreen.close();
        startGame(playerOneName, playerTwoName);
    })
    const startGame = (playerOneName, playerTwoName) => {
        game = gameController(playerOneName, playerTwoName);
        updateScreen();


    };

    
    const turn=document.querySelector(".turn");

    const dialog = document.querySelector("#winning-screen");
    const restartButton = document.querySelector("#restart");
    const winnersMessage=document.querySelector(".winners-message");

    restartButton.addEventListener("click", ()=>{
        game.resetGame();
        dialog.close();
        updateScreen();
    })

    const digitButtons = document.querySelectorAll(".digit-button");
        digitButtons.forEach((button, index)=>{
            button.addEventListener("click", (e)=>{
                console.log(index);
                const result = game.playRound(index);
                if(result=="win"){
                    winnersMessage.textContent=`${game.getActivePlayer().getPlayerName()} wins!`;
                    dialog.showModal();
                }

                updateScreen();
            })
        })

    const updateScreen=()=>{
        const activePlayer=game.getActivePlayer();
        turn.textContent=`${activePlayer.getPlayerName()}'s turn`;
        
        
    }

    
}

screenController();



//////////////////////////////////////////////////// listeners

