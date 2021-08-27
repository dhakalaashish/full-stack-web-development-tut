//Mongo --- Our first database
//Mongo is a document database, which we can use to store and retrieve complex data form.
//It is considered as most popular database for modern applications

//Why do we use a database? Instead of just saving to a file -using JSON and writeSync or just write function?
//-Databases can handle large amount of data efficiently and store it compactly
//-They provide tools for easy insertion, querying, and updating of data
//-They generally offer security features and control over access to data
//-They (generally) scale well

//SQL databases vs NO-SQL databases

//SQL --- Structured Query Language databases are relational databases. We pre-define a schema of tables before we 
//insert anything. Some of SQL databases are -- MySQL, Postgres, SQLite, Oracle, Microsoft SQL Server

//NO-SQL --- databases do not use SQL. There are many types of no-sql databases, including document, key-value, and
//graph stores. SOme of NO-SQL databases are -- MongoDB, CouchDB, Neo4j, Cassandra, Redis

//Why are we learning Mongo?
//-Mongo is very commonly used with Node and Express (MEAN & MERN stacks)
//-It's easy to get started with (though it can be tricky to truly master)
//-It plays particularly well with JS, it's popularity means there is a strong community for mongo.

//mongo shell is simolar to node repl, but it is very helpful, and we use it a lot
//we open it up we type mongo in the terminal ----------use powershell --mongo works better there!
// in mongo, and other databases, we can have more than one databases! We often want many databases, as we will be
//making many apps


//commands for mongoDB
// db -- this is a variable, and is a database that we will be using as a default! and that database will be called test
// show databases or show dbs ---- lets us view our existing databases, admin, config and local are made for us already
// use databaseName  --- this will make a database for us and it will switch to that database in the REPL
// Ctrl+C --- will take us out of the REPL

//BSON
//MongoDB uses something very similar to JSON called BSON -- basically, Binary JSON
//MongoBD doesn't use JSON because, JSON is a text-based format, and text parsing is slow, it's readable format is 
//far from space-efficient, and JSON only supports limited number of basic data-types
//BSON's binary structure encodes type and length information, which allows it to be parsed much more quickly. 
//BSON has also been extended to add some optional non-JSON data types, like dates, binary, raw, String, Boolean
//and Numbers (Integer, float, long,decimal,...).

//Does MongoBD use BSON, or JSON?
//MongoDB stores data in BSON format both internally, and over the network, but that doesn't mean you can't think of 
//MongoDBas a JSON database. Anything you can represent in JSON can be natively stored in MongoDB and retrieved 
//just as easily as JSON.

//Inserting with Mongo

//Mongodb.com --> docs --> server --> MongoDB CRUD Operations
//Insert Documents
//when we insert document in mongo, we are actually inserting into a collection.
//collection is a grouping of data in a database, and if we don't already have a collection, then that collection
//will be made for us!
// the command for insert that is mostly used is: 
//db.collection.insert()
//show collections ---- shows all the collections
//db.dogs.insertOne({name:"Charlie",age:3,breed:"corgi",catFriendly:true}) --- makes a collection named dogs, 
//if there isn't any and inserts the object to that collection, and gives the Object an ID! 
//now if we type --- show collections --- it will show dogs; to see what is inside the dog collection, we can type
//db.dogs.find() ---- this outputs the following line:
//{ "_id" : ObjectId("6128c3d638b3cb10b7a4070e"), "name" : "Charlie", "age" : 3, "breed" : "corgi", "catFriendly" : true }
//_id will be a unique key for each object in the collection and mongo is setting it for us!
//ObjectID is a particular type in mongo!
//If an inserted document omits the _id field, the MongoDB driver automatically generates an ObjectId for the _id field
//db.collection.insertMany() ---> expects you to pass in an array of documents/object
//db.collection.insert() ---> expects you to pass in either an array or an object!
//let's say that we leave the database and go to another database, let's say if we did --- use local---
//then the shell would switch to local database, there we would not be able to use --- db.dogs.find(), 
//as the collection dogs is not in local database but is in animalShelter database!


//finding with mongo

//db.collection.find(query,projection)
//query -- optional. specifies selection filter using query operators, to return all documents in a collection,
//omit this parameter or pass an empty document.
//projection -- optional, specifies the fields to return in the document that match the query filter. 
//db.dogs.find({breed:"corgi"})
//to find exactly one we can do---- db.dogs.findOne({catFriendly:true, age:17}) --- this outputs:
// {
//     "_id" : ObjectId("6128c3d638b3cb10b7a4070e"),
//     "name" : "Charlie",
//     "age" : 17,
//     "breed" : "corgi",
//     "catFriendly" : true
// }
//db.collection.findOne() -- returns the actual document, while find returns a cursor to the selected documents, 
//basically a pointer or a reference to the results!

//updating using Mongo
//db.collection.updateOne(<filter>,<update>,<options>)
//updateOne will update the first one that matches, while updateMany will update all that matches!
//let's say we are updating age for charlie from dogs collection
//db.dogs.updateOne({name:"Charlie"},{$set: {age:4}})
//we have specific operators when updating, for example $set: {} - $set operator replaces the value of
//a field with the specified value.
//if we try to set something that is not previously there, then the new key value pair will be added in the object!
//$currentDate:{lastModified:true}, that means we will update or add the currentDate for the object in the key "lastModified"

//replaceOne() method -- replaces a single document within the collection based on the filter, but it still keeps the id same!
//syntax --- db.collection.replaceOne(<filter>,<replacement>)

//deleting with mongo
//has two methods -- deleteOne and deleteMany

//db.cats.deleteOne({name:"Blue Steele"}) -- deletes the first cat with the filter!
//db.dogs.deleteMany({idAvailable:false}) -- deletes all dogs which has the following filter!
//db.dogs.deleteMany() -- deletes all the objects under the collection dog!

//More additional operators
//db.dogs.insert({name:"Bella",breed:"Chihuahua",age:8,weight:7, size:'S',personality:{catFriendly:false,childFriendly:false}})
//to find all dogs that are childFriendly, but childFriendly is nested inside of personality, we write:
//db.dogs.find({'personality.childFriendly':true})
//all of these but which are size medium
//db.dogs.find({'personality.childFriendly':true,size:'M'})


//to look at operators in the docs, go to reference and then to operators
//it seems and, or, not all of these have different syntax!
// greater than --- $gt
//to find all dogs greater than 8:
//db.dogs.find({age:{$gt:8}})

//$in operator selects the document where the value of a field equals any value in the specified array!
//let's use $in on dogs to find where the dog falls in the category of medium or large:
//db.dogs.find({size:{$in:['M','L']}})

//and we can also combine these operators like this, so where size is either middle or large and when age is less than 10:
//db.dogs.find({size:{$in:['M','L']},age:{$lt:10}})

//$ne --- not equal!
//$nin --- completely opposite of $in

//lets find dogs that are catFriendly or are less than or equal to 2
//db.dogs.find({$or:[{'personality.catFriendly':true},{age:{$lte:2}}]})

