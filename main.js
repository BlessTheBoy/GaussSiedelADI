(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"tridiagonal-solve":2}],2:[function(require,module,exports){
// See: <url:http://en.wikipedia.org/w/index.php?title=
// Tridiagonal_matrix_algorithm&oldid=634696642>
//
// In the code below, indexes start with zero. This means, replace in the
// Wikipedia article's "Method" section:
//
//     a[j] → b[j-2]
//     b[j] → b[j-1]
//     c[j] → c[j-1]
//     d[j] → d[j-1]
//     x[j] → x[j-1]
//     c'[j] → c'[j-1]
//     d'[j] → d'[j-1]

/*jslint node: true, maxerr: 50, maxlen: 80 */

'use strict';

var createCp, createDp, solve, solve1;

// cp: c'
createCp = function (a, b, c, n) {
    var i, cp = [];

    cp[0] = c[0] / b[0];
    if (!isFinite(cp[0])) {
        return null;
    }

    for (i = 1; i < n - 1; i += 1) {
        cp[i] = c[i] / (b[i] - a[i - 1] * cp[i - 1]);
        if (!isFinite(cp[i])) {
            return null;
        }
    }

    return cp;
};

// dp: d'
createDp = function (a, b, d, cp, n) {
    var i, dp = [];

    dp[0] = d[0] / b[0];
    if (!isFinite(dp[0])) {
        return null;
    }

    for (i = 1; i < n; i += 1) {
        dp[i] = (d[i] - a[i - 1] * dp[i - 1]) / (b[i] - a[i - 1] * cp[i - 1]);
        if (!isFinite(dp[i])) {
            return null;
        }
    }

    return dp;
};

solve = function (a, b, c, d, n) {
    var i, x = [], cp, dp;

    cp = createCp(a, b, c, n);
    if (cp === null) {
        return null;
    }
    dp = createDp(a, b, d, cp, n);
    if (dp === null) {
        return null;
    }

    x[n - 1] = dp[n - 1];
    for (i = n - 2; i >= 0; i -= 1) {
        x[i] = dp[i] - cp[i] * x[i + 1];
    }

    return x;
};

solve1 = function (b, d) {
    var x = [d[0] / b[0]];

    return isFinite(x[0]) ? x : null;
};

// Returns null if there is no solution, an array of x-values otherwise.
module.exports = function (a, b, c, d) {
    var n = d.length;

    if (n === 0) {
        return [];
    }

    if (n === 1) {
        return solve1(b, d);
    }

    return solve(a, b, c, d, n);
};

},{}]},{},[1]);
