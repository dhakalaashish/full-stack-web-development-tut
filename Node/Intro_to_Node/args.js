process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
    const args = process.argv.slice(2);
    for (let arg of args) {
        console.log(`${index}: Hi there, ${arg}`);
    }
})

