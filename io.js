module.exports.validateInput = function (char) {
    const VALID_INPUTS = "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z".split(", ")

    if (char == undefined || !VALID_INPUTS.includes(char.toUpperCase()) ) {
        console.log("Error, Please provide a valid char [A-Z] as an input.");
        process.exit();
    }

    return char.toUpperCase();
}