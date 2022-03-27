const polinomialMatrices = [];

function getPolinomialMatrix(n) {
    if (n <= polinomialMatrices.length) return polinomialMatrices[n - 1];
    let matrix;
    for (let k = polinomialMatrices.length + 1; k <= n; k++){
        matrix = [];
        for (let i = 0; i < k; i++){
            matrix.push([1n]);
            for (let j = 1; j < k; j++){
                matrix[i].push(matrix[i][j - 1] * BigInt(i));
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
    let factorial = 1n;
    let superfactorial = 1n;
    for (let i = 1n; i <= n; i++){
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
    }

    return result;
}

function calculateDeterminate(matrix, isInteger = true){
    if (matrix.length !== matrix[0].length) return null;
    let copy = matrix.map((element) => element.slice());
    let det = 1n;

    for (let columnNumber = 0; columnNumber < copy.length - 1; columnNumber++){
        for (let rowNumber = columnNumber + 1; rowNumber < copy.length; rowNumber++){
            if (copy[columnNumber][columnNumber] === 0n){
                let rowCopy = copy[columnNumber];
                copy[columnNumber] = copy[columnNumber + 1];
                copy[columnNumber + 1] = rowCopy;
                det *= -1n;
                break;
            }

            let k = copy[rowNumber][columnNumber] / copy[columnNumber][columnNumber];
            for (let j = columnNumber; j < copy.length; j++){
                copy[rowNumber][j] -= k * copy[columnNumber][j];
            }
        }
    }
    for (let i = 0; i < copy.length; i++) det *= copy[i][i];
    return det;
}

function getAttachedMatrix(matrix) {
    if (matrix.length !== matrix[0].length) return null;
    if (matrix.length === 1) return [[1]];
    let result = matrix.map((elem) => elem.slice());
    let factor = (matrix.length % 2 === 0) ? 1n : -1n;
    for (let i = 0; i < result.length; i++){
        if (matrix.length % 2 === 0) factor *= -1n;
        for (let j = 0; j < result.length; j++){
            factor *= -1n;
            let minorMatrix = [];
            for (let x = 0; x < result.length; x++){
                if (x === i) continue;
                minorMatrix.push([]);
                for (let y = 0; y < result.length; y++){
                    if (y === j) continue;
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
    if (matrix1[0].length !== matrix2.length) return null;
    let result = [];
    for (let i = 0; i < matrix1.length; i++){
        result.push([])
        for (let j = 0; j < matrix2[0].length; j++){
            let sum = 0n;
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
        x = BigInt(x);
        let y = 1n;
        let sum = 0n;
        for (let i = 0; i < array.length; i++){
            sum += array[i] * y;
            y *= x;
        }
        return sum;
    }
}

function vecCollect(arr, collecter = null, length = 1){
    arr = arr.map(elem => BigInt(elem));
    if (arr.length === 2 && Math.gcd(arr[0], arr[1]) === BigInt(1)){
        collecter.push(arr);
        return collecter;
    }
    if (collecter == null) collecter = [];

    if (length === 1){
        let gcd = arr.reduce((GCD, current) => {return Math.gcd(GCD, current)});
        if (gcd !== 1n){
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
                ratio = vecDivide(arr, divider);
                ratio = ratio[1].length === 0 ? ratio[0] : null;
                return;
            }

            for (d[i] of dividers[i]){
                if (ratio != null) return;
                currentSet.length = i;
                currentSet.push([d[i]]);
                func(i + 1);
                
                if (ratio != null) return;
                if (i === 0n) continue;
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

function vecPower(vector, power){
    if (power == 0n) return [1];
    let between = vector;
    for (let i = 1; i < power; i++){
        between = vecMultiply(between, vector);
    }
    return between;
}

function vecChangeSystem(vector, x, y){
    if (typeof vector[0] === 'object')
        return vecCollect(vecChangeSystem(vecMultiply.apply(this, vector), x, y));
    if (arguments.length === 2)
        return vecCalculate(vector, x);
    let current = getArrayWithNeededLength(vector, x);
    vector.forEach((elem, index, array) => {
        let between = vecMultiply([elem], vecPower(x, array.length - index - 1), vecPower(y, index));
        current = vecSum(current, between);
    });
    return current;
}

function vecCalculate(vector, x){
    let y = x.map(() => 0);
    y[y.length - 1] = 1;
    return vecChangeSystem(vector, x, y);
}

function getArrayWithNeededLength(vector, x){
    let array = [];
    for (let i = 0; i <= (vector.length - 1) * (x.length - 1); i++){
        array.push(0n);
    }
    return array;
}

function vecGcd(vec1, vec2, base) {
     let sorted = vecMaxAndMin(vec1, vec2);
     sorted[0] = sorted[0].map((elem) => elem % base);
     sorted[1] = sorted[1].map((elem) => elem % base);
     let gcd = Math.gcd(...sorted[1]);
     sorted[1] = sorted[1].map((elem) => elem / gcd);
     while ((sorted[1][0] != 0 || sorted[1].length > 1) && sorted[1].length !== 0){
         sorted = vecMaxAndMin(vecDivide(sorted[0], sorted[1])[1].map(elem => elem % base), sorted[1]);
         if (sorted[1][0] == 0 && sorted[1].length <= 1) break;
         gcd = Math.gcd(...sorted[1]);
         sorted[1] = sorted[1].map((elem) => elem / gcd);
     }
     return sorted[0];
}

function vecMaxAndMin(vec1, vec2) {
    if (vec1.length > vec2.length) return [vec1, vec2];
    if (vec2.length > vec1.length) return [vec2, vec1];
    for(let i = 0; i < vec1.length; i++){
        if (vec1[i] > vec2[i]) return [vec1, vec2];
        if (vec2[i] > vec1[i]) return [vec2, vec1];
    }
    return [vec1, vec2];
}

function vecDivide(big, small) {
    small = zeroDestuctor(small.map(elem => BigInt(elem)))[1];
    big = zeroDestuctor(big.map(elem => BigInt(elem)))[1];

    let current = big.slice(0, small.length);
    let plusToNext = big.slice(0, small.length - 1);
    let result = big.slice(0, big.length - small.length + 1);
    for(let i = 0; i < big.length - small.length + 1; i++){
        if (current[0] % small[0] != 0){
            let gcd = Math.gcd(current[0], small[0]);
            let factor = small[0] / gcd;
            return vecDivide(big.map(elem => elem * factor), small);
        }
        result[i] = current[0] / small[0];
        for(let j = 1; j < small.length; j++){
            plusToNext[j - 1] = current[j] - small[j] * result[i];
        }
        current = big.slice(i + 1, small.length + i + 1).map((elem, index) =>
            index < plusToNext.length ? plusToNext[index] : BigInt(elem)
        );
    }
    return [result, zeroDestuctor(plusToNext)[1]];
}