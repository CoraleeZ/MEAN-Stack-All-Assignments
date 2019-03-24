var myString: string;
// I can assign myString like this:
myString = "Bee stinger";
// Why is there a problem with this? What can I do to fix this?
//basic type of mystring is string so it can not be setted a number value
myString = 'nine';



///////////////////////////////////////



function sayHello(name: string){
    return `Hello, ${name}!`;
 }
 // This is working great:
 console.log(sayHello("Kermit"));
 // Why isn't this working? I want it to return "Hello, 9!"
 //basic type of parameter name is string , can not pass a number value as argument
 console.log(sayHello("nine"));


 //////////////////////////////////////////


 function fullName(firstName: string, lastName: string, middleName: string){
    let fullName = `${firstName} ${middleName} ${lastName}`;
    return fullName;
 }
 // This works:
 console.log(fullName("Mary", "Moore", "Tyler"));
 // What do I do if someone doesn't have a middle name?
 //pass an empty string/or set middleName be a optional parameter by adding a ? 
 console.log(fullName("Jimbo", "Jones",""));

 



 function fullName2(firstName: string, lastName: string, middleName?: string){
    let fullName = `${firstName} ${middleName} ${lastName}`;
    return fullName;
 }
 // This works:
 console.log(fullName2("Mary", "Moore", "Tyler"));
 // What do I do if someone doesn't have a middle name?
 //pass an empty string/or set middleName be a optional parameter by adding a ? 
 console.log(fullName2("Jimbo", "Jones"));

 
 ///////////////////////////////////////////////////////////

 interface Student {
    firstName: string;
    lastName: string;
    belts: number;
 }
 function graduate(ninja: Student){
    return `Congratulations, ${ninja.firstName} ${ninja.lastName}, you earned ${ninja.belts} belts!`;
 }
 const christine = {
    firstName: "Christine",
    lastName: "Yang",
    belts: 2
 }
 const jay = {
    firstName: "Jay",
    lastName: "Patel",
    belts: 4
 }
 // This seems to work fine:
 console.log(graduate(christine));
 // This one has problems:
 //key belt should be belts
 console.log(graduate(jay));
 

 ///////////////////////////////////////////////////////


 class Ninja {
    fullName: string;
    constructor(
       public firstName: string,
       public lastName: string){
          this.fullName = `${firstName} ${lastName}`;
       }
    debug(){
       console.log("Console.log() is my friend.")
    }
 }
 // This is not making an instance of Ninja, for some reason:
 //have to pass  two arguments,also need to add new in front
 const shane =new Ninja("Coralee","Z");
 // Since I'm having trouble making an instance of Ninja, I decided to do this:
 const turing = {
    fullName: "Alan Turing",
    firstName: "Alan",
    lastName: "Turing"
 }
 // Now I'll make a study function, which is a lot like our graduate function from above:
 function study(programmer){
    return `Ready to whiteboard an algorithm, ${programmer.fullName}?`
 }
 // Now this has problems:
 //programmer,s basic type should not be not ninja
 console.log(study(turing));

 
 ////////////////////////////////////////////////


 var increment = x => x + 1;
// This works great:
console.log(increment(3));
var square = x => {return x * x};
// This is not showing me what I want:
//add return into function
console.log(square(4));
// This is not working:
var multiply = (x,y) => x * y;
// Nor is this working:
var math = (x, y) => {
    let sum = x + y;
    let product = x * y;
    let difference = Math.abs(x - y);
    return [sum, product, difference]
}


////////////////////////////


class Elephant {
    constructor(public age: number){}
    birthday = ()=>{
       this.age++;
    }
 }
 const babar = new Elephant(8);
 setTimeout(babar.birthday, 1000)
 setTimeout(function(){
    console.log(`Babar's age is ${babar.age}.`)
    }, 2000)
 // Why didn't babar's age change? Fix this by using an arrow function in the Elephant class.
 