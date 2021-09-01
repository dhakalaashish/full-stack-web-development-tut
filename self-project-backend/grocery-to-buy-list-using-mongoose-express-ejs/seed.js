const Grocery = require('./groceryMongoose.js')

const week1 = [
    {
        name: 'Mushroom',
        quantity: 2,
        price: '3.99',
        category: ['lunch', 'dinner'],
        forWhom: 'Both',
    },
    {
        name: 'Milk',
        quantity: 1,
        price: '5.99',
        category: ['breakfast'],
        forWhom: 'Both',
    },
    {
        name: 'Hazelnut Spread',
        price: '4.99',
        category: ['breakfast', 'dessert'],
        forWhom: 'Aashish',
    },
    {
        name: 'Grapefruit',
        quantity: 2,
        price: '1.99',
        category: ['breakfast'],
        forWhom: 'Darcy',
    },
    {
        name: 'Bacon',
        price: '5.99',
        category: ['breakfast'],
        forWhom: 'Both',
    },
    {
        name: 'English Muffin',
        quantity: 1,
        price: '3.99',
        category: ['breakfast'],
        forWhom: 'Both',
    },
]


Grocery.insertMany(week1);