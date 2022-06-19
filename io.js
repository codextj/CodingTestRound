export function validateInput (char) {
    const VALID_INPUTS = "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z".split(", ")

    if (char == undefined || !VALID_INPUTS.includes(char.toUpperCase()) ) {
        console.log("Error, Please provide a valid char [A-Z] as an input.");
        process.exit();
    }

    return char.toUpperCase();
}

export function printToConsole (diamondArr) {
    for(let i=0; i<diamondArr.length; i++) {
        console.log(diamondArr[i].join(""));
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