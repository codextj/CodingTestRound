/*
Program to create Diamond based on input character between [A-Z]
*/

const {validateInput, printToConsole} = require("./io.js");

let char = process.argv[2];
char = validateInput(char);

charAsciiVal = char.charCodeAt();
const N = charAsciiVal % 65 + 1;

const getDiamondArr = (N) => {
    const diamondArrLength = N + (N-1);
    let diamondArr = [];
    for (let i=0; i<diamondArrLength; i++) {
        diamondArr.push([]);
        for (let j=0; j<diamondArrLength; j++) {
            diamondArr[i].push(' ');
        }
    }
    return diamondArr;
}

const diamondArr = getDiamondArr(N);
console.log(diamondArr);

let asciiVal = 65;

// Fill upper half
mid = Math.floor((diamondArr.length-1) / 2);
console.log(N, mid)

for(let i=0; i<N; i++) {
    console.log("mid >", mid);
    console.log("asciiVal >", asciiVal);
    
    // from start
    diamondArr[i][mid] = String.fromCharCode(asciiVal);

    // from end
    diamondArr[i][diamondArr.length-1 - mid] = String.fromCharCode(asciiVal);
    
    mid -= 1;
    asciiVal += 1;
    console.log(">",diamondArr[i])
}

// Reset
mid = Math.ceil((diamondArr.length-1) / 2);
asciiVal = 65;

console.log("/////////////////////////////////")


// Fill lower half
for(let i=diamondArr.length-1; i>=N; i--) {
    console.log("mid >", mid);
    console.log("asciiVal >", asciiVal);
    
    // from start
    diamondArr[i][mid] = String.fromCharCode(asciiVal);

    // from end
    diamondArr[i][diamondArr.length-1 - mid] = String.fromCharCode(asciiVal);
    
    mid -= 1;
    asciiVal += 1;
    console.log(">",diamondArr[i])
}

printToConsole(diamondArr);