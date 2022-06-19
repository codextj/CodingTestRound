/*
Program to create Diamond based on input character between [A-Z]
*/

const {validateInput, printToConsole} = require("./io.js");
const {chalk} = require("./myChalk.js");

let char = process.argv[2];
char = validateInput(char);

let myChalk = null;
main();

async function main() {
    myChalk = await chalk();
    const charAsciiVal = char.charCodeAt();
    const N = charAsciiVal % 65 + 1;
    const diamondArr = getContainerForDiamond(N);

    fillDiamondArray(diamondArr, N);
    fillCrossArray(diamondArr, N);
    printToConsole(diamondArr);
}


function getContainerForDiamond(N) {
    /*
    N    : rows of upper half
    N-1  : rows of lower half
    Total rows of container => M : N + (N-1)
    Container dimension : M x M 
    */
    const M = N + (N-1);
    let diamondArr = [];

    for (let i=0; i<M; i++) {
        diamondArr.push([]);
        for (let j=0; j<M; j++) {
            diamondArr[i].push(' ');
        }
    }
    return diamondArr;
}


function fillDiamondArray(diamondArr, N) {
    let mid = Math.floor((diamondArr.length-1) / 2);
    let asciiVal = 65;

    const fillRow = (i) => {
        // from start
        diamondArr[i][mid] = myChalk.blue(String.fromCharCode(asciiVal));

        // from end
        diamondArr[i][diamondArr.length-1 - mid] = myChalk.blue(String.fromCharCode(asciiVal));

        mid -= 1;
        asciiVal += 1;
    }
    
    // Fill upper half
    for(let i=0; i<N; i++) {
        fillRow(i);
    }

    // Reset
    mid = Math.floor((diamondArr.length-1) / 2);
    asciiVal = 65;

    // Fill lower half
    for(let i=diamondArr.length-1; i>=N; i--) {
        fillRow(i);
    }
}


function fillCrossArray(diamondArr, N) {
    let asciiVal = 65;
    
    const fillDiagRow = (i,j) => {
        // from start
        diamondArr[i][j] = String.fromCharCode(asciiVal);

        // from end
        diamondArr[i][diamondArr.length-1 - j] = String.fromCharCode(asciiVal);

        asciiVal += 1;
    }

    // Fill upper-half diagonals V
    let j = 0; 
    for(let i=0; i<N; i++) {
        fillDiagRow(i,j);
        j++;
    }

    // Reset
    asciiVal = 65;
    j=0;

    // Fill lower-half diagonals Ʌ
    for(let i=diamondArr.length-1; i>=N; i--) {
        fillDiagRow(i,j);
        j++;
    }
}