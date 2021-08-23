/*
function Car(make, model, year, color, passengers, convertible, mileage) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
    this.passengers = passengers;
    this.convertible = convertible;
    this.mileage = mileage;
    this.started = false;
    this.start = function () {
        this.started = true;
    };
    this.stop = function () {
        this.started = false;
    }
    this.drive = function () {
        if (this.started) {
            console.log(this.make + " " + this.model + " goes zoom zoom!");
        } else {
            console.log("Start the engine first.");
        }
    };
}

var chevy = new Car("Chevy", "Bel Air", 1957, "red", 2, false, 1021);
var ford = new Car("Ford", "f-350", 2021, "gold", 7, true, 1000);
var cadi = new Car("GM", "Cadillac", 1955, "tan", 5, false, 12892);
var taxi = new Car("Webville Motors", "Taxi", 1955, "yellow", 4, false, 281341);
var fiat = new Car("Fiat", "500", 1957, "Medium Blue", 2, false, 88000);
var testCar = new Car("Webville Motors", "Test Car", 2014, "marine", 2, true, 21);
var cars = [chevy, ford, cadi, taxi, fiat, testCar];

for (var i = 0; i < cars.length; i++) {
    cars[i].start();
    cars[i].drive();
    cars[i].drive();
    cars[i].stop();
}

*/

//using only one parameter


var fordParams = {
    make: "Ford",
    model: "F-350",
    year: 2021,
    color: "white",
    passengers: 7,
    convertible: true,
    mileage: 500,
}

var ford = new Car(fordParams);

function Car(params) {
    this.make = params.make;
    this.model = params.model;
    this.year = params.year;
    this.color = params.color;
    this.passengers = params.passengers;
    this.convertible = params.convertible;
    this.mileage = params.mileage;
    this.started = false;

    this.start = function () {
        this.started = true;
        console.log("Car has been started");
    };
    this.stop = function () {
        this.started = false;
        console.log("Car has been stop");
    };
    this.drive = function () {
        if (this.started) {
            console.log("Zoom Zoom");
        } else {
            console.log("To drive, you need to start the car first dummy!");
        }
    };
}

ford.start();
ford.drive();
ford.stop();
ford.drive();