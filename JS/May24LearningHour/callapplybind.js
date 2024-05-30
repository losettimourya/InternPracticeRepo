/* 
func.call(context, arg1, arg2…) – calls func with given context and arguments.
func.apply(context, args) – calls func passing context as this and array-like args into a list of arguments.

With the call() method, you can write a method that can be used on different objects.
With the apply() method, you can write a method that can be used on different objects.
With the bind() method, an object can borrow a method from another object.
 */
function test() {
    console.log(this.name);
}

let a = {name: 'Mourya'};
let b = {name: 'Losetti'};
test.call(a); // Mourya
test.call(b); // Losetti


let user = {
    firstName: "John"
  };
  
  function func() {
    console.log(this.firstName); 
  }
  
  let funcUser = func.bind(user);
  funcUser();

  let user1 = {
    firstName: "Pete"
  };
  
  let user2 = {
    firstName: "John",
    say(phrase) {
        console.log(`${phrase}, ${this.firstName}`);
    }
  };

let say = user2.say.bind(user1);
user2.say("Hello"); // Hello, John
say("Hello"); // Hello, Pete


function mul(a, b) {
    return a * b;
}
let triple = mul.bind(null, 3);
console.log(triple(2)); // 6
console.log(triple(3)); // 9


// The context of a bound function is hard-fixed
function f() {
    console.log( this ); // ?
  }
  
  user = {
    g: f.bind(5)
  };
  
  user.g();
