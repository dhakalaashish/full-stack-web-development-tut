let addP1 = document.querySelector('#addP1');
let addP2 = document.querySelector('#addP2');
let reset = document.querySelector('#reset');

let updateP1 = document.querySelector('#updateP1');
let updateP2 = document.querySelector('#updateP2');

let scoreP1 = 0;
let scoreP2 = 0;
let isGameOver = false;
let playTo = document.querySelector('#playTo');
playTo.addEventListener('change', maxScore = () => {
    let maxScore = parseInt(playTo.value)
    return maxScore;
});

addP1.addEventListener('click', () => {
    scoreP1++;
    if (!isGameOver) {
        if (scoreP1 < maxScore()) {
            updateP1.innerText = scoreP1;
        } else if (scoreP1 == maxScore()) {
            updateP1.innerText = scoreP1;
            updateP1.style.color = 'green';
            updateP2.style.color = 'red';
            isGameOver = true;
        } else {
            console.log('Game over! Player 1 won!')
            reset();
        }
    }
})
addP2.addEventListener('click', () => {
    scoreP2++;
    if (!isGameOver) {
        if (scoreP2 < maxScore()) {
            updateP2.innerText = scoreP2;
        } else if (scoreP2 == maxScore()) {
            updateP2.innerText = scoreP2;
            updateP1.style.color = 'red';
            updateP2.style.color = 'green';
            isGameOver = true;
        } else {
            console.log('Game over! Player 2 won!')
            reset();
        }
    }
});

reset.addEventListener('click', reset = () => {
    isGameOver = false;
    scoreP1 = 0;
    scoreP2 = 0;
    updateP1.innerText = 0;
    updateP2.innerText = 0;
    updateP1.style.color = 'white';
    updateP2.style.color = 'white';
})




// playTo.addEventListener('change', () => {
//     if (playTo[].value === 10) {
//         console.log('value 10 was selected');
//     } else if (this.value === 5) {
//         console.log('value 5 was selected');
//     } else if (this.value === 12) {
//         console.log('value 12 was selected');
//     } else if (this.value === 2) {
//         console.log('value 2 was selected');
//     }
// })

// let first = playTo[0].value; --------------this gives the value in string for each index--- index being changed when we change the html
// let firstValue = parseInt(first); --------- this gives the same value in integer

// let check = playTo.value; ------this only gives the original selected value



//----seems like I can call the maxScore() function to get the change in select value but assigning that function to a variable gives only the originally selected value;
//----seems like, I dont need the addEventListener to the <select> at all!, and I can only use a function here!

