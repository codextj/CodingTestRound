/*
Program to create Diamond based on input character between [A-Z]
*/

let char = process.argv[2];

VALID_INPUTS = "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z".split(", ")

if (char == undefined || !VALID_INPUTS.includes(char.toUpperCase()) ) {
    console.log("Error, Please provide a valid char [A-Z] as an input.");
}