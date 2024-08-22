document.addEventListener('DOMContentLoaded', function() {
    const firstPlayerInput = document.getElementById("firstPlayer");
    const secondPlayerInput = document.getElementById("secondPlayer");
    const submitButton = document.getElementById("submit");
    let result = document.getElementById("result");
    let turn = 1;
    const restart = document.getElementById("restart");
    const cells = document.querySelectorAll(".cell");
    

    restart.addEventListener('click', function() {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        result.textContent = '';
 
        turn = 1;
        
        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    });
    
    submitButton.addEventListener('click', function() {
        start(firstPlayerInput, secondPlayerInput, result, turn);
        cells.forEach(cell => cell.addEventListener('click', handleCellClick)); 
    });

    function handleCellClick() {
        const firstPlayer = firstPlayerInput.value;
        const secondPlayer = secondPlayerInput.value;

        if (this.textContent === '') {
            if (turn % 2 !== 0) {
                this.textContent = 'X';
                result.textContent = `${secondPlayer}'s turn, symbol = 'O'`;
            } else {
                this.textContent = 'O';
                result.textContent = `${firstPlayer}'s turn, symbol = 'X'`;
            }
            turn++;

            const winnerText = checkWinner(cells, firstPlayer, secondPlayer);
            if (winnerText) {
                result.textContent = `Winner: ${winnerText}`;
                
                cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
            } else if (turn > 9) {
                result.textContent = 'It\'s a draw!';
                
                cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
            }
        }
    }
});

function start(firstPlayerInput, secondPlayerInput, result, turn) {
    const firstPlayer = firstPlayerInput.value;
    const secondPlayer = secondPlayerInput.value;

    if (firstPlayer && secondPlayer) {
        if (turn === 1) {
            result.textContent = `The game starts now! It is ${firstPlayer}'s turn`;
        }
    } else {
        alert('Fill player names properly');
    }
}

function checkWinner(cells, firstPlayer, secondPlayer) {
    const winningCombinations = [
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['0', '4', '8'],
        ['2', '4', '6']
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const cellA = cells[a].textContent;
        const cellB = cells[b].textContent;
        const cellC = cells[c].textContent;

        if (cellA && cellA === cellB && cellA === cellC) {
            return cellA === 'X' ? firstPlayer : secondPlayer;
        }
    }

    return null;
}
