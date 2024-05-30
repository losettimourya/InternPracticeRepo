let names = ['losettimourya', 'remy'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));
Promise.any(requests)
  .then(responses => {
    console.log(responses.length);
    for(let response of responses) {
    console.log(`${response.url}: ${response.status}`);
    }

    return responses;
  })
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(users => users.filter(user => user.id !== undefined))
  .then(users => users.forEach(user => console.log(user.name))); // Losetti Mourya


//   Promise.all([
//     new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//     new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
//   ]).catch(console.log); // Error: Whoops!

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(console.log); // 1