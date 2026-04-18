function createPlayer(name, id){
    let positions=[];
    let playerID=id;
    const getPositions = () => positions;
    const addPositions = (pos) => {
        positions.push(pos);
    }

    const getPlayerID = () => id;
}

function createBoard(){
    let board=["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    winningCombo=[[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8]];
    let curPlayer=0;

    const drop = (pos, activePlayer) =>{
        let available=[0,1,2,3,4,5,6,7,8];
        const combined=players[0].getPositions().concat(players[1].getPositions());
        let remaining=available.filter(x => !combined.includes(x));

        if(remaining.includes(pos)){
            if(activePlayer.getPlayerID()==0){
                board[pos]="X";

            }
            else{
                board[pos]="O";
                
            }
            activePlayer.addPosition(pos);
            return true;
        }
        else{
            return false;
        }

    }

}

function gameController(playerOneName="PlayerOne", playerTwoName="PlayerTwo"){
    const players = [
        createPlayer(playerOneName, 0),
        createPlayer(playerTwoName, 1),

    ];

    const activePlayer=player[0];
    
    const switchPlayer = (token) => {
        if(activePlayer=player[0]){
            activePlayer=player[1];
        }
        else{
            activePlayer=Player[0];
        }
    }

    const getActivePlayer=() => activePlayer;
}