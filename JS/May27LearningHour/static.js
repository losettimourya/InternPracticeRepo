class User {
    static staticMethod() {
      console.log(this === User);
    }
  }
  
  User.staticMethod(); // true

  class User1 {
    staticMethod() {
      console.log(this === User1);
    }
  }

  let user = new User1();
  user.staticMethod(); // false

  try{
    User1.staticMethod();
  }
  catch(e){
    console.log(e);
  }