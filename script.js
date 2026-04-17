function createPlayer(name, id){
    let positions=[];
    let playerID=id;
    const getPositions = () => positions;
    const addPositions = (pos) => {
        positions.push(pos);
    }
}

function createBoard(){
    let board=["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    winningCombo=[[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8]];
    let curPlayer=0;

    let p1=createPlayer("Bob", 0);
    let p2=createPlayer("Jeff", 1);

    const drop = (pos) =>{


    }

}

function gameController(playerOneName="PlayerOne", playerTwoName="PlayerTwo"){
    const players = [
        {
            name: playerOneName,
            token: 0,
            
        },
        {
            name: playerTwoName,
            token: 1,
        },

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
}