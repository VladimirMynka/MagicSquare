const polinomialMatrices = [];

function getPolinomialMatrix(n) {
    if (n <= polinomialMatrices.length) return polinomialMatrices[n - 1];
    let matrix;
    for (let k = polinomialMatrices.length + 1; k <= n; k++){
        matrix = [];
        for (let i = 0; i < k; i++){
            matrix.push([1]);
            for (let j = 1; j < k; j++){
                matrix[i].push(matrix[i][j - 1] * i);
            }
        }
        polinomialMatrices.push(matrix)
    }
    return matrix;
}

const attachedMatrices = [];

function getAttachedForPolinomial(n) {
    if (n <= attachedMatrices.length) return attachedMatrices[n - 1];
    let matrix;
    for (let k = attachedMatrices.length + 1; k <= n; k++){
        matrix = getAttachedMatrix(getPolinomialMatrix(k));
        attachedMatrices.push(matrix);
    }
    return matrix;
}

function calculateSuperfactorial(n){
    let factorial = 1;
    let superfactorial = 1;
    for (let i = 1; i <= n; i++){
        factorial *= i;
        superfactorial *= factorial;
    }
    return superfactorial;
}

function innerFor(i, iterators, lists, 
    func, params, result, 
    breakIf, breakParams, continueIf, continueParams){

    if (i >= lists.length) func(iterators, params, result);

    else for (iterators[i] of lists[i]) {
        innerFor(length - 1, iterators, lists, func, params, result);
        if (breakIf(iterators, breakParams)) break;
        if (continueIf(iterators, continueParams)) continue;
    }

    return result;
}

function calculateDeterminate(matrix, isInteger = true){
    if (matrix.length != matrix[0].length) return null;
    let copy = matrix.map((element) => element.slice());
    let det = 1;

    for (let columnNumber = 0; columnNumber < copy.length - 1; columnNumber++){
        for (let rowNumber = columnNumber + 1; rowNumber < copy.length; rowNumber++){
            if (copy[columnNumber][columnNumber] == 0){
                rowCopy = copy[columnNumber];
                copy[columnNumber] = copy[columnNumber + 1];
                copy[columnNumber + 1] = rowCopy;
                det *= -1;
                break;
            }

            let k = copy[rowNumber][columnNumber] / copy[columnNumber][columnNumber];
            for (let j = columnNumber; j < copy.length; j++){
                copy[rowNumber][j] -= k * copy[columnNumber][j];
            }
        }
    }
    for (let i = 0; i < copy.length; i++) det *= copy[i][i];
    if (isInteger) det = Math.round(det);
    return det;
}

function getAttachedMatrix(matrix) {
    if (matrix.length != matrix[0].length) return null;
    if (matrix.length == 1) return [[1]];
    let result = matrix.map((elem) => elem.slice());
    let factor = (matrix.length % 2 == 0) ? 1 : -1;
    for (let i = 0; i < result.length; i++){
        if (matrix.length % 2 == 0) factor *= -1;
        for (let j = 0; j < result.length; j++){
            factor *= -1;
            let minorMatrix = [];
            for (let x = 0; x < result.length; x++){
                if (x == i) continue;
                minorMatrix.push([]);
                for (let y = 0; y < result.length; y++){
                    if (y == j) continue;
                    minorMatrix[minorMatrix.length - 1].push(matrix[x][y]);
                }
            }
            let det = calculateDeterminate(minorMatrix);
            result[j][i] = factor * det;
        }
    }
    return result;
}

function multiplyMatrices(matrix1, matrix2){
    if (matrix1[0].length != matrix2.length) return null;
    let result = [];
    for (let i = 0; i < matrix1.length; i++){
        result.push([])
        for (let j = 0; j < matrix2[0].length; j++){
            let sum = 0;
            for (let k = 0; k < matrix1[0].length; k++){
                sum += matrix1[i][k] * matrix2[k][j];
            }
            result[i].push(sum);
        }
    }
    return result;
}

function functionPolinomial(array) {
    return (x) => {
        let y = 1;
        let sum = 0;
        for (let i = 0; i < array.length; i++){
            sum += array[i] * y;
            y *= x;
        }
        return sum;
    }
}

function vecCollect(arr, collecter = null, length = 1){
    if (arr.length == 2 && Math.gcd(arr[0], arr[1]) == 1){
        collecter.push(arr);
        return collecter;
    }
    if (collecter == null) collecter = [];

    if (length == 1){
        let gcd = arr.reduce((GCD, current) => {return Math.gcd(GCD, current)});
        if (gcd != 1){ 
            collecter.push([gcd]);
            return vecCollect(arr.map((elem) => elem / gcd), collecter, 2);
        }
        length++;
    }

    let divider = null;
    let ratio = null;

    for (; length <= (arr.length + 1) / 2; length++){
        let dividers = [];
        let matrix = getAttachedForPolinomial(length);
        let det = calculateSuperfactorial(length - 1)
        for (let i = 0; i < length; i++){
            dividers.push(getDividers(functionPolinomial(arr)(i)));
        }

        let currentSet = [];
        let d = dividers.map(() => 0);
        let func = (i) => {
            if (ratio != null) return;

            if (i >= length){
                divider = multiplyMatrices(matrix, currentSet);
                divider = divider.map(elem => elem[0] / det);
                ratio = vecRatio(arr, divider);
                return;
            }

            for (d[i] of dividers[i]){
                if (ratio != null) return;
                currentSet.length = i;
                currentSet.push([d[i]]);
                func(i + 1);
                
                if (ratio != null) return;
                if (i == 0) continue;
                currentSet.length = i;
                currentSet.push([-d[i]]);
                func(i + 1);
            }
        }
        func(0);
        if (ratio != null) break;
    }

    if (ratio != null){
        collecter.push(divider);
        return vecCollect(ratio, collecter, length);
    }

    collecter.push(arr);
    return collecter;
}