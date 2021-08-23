
// let input = prompt("Enter a number");
// numberOfLoop = parseInt(input);


// for (i = 0; i < numberOfLoop; i++) {
//     let coin = Math.random();
//     if (coin < 0.5) {
//         console.log(`Your number is less than 0.5 and it is ${coin}`);
//     } else if (coin > 0.5) {
//         console.log(`Your number is greater than 0.5 and it is ${coin}`);
//     } else {
//         console.log(`Your number is exactly 0.5`);
//     }
// }

// const password = prompt("Please enter a new password!");

// // password must be 6+ character
// if (password.length >= 6) {
//     if (password.indexOf(' ') === -1) {
//         console.log("Valid Password");
//     } else {
//         console.log("Invalid Password! Password canot have a space!");
//     }
// } else {
//     console.log("Password is too short! Enter a long enough password - it should be 6+ characters");
// }

// let array = ["apple", "ball", "cat", "dhakal", "elephant", "finland", "give", "holy", "indians", "jerry"];

// let first = array[0];

// array.push("kali");

// array[0] = "aashish";

// console.log(array[0][2]);

// let emptyArray = [];

// console.log(array.length);

// emptyArray.push("Aashish");

// console.log(typeof (emptyArray));


//loops

// for (i = 25; i >= 0; i -= 5) {
//     console.log(i);
// }

// const people = ["Scooby", "Velma", "Daphne", "Shaggy", "Fred"]; //DONT TOUCH THIS LINE!

// // WRITE YOUR LOOP BELOW THIS LINE:

// for (i = 0; i < people.length; i++) {
//     console.log(people[i].toUpperCase());
// }


//---------------------------for of loop--------------------------------------------

// const seatingChart = [
//     ['Ayush', 'Rakesh', 'Lokesh'],
//     ['Bhatte', 'Aashish', 'Bame', 'Nikesh'],
//     ['Reetika', 'Darcy', 'Swornima', 'Jyoti']
// ]

// for (let i = 0; i < seatingChart.length; i++) {
//     let row = seatingChart[i];
//     for (let j = 0; j < row.length; j++) {
//         console.log(row[j]);
//     }
// }

// for (let row of seatingChart) {
//     for (let student of row) {
//         console.log(student);
//     }
// }

// let stringExample = "Lado Kha";

// for (let lekh of stringExample) {
//     console.log(lekh);
// }

//Iterating over objects

const testScores = {
    keenan: 60,
    damon: 67,
    kim: 89,
    shawn: 91,
    marloon: 72,
    dwayne: 77,
    nadia: 83,
    elvira: 97,
    diedre: 81,
    vonnie: 60
}

console.log(Object.entries(testScores));

