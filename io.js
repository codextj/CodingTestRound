import chalk from "chalk";
import { writeFile } from "fs";

export function validateInput (char) {
    const VALID_INPUTS = "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z".split(", ")

    if (char == undefined || !VALID_INPUTS.includes(char.toUpperCase()) ) {
        console.log("Error, Please provide a valid char [A-Z] as an input.");
        process.exit();
    }

    return char.toUpperCase();
}

export function printToConsole (containerArr, options) {
    if (options) {
        /*
        chalk.red(chalk.blue("hi")) -> output in blue only so need to use chalk.reset
        otherwise we can just flip the options array so that user will get expected overwrite of colors on shape
        */
        options.reverse()

        for (let {shape, color} of options) {
            fillColors(containerArr, shape, color);
        }
    }

    for(let i=0; i<containerArr.length; i++) {
        console.log(containerArr[i].join(""));
    }
}

export function getConfig () {
    let config = {}
    let char = process.argv[2];
    let addCross = process.argv[3];

    if (addCross === "--addCross") {
        addCross = true;
    } else {
        addCross = false;
    }

    config.char = validateInput(char);
    config.addCross = addCross;
    return config;
}


export function writeToJSON (containerArr) {
    const shapeJSON = {};
    const values = [];
    shapeJSON.values = values;

    for (let i=0; i<containerArr.length; i++) {
        const row = containerArr[i]
        for (let j=0; j<row.length; j++) {
            values.push({ "x":i, "y":j, "alphabet" : containerArr[i][j] })
        }
    }

    
    writeFile("shape.json", JSON.stringify(shapeJSON), (err) => {
        if (err) {
            console.log(err);
            return;
        } 

        console.log("containerArr data saved succesfully in shape.json");
        // showVizOnHTML();
    });
}


///////////////////////////// INTERNAL FUNCTIONS ///////////////////////////////////////////

function fillColors(containerArr, shape, color){
    switch (shape) {
        case "diamond" : {
            // upper-half
            let i=0;
            let mid = Math.floor((containerArr.length-1) / 2);
        
            while (mid >= 0){
                containerArr[i][mid] = chalk[color](containerArr[i][mid]);
                containerArr[i][containerArr.length-1 - mid] = chalk[color](containerArr[i][containerArr.length-1 - mid]);
                mid -=1;
                i += 1;
            }

            // lower-half
            mid = Math.floor((containerArr.length-1) / 2);
            i=containerArr.length-1;
            while (mid >= 0){
                containerArr[i][mid] = chalk[color](containerArr[i][mid]);
                containerArr[i][containerArr.length-1 - mid] = chalk[color](containerArr[i][containerArr.length-1 - mid]);
                mid -=1;
                i -= 1;
            }
            break;
        }
        case "cross" : {
            // full diagonal from topLeft to bottomRight
            let i=0;
            let j=0;
            while(i < containerArr.length && j < containerArr.length ) {
                containerArr[i][j] = chalk[color](containerArr[i][j]);
                i++; j++;
            }

            i=0;
            j=containerArr.length-1;
            while(i < containerArr.length && j > -1 ) {
                containerArr[i][j] = chalk[color](containerArr[i][j]);
                i++; j--;
            }
            break;
        }

    }
}