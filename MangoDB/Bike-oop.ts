class Bike{
    constructor(public price: Number, public max_speed: String, public miles=0) {

    }
}

let bike1 = new Bike(300, '250mph');
let bike2 = new Bike(200, '150mph');
let bike3 = new Bike(220, '200mph');


function displayInfo(bike: Bike) {
    console.log(`bike price is ${bike.price}`)
    console.log(`bike max speed is ${bike.max_speed}`)
    console.log(`bike total miles is ${bike.miles}`)
}

function ride(bike: Bike) {
    console.log(`riding`);
    bike.miles += 10;
} 

function reverse(bike: Bike) {
     console.log(`reverse`);
    bike.miles -= 5;
}

ride(bike1);
ride(bike1);
ride(bike1);

reverse(bike1);
displayInfo(bike1);



ride(bike2);
ride(bike2);
reverse(bike2);
reverse(bike2);
displayInfo(bike2);

reverse(bike3);
reverse(bike3);
reverse(bike3);
displayInfo(bike3);
