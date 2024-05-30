const teamplayers = {
    player1: "Andrey",
    player2: "Abundance"
}


Object.freeze(teamplayers)

teamplayers.player3 = "Finder";
teamplayers.player2[0] = "B";

console.log(teamplayers)


let str = "Hello";
str[0] = 'A';
console.log(str); // Hello
