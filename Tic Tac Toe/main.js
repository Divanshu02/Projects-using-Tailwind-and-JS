let currentPlayerDiv=document.querySelector('.current-player');
let boxes=document.querySelectorAll('.box');
let newGameBtn=document.querySelector('.new-game');

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],    
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let grid=["","","","","","","","",""];

let currentPlayer='X';
function initGame()
{
    currentPlayer='X'
    currentPlayerDiv.textContent=`current player-${currentPlayer}`;
    newGameBtn.classList.add('active');
    grid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
       box.innerText="";
       boxes[index].style.pointerEvents="all";
       box.classList.remove('win');
    })
}

initGame();

function swapTurn(index){
    if(currentPlayer==='X')
    currentPlayer='O';
    else
    currentPlayer='X';
    currentPlayerDiv.textContent=`current player-${currentPlayer}`; 
}

function checkWin(){
    for(let position of winningPositions)
    {
       let  flag=true;
        for(let i of position)
        {
            if(grid[i]!==currentPlayer)
            {
            flag=false;
            break;
            }
        }
        if(flag===true)
        {
            // got our winner
            console.log(position)
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
            return true;
        }
    }
    return false;
}


function handleClick(index){
    if(grid[index]==="")
    {
        boxes[index].textContent=currentPlayer;
        grid[index]=currentPlayer;
        if(checkWin()===true)
        {
            // won the game
            console.log(currentPlayer);
            currentPlayerDiv.textContent=`Winner player-${currentPlayer}`;
            boxes.forEach((box)=>{
            box.style.pointerEvents="none";
            })
            newGameBtn.classList.remove('active');
            return; 
        }
        let flag=true;
        for(let i of grid)
        {
            // checking wether the game is tied or not
            if(i==="")
            {
                flag=false;
            }
        }
        if(flag===true)
        {
            console.log('GAME TIED')
            currentPlayerDiv.textContent=`GAME TIED`;
            newGameBtn.classList.remove('active');
            return;
        }
        
        swapTurn(index);
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
})


newGameBtn.addEventListener('click',initGame)


