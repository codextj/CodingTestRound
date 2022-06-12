/*
Program to create Diamond based on input character between [A-Z]
*/

const {validateInput} = require("./io.js");

let char = process.argv[2];
char = validateInput(char);

charAsciiVal = char.charCodeAt();
const N = charAsciiVal % 65 + 1;

const getDiamondArr = (N) => {
    const diamondArrLength = N + (N-1);
    const tempArr =  new Array(diamondArrLength);
    return tempArr.fill(new Array(diamondArrLength))
}

const diamondArr = getDiamondArr(N);
console.log(diamondArr);