let maximum = parseInt(prompt("Enter a number which is the maximum range for your guess"));

while (!maximum) {
    maximum = parseInt(prompt("Enter a valid"));
}

const randomNumber = Math.floor(Math.random() * maximum) + 1;

console.log(randomNumber);

let guess = parseInt(prompt(`Enter your guess of the random number between 0 and ${maximum}`));
let numberOfGuesses = 1;

while (parseInt(guess) !== randomNumber) {
    if (guess == 'q') break;
    numberOfGuesses++;
    if (guess > randomNumber) {
        guess = prompt('This number is too high! Enter a new guess:');
    } else {
        guess = prompt('This number is too low! Enter a new guess:');
    }
}

if (guess == 'q') {
    console.log('Too Bad! You quit!');
} else {
    console.log(`Awesome, your guess is correct! It took you ${numberOfGuesses} guesses!`)
}

