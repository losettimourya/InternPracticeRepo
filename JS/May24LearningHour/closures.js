/*
A closure has access to its own scope
It has access to the outer function’s variables
It has access to the global variables
*/

function outerfunction()
{
    let count = 10;
    function innerFunction() // closure
    {
        return count+2;
    }
    return innerFunction;
}
var innerFunc = outerfunction();
console.log(innerFunc());

function makecounter()
{
    let count = 0;
    return function()
    {
        return count++;
    }
}
var counter = makecounter();
console.log(counter());
console.log(counter());
console.log(counter());

function makecounter1()
{
    let count = 0;
    return function()
    {
        return count++;
    }
}

function makecounter3()
{
    let count = 0;
    return [function()
    {
        return count++;
    }, function()
    {
        return count++;
    }]; 
}

function makecounter2()
{
    let count = 0;
    function counter()
    {
        count++;
    }
    counter();
    return count;
}

function newcounter()
{
    let count=0;
    return count++;
}

let counter1 = makecounter1();
let counter2 = makecounter2;
let counter3 = newcounter;
const [counter4, counter5] = makecounter3();

for (let i = 0; i < 5; i++)
{
    console.log("Function 1: ", counter1());
    console.log("Function 2: ", counter2());
    console.log("Function 3: ", counter3());
    console.log("Function 4: ", counter4());
    console.log("Function 5: ", counter5());
}

function adder(x)
{
    return function(y)
    {
        return x + y;
    }
}

let add3 = adder(3);
console.log(add3(4));
console.log(add3(5));