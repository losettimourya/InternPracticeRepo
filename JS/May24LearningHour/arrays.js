let arr = new Array()
console.log(Array.isArray(arr))

arr = []
console.log(Array.isArray(arr))

// Can store elements of any type
arr = [1, function () { return 2; }, () => {return 3} , "str"];
console.log(arr[0])
console.log(arr[1])
console.log(arr[1]())
console.log(arr[2])
console.log(arr[2]())
console.log(arr[3])

arr = [1, "str"];
console.log(arr[arr.length - 1])
console.log(arr.at(-1))

arr.push(2, 3)

// [1, "str", 2, 3]
console.log(arr.at(-1))

arr.pop()

// [1, "str", 2]
console.log(arr.at(-1))

arr.unshift(0)

// [0, 1, "str", 2]
console.log(arr.at(0))

arr.shift()

// [1, "str", 2]
console.log(arr.at(0))

let arr1 = [1, 2, 3]
let arr2 = arr1;
console.log(arr2 === arr1); // true
arr2.push(4);
console.log(arr1) // 1, 2, 3, 4

let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

console.log(matrix[1][1]);

// Arrays do not have Symbol.toPrimitive, neither a viable valueOf, they implement only toString conversion
console.log([1,2] + 1);

console.log([0] == [0]); // false

arr = [1, 2, 3];
delete arr[1];
console.log(arr); // [1, empty, 3]

arr = [1, 2, 3, 4, 5];
arr.splice(1, 2, 'a', 'b', 'c'); // from index 1 remove 2 elements and insert 'a', 'b', 'c'
console.log(arr); // [1, 'a', 'b', 'c', 4, 5]

arr = [1, 2, 3, 4, 5];
let removed = arr.slice(1, 3); // from index 1 to 3 (not inclusive)
console.log(removed); // [2, 3]

arr = [1, 2, 3, 4, 5];
removed = arr.slice(-2) // last 2 elements
console.log(removed); // [4, 5]

["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
    console.log(`${item} is at index ${index} in ${array}`);
  });


const arr3 = [NaN];
console.log( arr3.indexOf(NaN) ); // -1 (wrong, should be 0)
console.log( arr1.includes(NaN) );// true (correct)

arr = [1, 2, 1];


let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
  ];
  
  let user = users.find(item => item.id == 1);
  
  console.log(user.name); // John


  users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
  ];
  
  // returns array of the first two users
  let someUsers = users.filter(item => item.id < 3);
  
  console.log(someUsers.length); // 2



  let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
console.log(lengths); // 5,7,6

arr = [1, 2, 15];
arr.sort();
console.log(arr); // 1, 15, 2

arr = [1, 2, 15];
arr.sort((a, b) => a - b);
console.log(arr); // 1, 2, 15

let str = "test";
console.log( str.split('') ); // t,e,s,t

let strarr = ['t', 'e', 's', 't'];
console.log( strarr.join('.') ); // t.e.s.t


arr = [1, 2, 3, 4, 5];
let result = arr.reduce((sum, current) => sum + current, 0);
console.log(result); // 15