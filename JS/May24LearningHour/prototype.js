let animal = {
    eats: true,
    walks() {
      console.log("Animal walks");
    }
  };
  let rabbit = {
    jumps: true,
    __proto__: animal
  };
  
  console.log(rabbit.eats); // true
  console.log(rabbit.jumps); // true
    rabbit.walks(); // Animal walks

let longears = {
    earLength: 10,
    __proto__: rabbit
  };
  
  console.log(longears.jumps); // true (from rabbit)
  console.log(longears.eats); // true (from animal)
    longears.walks(); // Animal walks (from animal)

rabbit.walks = function() {
    console.log("Rabbit walks");
  }
    animal.walks(); // Animal walks
    rabbit.walks(); // Rabbit walks
    longears.walks(); // Rabbit walks


    // Accessor properties work differently
    let user = {
        name: "John",
        surname: "Smith",
      
        set fullName(value) {
          [this.name, this.surname] = value.split(" ");
        },
      
        get fullName() {
          return `${this.name} ${this.surname}`;
        }
      };
      
      let admin = {
        __proto__: user,
        isAdmin: true
      };
      
      console.log(admin.fullName); // John Smith (*)
      
      // setter triggers!
      admin.fullName = "Mourya Losetti"; // (**)
      
      console.log(admin.fullName); // Losetti Mourya
      console.log(user.fullName);

      for(let prop in rabbit) {
        let isOwn = rabbit.hasOwnProperty(prop);
      
        if (isOwn) {
          console.log(`Our: ${prop}`); // jumps, walks
        } else {
          console.log(`Inherited: ${prop}`); // eats
        }
      }



