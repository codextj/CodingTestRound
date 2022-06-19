/*
Program to create Diamond based on input character between [A-Z]
*/

import { getConfig, printToConsole } from "./io.js";


const { char, addCross } = getConfig();


const charAsciiVal = char.charCodeAt();
const N = charAsciiVal % 65 + 1;
const containerArr = getContainerForDiamond(N);

fillDiamond(containerArr, N);

if (addCross) {
    fillCross(containerArr, N);
}

printToConsole(containerArr, [{"shape":"diamond", "color":"yellowBright"}, {"shape":"cross", "color":"magentaBright"}]);

function getContainerForDiamond(N) {
    /*
    N    : rows of upper half
    N-1  : rows of lower half
    Total rows of container => M : N + (N-1)
    Container dimension : M x M 
    */
    const M = N + (N-1);
    let containerArr = [];

    for (let i=0; i<M; i++) {
        containerArr.push([]);
        for (let j=0; j<M; j++) {
            containerArr[i].push(' ');
        }
    }
    return containerArr;
}


function fillDiamond(containerArr, N) {
    let mid = Math.floor((containerArr.length-1) / 2);
    let asciiVal = 65;

    const fillRow = (i) => {
        // from start
        containerArr[i][mid] = String.fromCharCode(asciiVal);

        // from end
        containerArr[i][containerArr.length-1 - mid] = String.fromCharCode(asciiVal);

        mid -= 1;
        asciiVal += 1;
    }
    
    // Fill upper half
    for(let i=0; i<N; i++) {
        fillRow(i);
    }

    // Reset
    mid = Math.floor((containerArr.length-1) / 2);
    asciiVal = 65;

    // Fill lower half
    for(let i=containerArr.length-1; i>=N; i--) {
        fillRow(i);
    }
}


function fillCross(diamondArr, N) {
    let asciiVal = 65;
    
    const fillRow = (i,j) => {
        // from start
        diamondArr[i][j] = String.fromCharCode(asciiVal);

        // from end
        diamondArr[i][diamondArr.length-1 - j] = String.fromCharCode(asciiVal);

        asciiVal += 1;
    }

    // Fill (V) upper-half diagonals 
    let j = 0; 
    for(let i=0; i<N; i++) {
        fillRow(i,j);
        j++;
    }

    // Reset
    asciiVal = 65;
    j=0;

    // Fill (Ʌ) lower-half diagonals 
    for(let i=diamondArr.length-1; i>=N; i--) {
        fillRow(i,j);
        j++;
    }
}