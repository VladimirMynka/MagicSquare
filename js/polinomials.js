class Trinomial {
    constructor(koeffs) {
        this.koeffs = [0, 0, 0]
        for (let i = 0; i < 3; i++) {
            this.koeffs[i] = +koeffs[i];
        }
    }

    copy() {
        return new Trinomial(this.koeffs);
    }

    plus(other) {
        let sum = this.copy();
        for (let i = 0; i < 3; i++) {
            sum.koeffs[i] += +(other.koeffs[i]);
        }
        return sum;
    }

    multiply(number) {
        let multi = this.copy();
        multi.koeffs = multi.koeffs.map((x) => x * number);
        return multi;
    }

    minus(other) {
        let diff = this.copy();
        for (let i = 0; i < 3; i++) {
            diff.koeffs[i] -= +(other.koeffs[i]);
        }
        return diff;
    }

    equal(other) {
        for (let i = 0; i < 3; i++) {
            if (this.koeffs[i] != other.koeffs[i]) return false;
        }
        return true;
    }

    collect() {
        let a = this.koeffs[0];
        let b = this.koeffs[1];
        let c = this.koeffs[2];
        let gcd = Math.gcd(a, b, c);
        a /= gcd;
        b /= gcd;
        c /= gcd;

        if (a < 0 || (a == 0 && b < 0) || (a == 0 && b == 0 && c < 0)){
            a *= -1;
            b *= -1;
            c *= -1;
            gcd *= -1;
        }

        if (a == 0) return [gcd, [b, c], [0, 1]];

        let D = b * b - 4 * a * c;
        if (D < 0) return [gcd, [a, b, c]];

        let d = Math.sqrt(D);
        if (!Number.isInteger(d)) return [gcd, [a, b, c]];

        let x1 = (b + d) / 2;
        let x2 = (b - d) / 2;

        let gcd1 = Math.gcd(a, x1);
        let gcd2 = Math.gcd(a, x2);

        return [gcd, [a / gcd1, x1 / gcd1], [a / gcd2, x2 / gcd2]];
    }

    scollect() {
        let str;
        let coll = this.collect();
        if (coll.length == 2) {
            str = pc(coll[0], `(${pc(coll[1][0], "x\u00b2")}${pc(coll[1][1], "xy")}${pc(coll[1][2], "y\u00b2")})`);
        }
        else {
            str = pc(coll[0], `(${pc(coll[1][0], "x") + pc(coll[1][1], "y")})(${pc(coll[2][0], "y") + pc(coll[2][1], "y")})`);
        }
        return str;
    }

    toString() {
        if (this.koeffs[0] != 0) 
            return `${nc(this.koeffs[0], "x\u00b2")}${pc(this.koeffs[1], "xy")}${pc(this.koeffs[2], "y\u00b2")}`;
        if (this.koeffs[1] != 0) 
            return `${nc(this.koeffs[0], "x\u00b2")}${nc(this.koeffs[1], "xy")}${pc(this.koeffs[2], "y\u00b2")}`;
        return `${nc(this.koeffs[0], "x\u00b2")}${nc(this.koeffs[1], "xy")}${nc(this.koeffs[2], "y\u00b2")}`;
    }

    gcdWith(other) {
        let thisColl = this.collect();
        let otherColl = other.collect();
        let gcd = [Math.gcd(thisColl[0], otherColl[0])];
        if (thisColl.length != otherColl.length) return gcd;

        if (thisColl.length == 2){
            if (arrEqual(thisColl[1], otherColl[1])) gcd.push(thisColl[1].slice());
            return gcd;
        }

        let check1 = arrEqual(thisColl[1], otherColl[1]);
        let check2 = arrEqual(thisColl[1], otherColl[2]);
        let check3 = arrEqual(thisColl[2], otherColl[1]);
        let check4 = arrEqual(thisColl[2], otherColl[2]);

        if (check1){
            gcd.push(thisColl[1].slice());
            if (check4) gcd.push(thisColl[2].slice()); 
            return gcd;
        }
        if (check2){
            gcd.push(thisColl[1].slice());
            if (check3) gcd.push(thisColl[2].slice()); 
            return gcd;
        }
        if (check3 || check4){ 
            gcd.push(thisColl[2].slice()); 
        }
        return gcd;
    }

    calculate(x, y){
        return this.koeffs[0] * x * x + this.koeffs[1] * x * y + this.koeffs[2] * y * y;
    }
}

