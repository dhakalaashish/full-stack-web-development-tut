// // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

// const container = document.querySelector('#container');
// const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'


// for (let i = 1; i <= 151; i++) {
//     const pokemon = document.createElement('div');
//     pokemon.classList.add('pokemon');
//     const label = document.createElement('span');
//     label.innerText = `#${i}`;
//     const newImg = document.createElement('img');
//     newImg.src = `${baseURL}${i}.png`


//     pokemon.appendChild(newImg);
//     pokemon.appendChild(label);
//     container.appendChild(pokemon)
// }


// const container = document.querySelector('#container');

// for (let i = 1; i <= 900; i++) {

//     const newImg = document.createElement('img');
//     newImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${[i]}.png`
//     container.append(newImg);
// }



const container = document.querySelector('#container');

for (let i = 1; i <= 898; i++) {

    const divElement = document.createElement('div');

    divElement.classList.add('pokemon')
    const spanElement = document.createElement('span');
    const newImg = document.createElement('img');
    spanElement.append(`#${i}`);

    newImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${[i]}.png`

    container.append(divElement);
    divElement.append(newImg);
    divElement.append(spanElement);
}