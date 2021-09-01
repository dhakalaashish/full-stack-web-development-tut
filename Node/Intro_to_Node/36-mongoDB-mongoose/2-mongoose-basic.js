//Mongoose

//IMP --- the docs for Mongoose is very clear under its quick start -- please view it!

//is an ODM - Object Data Mapper or Object Document Mapper
//ODMs like Mongoose map documents/data coming from a database into usable JavaScript objects.
//Mongoose provides ways for us to model out our application data and define a schema. It offers easy ways to 
//validite data and build complex queries from the comform of JS.
const mongoose = require('mongoose');

main().then(console.log('Connection Open')).catch(err => console.log(err));

async function main() {
    //await mongoose.connect('mongodb://localhost:27017/test');
    //this uses the test database! let's change it to movieApp
    await mongoose.connect('mongodb://localhost:27017/movieApp');
}

//in Mongoose website go to API and Model, and
//Model is a javascript class that we are making which should model the information coming back from our MongoDB. It helps
//us interact and send new information to the database or queries or delete things! So, for every different resource or every
//different collection that we will be working with in a Mongo database, if we plan on accessing that data or working with
//it in JavaScript file using Mongoose --> we will need to define a model for each one!

//and the first thing we do to define a model is to define a schema! Schema:
//Everything in Mongoose starts with a Schema. Each Schema maps to a MongoDB collection and defines the shape of the documents
//within that collection. -- It is a mapping of different collection keys from Mongo to different types in JavaScript.

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})
//now we have defined a schema -- this doen't have anything to do with the Mongodb yet -- this is only a concept on the JS side!
//After that, we take this Schema - movieSchema - and tell Mongoose that we want to make a model using that Schema!
//the way we do that is:--> mongoose.model('Name of the Model in String', Schema Name)
//the Name of the Model in String is supposed to be Singular and Capitalized! Mongoose will pluralize it and makes it lower case!
//we then assign that to a class const Classname; -- so Movie below is a className!
const Movie = mongoose.model('Movie', movieSchema)
//we can now make new instances of Movie class and save them in our Mongo Database

const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'R' })
//we can load this in our terminal in the node REPL by typing: ".load filename" in the REPL itself
//then we can access amadeus in the node repl, but it is still not saved in the database! we can save it by doing:
// amadeus.save() // type this in the console
//let's say we change something like the score to be 9.5,--> type "amadeus.score = 9.5" in the node repl
//then that will not be updated in the MongoDataBase until we call amadeus.save() again!
//then if we open "mongo" in another terminal, and type "use databaseName(moviesApp in this case)" then if we type:
//"db.movies.find() --- we will see that amadeus/our instance is already saved to the database!" 

//------------------inserting many objects at the same time -----------------------//
Movie.insertMany([
    { title: 'Amelife', year: 2001, score: 8.3, rating: 'R' },
    { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
    { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
    { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
    { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' },
])
    .then(data => {
        console.log('It worked')
        console.log(data);
    })
//when we call insertMany, we don't need to call save(), but we should use save when we do new Movie({....})

//-------------------find by mongoose---------------------------//
//mongoose queries are not promises. They have a .then() function for co and async.await as a convinience. If you need a full-fledge promise, use
//the .exec() function.

// Movie.find({}) //returns a thenable query object! The query object doesn't give me the data by itself, so we need to chain on the .then()
// Movie.find({}).then(data => console.log(data)); //typing this in the REPL with .load app.js already loaded will console.log the list of movies!
// Movie.find({ rating: 'PG-13' }).then(data => console.log(data))
// Movie.find({ year: { $gt: 2010 } }).then(data => console.log(data))
// Movie.find({ year: { $lt: 1990 } }).then(data => console.log(data))
//Movie.find always outputs and array where there are one or more objects in it!
//But, if we do Movie.findOne, it will output an object!

//we can use an .exec() method too instead of .then()
//.exec() can be used to get a better stack trek -- better at finding errors if there is any!

//we can also find by ID-----
// Movie.findById('612b80fee9bd843197487ef0').then(m=>console.log(m))

//--------------updating using Mongoose--------------------------//
// Movie.updateOne({title:'Amadeus'},{year:1984}).then(res=>console.log(res))
//in the updateOne argument, the first object finds what is to be updated and the second one updates a part of it!
//this gives back in the console -- the number of things updated!

//let's say we want to update more than one object/document at once!
//here we update those that have title of ['Amadeus', 'Stand By Me'], and update their score to be 10
//Movie.updateMany({ title: { $in: ['Amadeus', 'Stand By Me'] } }, { score: 10 }).then(res => console.log(res))

//findOneAndUpdate will find first, the update then show!
//syntax --> Model.findOneAndUpdate(query,set,options,callback)
//example --> Movie.findOneAndUpdate({title:'The Iron Giant'},{score:7}).then(data=>console.log(data))
//this updates, but shows the old one! to change that we pass in the option as "new"! This returns the modified document rather then original
//Movie.findOneAndUpdate({title:'The Iron Giant'},{score:7.8},{new:true}).then(data=>console.log(data))

//--------------deleting using Mongoose--------------------------//
//remove
//Movie.remove({title:'Amelie'}).then(msg=>console.log(msg))
//Movie.deleteMany({year:{$gte:1999}}).then(msg=>console.log(msg))
//Movie.findOneAndDelete({title:'Alien'}).then(m=>console.log(m))