function fmnWithTrs(a, b) {
    let x = [];
    x.push(a.collect());
    x.push(b.collect());
    x.push((a.plus(b)).collect());
    x.push((a.minus(b)).collect());

    let n = 1;
    let binoms = [];
    let trinoms = [];
    for (let i = 0; i < x.length; i++) {
        n *= x[i][0];
        if (x[i].length == 2) trinoms.push(x[i][1]);
        else {
            binoms.push(x[i][1]);
            binoms.push(x[i][2]);
        }
    }

    return [n, binoms.sort(compare), trinoms.sort(compare)];
}

function sfmnWithTrs(smth) {
    let x = smth;
    let str = ``;
    for (let i = 0; i < x[1].length; i++) {
        if (x[1][i][0] != 0) str += `(${nc(x[1][i][0], "x")}${pc(x[1][i][1], "y")})`;
        else str += `(${nc(x[1][i][0], "x")}${nc(x[1][i][1], "y")})`;
    }
    for (let i = 0; i < x[2].length; i++) {
        if (x[2][i][0] != 0) str += `(${nc(x[2][i][0], "x\u00b2")}${pc(x[2][i][1], "xy")}${pc(x[2][i][2], "y\u00b2")})`;
        else if (x[2][i][1] != 0) str += `(${nc(x[2][i][0], "x\u00b2")}${nc(x[2][i][1], "xy")}${pc(x[2][i][2], "y\u00b2")})`;
        else str += `(${nc(x[2][i][0], "x\u00b2")}${nc(x[2][i][1], "xy")}${nc(x[2][i][2], "y\u00b2")})`;
    }

    return nc(factorization(x[0]), str);
}

function pc(n, str) { //print checker
    if (n == 0) return "";
    if (n == 1) return `+${str}`;
    if (n == -1) return `-${str}`;
    if (n < 0) return `${n}${str}`;
    return `+${n}${str}`;
}

function nc(n, str) { //print checker
    if (n == 0) return "";
    if (n == 1) return `${str}`;
    if (n == -1) return `-${str}`;
    if (n < 0) return `${n}${str}`;
    return `${n}${str}`;
}

function tfmnWithTrs(a, b) {
    let x = fmnWithTrs(a, b);
    let n = t(x[0]);
    let binoms = [];
    let binomsChecks = x[1].map((x) => false);
    let trinoms = [];
    let trinomsChecks = x[2].map((x) => false);
    for (let i = 0; i < x[1].length; i++) {
        if (binomsChecks[i]) continue;
        let isOdd = true;
        binomsChecks[i] = true;
        for (let j = i + 1; j < x[1].length; j++) {
            if (!arrEqual(x[1][i], x[1][j])) continue;
            binomsChecks[j] = true;
            isOdd = !isOdd;
        }
        if (isOdd) binoms.push(x[1][i].slice());
    }
    for (let i = 0; i < x[2].length; i++) {
        if (trinomsChecks[i]) continue;
        let isOdd = true;
        trinomsChecks[i] = true;
        for (let j = i + 1; j < x[2].length; j++) {
            if (!arrEqual(x[2][i], x[2][j])) continue;
            trinomsChecks[j] = true;
            isOdd = !isOdd;
        }
        if (isOdd) trinoms.push(x[2][i].slice());
    }

    return [n, binoms.sort(compare), trinoms.sort(compare)];
}

function arrEqual(arr1, arr2, func = (a, b) => (a == b)) {
    if (arr1.length != arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (!func(arr1[i], arr2[i])) return false;
    }
    return true;
}

