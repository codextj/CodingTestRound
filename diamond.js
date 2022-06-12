/*
Program to create Diamond based on input character between [A-Z]
*/

const {validateInput} = require("./io.js");

let char = process.argv[2];
char = validateInput(char);

console.log();