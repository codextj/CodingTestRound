import chalk from "chalk";
import vega from "vega-lite";
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
    let printHTML = process.argv[4];

    if (addCross === "--addCross") {
        addCross = true;
    } else {
        addCross = false;
    }

    if (printHTML === "--printHTML") {
        printHTML = true;
    } else {
        printHTML = false;
    }


    config.char = validateInput(char);
    config.isAddCross = addCross;
    config.isPrintHTML = printHTML;
    return config;
}

export function printToHTML (containerArr, options=[]) {
    let spec = getShapeSpec(containerArr);

    let HTMLContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Generated Shape</title>
            <script src="https://cdn.jsdelivr.net/npm/vega@5.21.0"></script>
            <script src="https://cdn.jsdelivr.net/npm/vega-lite@5.2.0"></script>
            <script src="https://cdn.jsdelivr.net/npm/vega-embed@6.20.2"></script>
        </head>
        <body>
            <div id="vis" style="width:90%; height:90%"></div>

            <script type="text/javascript">
            var shapeSpec = ${JSON.stringify(spec)};
            vegaEmbed('#vis', shapeSpec);
            </script>
        </body>
        </html>`
    writeToHTML(HTMLContent);
    
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

function getShapeSpec (containerArr) {
    const shapeJSON = {
        "config": {"view": {"stroke": null}},
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "data": {
          "values": []
        },
        "mark": "text",
        "encoding": {
          "x": {"field": "x", "type": "quantitative", "axis": false},
          "y": {"field": "y", "type": "quantitative", "axis": false},
          "color": {"field": "alphabet", "type": "nominal"},
          "text": {"field": "alphabet", "type": "nominal"}
        }
      };

    for (let i=0; i<containerArr.length; i++) {
        const row = containerArr[i]
        for (let j=0; j<row.length; j++) {
            if(containerArr[i][j] != " "){
                shapeJSON.data.values.push({ "x":i, "y":j, "alphabet" : containerArr[i][j] })
            } 
        }
    }

    return shapeJSON;
}

function writeToHTML (HTMLContent) {
    const fileName = `shapeViz.html`;
    writeFile(fileName, HTMLContent, {flag:"w+"}, (err) => {
        if (err) {
            console.log(err);
            return;
        } 

        console.log(`Shape Viz saved in > ${fileName}`);
        // showVizOnHTML()
        }
    );
}