function arrOpposite(arr1, arr2) {
    if (arr1.length != arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != -arr2[i]) return false;
    }
    return true;
}

function compare(a, b) {
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    let asum = 0;
    let bsum = 0;
    let result = 0;
    for(let i = 0; i < a.length; i++){
        asum += Math.abs(a[i]);
        bsum += Math.abs(b[i]);
        if (result == 0){
            if (a[i] > b[i]) result = 1;
            else if (a[i] < b[i]) result = -1;
        }
    }
    if (asum > bsum) return 1;
    if (asum < bsum) return -1;
    return result;
}

function printTfmns(tfmns) {
    let str = "";
    for (let i = 0; i < tfmns.length; i++){
        str += strTriple(tfmns[i]);
    }
    console.log(str);
}

function getTfmns(min, max) {
    let arr = [];
    let trNull = new Trinomial([0,0,0]);
    for (let sum = min; sum <= max; sum++){
        for (let a = sum; a >= 0; a--){
            for (let b = sum - a; b >= 0; b--){
                for (let c = sum - a - b; c >= 0; c--){
                    for (let d = sum - a - b - c; d >= 0; d--){
                        for (let e = sum - a - b - c - d; e >= 0; e--){
                            let f = sum - a - b - c - d - e;
                            if (!checkAnyReason(a, b, c, d, e, f)) continue;

                            let tr1 = new Trinomial([a, b, c]);
                            let tr2 = new Trinomial([d, e, f]);

                            if (tr1.equal(tr2) || tr1.equal(trNull) || tr2.equal(trNull)) continue;

                            let gcd = tr1.gcdWith(tr2);
                            if (gcd.length == 1 && gcd[0] == 1) arr.push(getTriple(tr1, tr2));

                            if ((d == 0 && e == 0) || (d == 0 && f == 0) || (e == 0 && f == 0)) continue;

                            let tr3 = new Trinomial([a, b, -c]);
                            let tr4 = new Trinomial([d, e, -f]);

                            gcd = tr3.gcdWith(tr4);
                            if (gcd.length == 1 && gcd[0] == 1) arr.push(getTriple(tr3, tr4));

                            if (c != 0 && f != 0){ 
                                gcd = tr3.gcdWith(tr2);
                                if (gcd.length == 1 && gcd[0] == 1) arr.push(getTriple(tr3, tr2));
                                gcd = tr1.gcdWith(tr4);
                                if (gcd.length == 1 && gcd[0] == 1) arr.push(getTriple(tr1, tr4));
                            }
                        }
                    }
                }
            }
        }
    }
    return arr;
}

function strTriple(triple){
    return `tf(${triple[0].toString()}, ${triple[1].toString()}) = ${sfmnWithTrs(triple[2])}
`;
}

function getTriple(tr1, tr2){
    return [tr1, tr2, tfmnWithTrs(tr1, tr2)];
}

function checkAnyReason(a, b, c, d, e, f){
    if (a == 0 && d == 0) return false;
    if (c == 0 && f == 0) return false;
    if (a + b + c < d + e + f) return false;
    if ((a + d) % 2 == 0 && (b + e) % 2 == 0 && (c + f) % 2 == 0) return false; 
    if (Math.gcd(a, b, c, d, e, f) != 1) return false;
    return true;
}

function searchEquals(tfmns, max = tfmns.length){
    let equals = [];
    for (let i = 1; i < max; i++){
        for (let j = i - 1; j >= 0; j--){
            if (tfmns[i][2][0] != tfmns[j][2][0]) continue;
            if (!arrEqual(tfmns[i][2][1], tfmns[j][2][1], arrEqual)) continue;
            if (!arrEqual(tfmns[i][2][2], tfmns[j][2][2], arrEqual)) continue;
            equals.push([tfmns[i], tfmns[j]]);
        }
    }
    return equals;
}

