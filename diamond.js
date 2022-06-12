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

function fillDiamondArray(diamondArr, half, startRow, endRow) {
    let mid = Math.floor((diamondArr.length-1) / 2);
    let asciiVal = 65;
    let mode = half.toUpperCase();

    const fillRow = (i) => {
        // from start
        diamondArr[i][mid] = String.fromCharCode(asciiVal);

        // from end
        diamondArr[i][diamondArr.length-1 - mid] = String.fromCharCode(asciiVal);

        mid -= 1;
        asciiVal += 1;
    }

    if (mode == "UPPER") {
        for(let i=startRow; i<endRow; i++) {
            fillRow(i);
        }
    } else if (mode == "LOWER") {
        for(let i=startRow; i>=endRow; i--) {
            fillRow(i);
        }
    }
}

fillDiamondArray(diamondArr, "upper", 0, N);
fillDiamondArray(diamondArr, "lower", diamondArr.length-1, N);

printToConsole(diamondArr);