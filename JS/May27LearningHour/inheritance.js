class Animal {
    constructor(name) {
        this.name = name;
        this.speed = 0;
    }
}

class Rabbit extends Animal {
    constructor(name, speed, earLength) {
        super(name);
        this.speed = speed;
        this.earLength = earLength;
    }
}

let rabbit = new Rabbit('White Rabbit', 10, 20);
console.log(rabbit.name); // White Rabbit
console.log(rabbit.speed); // 10
console.log(rabbit.earLength); // 20