function equalToString(equal) {
    return `tf(${equal[0][0].toString()}, ${equal[0][1].toString()}) = tf(${equal[1][0].toString()}, ${equal[1][1].toString()})
`;
}

function printEquals(equals) {
    let str = ``;
    for (let i = 0; i < equals.length; i++){
        str += equalToString(equals[i]);
    }
    console.log(str);
}

function vecMultiply(){
    if (arguments.length == 1) return arguments[0];
    if (arguments.length == 2){
        let arr = [];
        for (let i = 0; i < arguments[0].length + arguments[1].length - 1; i++) arr.push(0n);
        for (let i = 0; i < arguments[0].length; i++){
            for (let j = 0; j < arguments[1].length; j++){
                arr[i+j] += BigInt(arguments[0][i]) * BigInt(arguments[1][j]);
            }
        }
        return arr;
    }
    
    let arr = vecMultiply(arguments[0], arguments[1]);
    for (let i = 2; i < arguments.length; i++){
        arr = vecMultiply(arr, arguments[i]);
    }
    return arr;
}

function vecRatio(){
    if (arguments[0] == null) return null;
    if (arguments.length == 1) return arguments[0];
    if (arguments.length == 2){
        let arr1 = zeroDestuctor(arguments[0]);
        let arr2 = zeroDestuctor(arguments[1]);
        if (arr1[0] < arr2[0]) return null;

        let arr = [];
        let helper = arr1[1].slice(0, arr2[1].length);
        for (let i = 0; i < arr1[1].length - arr2[1].length; i++){
            let n = helper[0] / arr2[1][0];
            if (Number.isInteger(n) == false) return null;
            arr.push(n);
            for (var j = 0; j < arr2[1].length - 1; j++){
                helper[j] = helper[j + 1] - n * arr2[1][j + 1];
            }
            helper[j] = arr1[1][i+j+1];
        }
        let n = helper[0] / arr2[1][0];
        if (Number.isInteger(n) == false) return null;
        for (let i = 0; i < arr2[1].length; i++){
            if (divWithZeros(helper[i], arr2[1][i], n) != n) return null;
        }
        arr.push(n);

        let zeroArr = [];
        for(let i = 0; i < arr1[0] - arr2[0]; i++) zeroArr.push(0);
        return zeroArr.concat(arr);
    }
    
    let arr = vecRatio(arguments[0], arguments[1]);
    for (let i = 2; i < arguments.length; i++){
        arr = vecRatio(arr, arguments[i]);
    }
    return arr;
}

function zeroDestuctor(arr){
    let i = 0;
    while (arr[i] == 0){
        i++;
    }
    return [i, arr.slice(i)];
}

function divWithZeros(a, b, n){// 0/0 = n
    if (b != 0) return a / b;
    if (a == 0) return n;
    return NaN;
}

function vecDifference(){
    let length = arguments[0].length;
    for (const arr of arguments) {
        if (arr.length != length) return null;
    }

    let arr = arguments[0].slice();
    for (let i = 0; i < arr.length; i++){
        for (let j = 1; j < arguments.length; j++){
            arr[i] -= arguments[j][i];
        }
    }
    return arr;
}

function vecSum(){
    let length = arguments[0].length;
    for (const arr of arguments) {
        if (arr.length != length) return null;
    }

    let arr = arguments[0].slice();
    for (let i = 0; i < arr.length; i++){
        for (let j = 1; j < arguments.length; j++){
            arr[i] += arguments[j][i];
        }
    }
    return arr;
}

function vecPrint(arr, step = 1){
    let str = ``;
    str += nc(arr[0], `x${makeSuperscript(step * (arr.length - 1))}`);
    for (let i = 1; i < arr.length - 1; i++){
        str += pc(arr[i], `x${makeSuperscript(step * (arr.length - 1 - i))}y${makeSuperscript(step * i)}`);
    }
    str += pc(arr[arr.length - 1], `y${makeSuperscript(step * (arr.length - 1))}`);
    console.log(str);
}