var solve = require('tridiagonal-solve');

var initialValues = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
var finalValues = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

var dt = 0.05;
var T = 0.05;
var t = 0.00;

let D = [[-1, -1, -1, -1, -1, -1, -1, -1, -1], [2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4], [-2, -1, -1, -1, -1, -1, -1, -1, -1]]

var resultTag = document.getElementById("ans");

while (t < T) {
    //First half iteration
    for (let j = 0; j < initialValues.length; j++) {
        var equalMatrix = [];
        var result;
        if (j == 0) {
            for (let i = 0; i < initialValues.length; i++) {
                var equalElement;
                if (i == 9) {
                    equalElement = ((2 * initialValues[1][i]) - (1.6 * initialValues[0][i]) + 600);
                } else {
                    equalElement = ((2 * initialValues[1][i]) - (1.6 * initialValues[0][i]));
                }
                equalMatrix.push(equalElement);            
            }
            result = solve(D[0], D[1], D[2], equalMatrix)
        } else if (j == 9) {
            for (let i = 0; i < initialValues.length; i++) {
                var equalElement;
                if (i == 9) {
                    equalElement = (initialValues[8][i] - (1.6 * initialValues[9][i]) + 1200);
                } else {
                    equalElement = (initialValues[8][i] - (1.6 * initialValues[9][i]) + 600);
                }
                equalMatrix.push(equalElement);            
            }
            result = solve(D[0], D[1], D[2], equalMatrix)
        } else {
            for (let i = 0; i < initialValues.length; i++) {
                var equalElement;
                if (i == 9) {
                    equalElement = (initialValues[j-1][i] - (1.6 * initialValues[j][i]) + initialValues[j+1][i] + 600);
                } else {
                    equalElement = (initialValues[j-1][i] - (1.6 * initialValues[j][i]) + initialValues[j+1][i]);
                }
                equalMatrix.push(equalElement);            
            }
            result = solve(D[0], D[1], D[2], equalMatrix)
        }
        finalValues[j] = result;
    }

    for (let i = 0; i < finalValues.length; i++) {
        const row = finalValues[i];
        var ans ="";
        for (let j = 0; j < row.length; j++) {
            const element = row[j];
            
            var col = "    T(" + (j+1) + ", " + (i+1) + ") = " + finalValues[i][j] + "   \t";
            ans += col;
        }
        // ans += "\n";
        var tag = document.createElement("p");
        var text = document.createTextNode(ans);
        tag.appendChild(text);
        resultTag.appendChild(tag);
        
    }
    var newLine = document.createElement("p").appendChild(document.createTextNode("\n\n"));
    resultTag.appendChild(newLine);

    initialValues = finalValues;
    finalValues = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    //second half iteration
    for (let i = 0; i < initialValues.length; i++) {
        var equalMatrix = [];
        var result;
        if (i == 0) {
            for (let j = 0; j < initialValues.length; j++) {
                var equalElement;
                if (j == 9) {
                    equalElement = ((2 * initialValues[j][1]) - (1.6 * initialValues[j][0]) + 600);
                } else {
                    equalElement = ((2 * initialValues[j][1]) - (1.6 * initialValues[j][0]));
                }
                equalMatrix.push(equalElement);            
            }
            result = solve(D[0], D[1], D[2], equalMatrix)
        } else if (i == 9) {
            for (let j = 0; j < initialValues.length; j++) {
                var equalElement;
                if (i == 9) {
                    equalElement = (initialValues[j][8] - (1.6 * initialValues[j][9]) + 1200);
                } else {
                    equalElement = (initialValues[j][8] - (1.6 * initialValues[j][9]) + 600);
                }
                equalMatrix.push(equalElement);            
            }
            result = solve(D[0], D[1], D[2], equalMatrix)
        } else {
            for (let j = 0; j < initialValues.length; j++) {
                var equalElement;
                if (i == 9) {
                    equalElement = (initialValues[j][i-1] - (1.6 * initialValues[j][i]) + initialValues[j][i+1] + 600);
                } else {
                    equalElement = (initialValues[j][i-1] - (1.6 * initialValues[j][i]) + initialValues[j][i+1]);
                }
                equalMatrix.push(equalElement);            
            }
            result = solve(D[0], D[1], D[2], equalMatrix)
        }

        for (let u = 0; u < initialValues.length; u++) {
            finalValues[u][i] = result[u];        
        }
    }

    t += dt;

    
    for (let i = 0; i < finalValues.length; i++) {
        const row = finalValues[i];
        var ans ="";
        for (let j = 0; j < row.length; j++) {
            const element = row[j];
            
            var col = "    T(" + (j+1) + ", " + (i+1) + ") = " + finalValues[i][j] + "   \t";
            ans += col;
        }
        // ans += "\n";
        var tag = document.createElement("p");
        var text = document.createTextNode(ans);
        tag.appendChild(text);
        resultTag.appendChild(tag);
        
    }
    // var newLine = document.createElement("p").appendChild(document.createTextNode("\n\n"));
    resultTag.appendChild(newLine);

    initialValues = finalValues;
    finalValues = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

}

console.log(ans)


t.innerHTML = ans;