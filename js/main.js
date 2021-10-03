let inputE = document.getElementById("inputE")
let inputX = document.getElementById("inputX")
let inputY = document.getElementById("inputY")
let inputMultiply = document.getElementById("inputMultiply")
let applyButton = document.getElementById("applyButton")
let factorizeButton = document.getElementById("factorizeButton")
let minimizeButton = document.getElementById("minimizeButton")
let multiplyButton = document.getElementById("multiplyButton")

let inputA1 = document.getElementById("inputA1")
let inputB1 = document.getElementById("inputB1")
let inputA2 = document.getElementById("inputA2")
let inputB2 = document.getElementById("inputB2")
let inputMaxAcegj = document.getElementById("inputMaxACEGJ")
let acegjRandomButton = document.getElementById("randomButtonACEGJ")

let acegjButton = document.getElementById("applyButtonACEGJ")
let abehjButton = document.getElementById("applyButtonABEHJ")
let bdefhButton = document.getElementById("applyButtonBDEFH")
let abdejButton = document.getElementById("applyButtonABDEJ")
let abefhButton = document.getElementById("applyButtonABEFH")
let acdfhButton = document.getElementById("applyButtonACDFH")

let acefghButton = document.getElementById("applyButtonACEFGH")
let abdfhjButton = document.getElementById("applyButtonABDFHJ")

let inputC = document.getElementById("inputC")
let inputD = document.getElementById("inputD")
let inputMaxCD = document.getElementById("inputMaxCD")
let randomButtonCD = document.getElementById("randomButtonCD")
let solveFirstButton = document.getElementById("solveFirstButton")
let solveSecondButton = document.getElementById("solveSecondButton")
let solveThirdButton = document.getElementById("solveThirdButton")
let solveFourthButton = document.getElementById("solveFourthButton")

let c1Place = document.getElementById("E+x")
let s1Place = document.getElementById("E-x+y")
let c2Place = document.getElementById("E-y")
let s2Place = document.getElementById("E-x-y")
let ePlace = document.getElementById("E")
let s3Place = document.getElementById("E+x+y")
let c3Place = document.getElementById("E+y")
let s4Place = document.getElementById("E+x-y")
let c4Place = document.getElementById("E-x")

let placeArray = [c1Place, s1Place, c2Place, s2Place, ePlace, s3Place, c3Place, s4Place, c4Place]
let placeFormulas = [
    (E, x, y) => +E + (+x),
    (E, x, y) => +E - x + (+y),
    (E, x, y) => +E - y,
    (E, x, y) => +E - x - y,
    (E, x, y) => +E,
    (E, x, y) => +E + (+x) + (+y),
    (E, x, y) => +E + (+y),
    (E, x, y) => +E + (+x) - y,
    (E, x, y) => +E - x
]

let factorizationSwitch = false

applyButton.onclick = DrawCurrentSquare
factorizeButton.onclick = FactorizeCurrentSquare
minimizeButton.onclick = MinimizeValues
multiplyButton.onclick = () => {
    inputE.value *= inputMultiply.value
    inputX.value *= inputMultiply.value
    inputY.value *= inputMultiply.value
    UpdateSquare()
}

function UpdateSquare() {
    if (factorizationSwitch) factorizeButton.onclick()
    else applyButton.onclick()
}

function DrawCurrentSquare() {
    DrawSquare(inputE.value, inputX.value, inputY.value)
}

function FactorizeCurrentSquare() {
    DrawFactorizationSquare(inputE.value, inputX.value, inputY.value)
}

function MinimizeValues() {
    if (!Number.isInteger(+inputE.value) || !Number.isInteger(+inputX.value) || !Number.isInteger(+inputY.value)) return
    let gcd = Math.gcd(inputE.value, inputX.value, inputY.value)
    inputE.value /= gcd
    inputX.value /= gcd
    inputY.value /= gcd

    UpdateSquare()
}

function DrawSquare(E, x, y) {
    for (let i = 0; i < 9; i++) {
        placeArray[i].innerText = placeFormulas[i](E, x, y)
    }
    factorizationSwitch = false
}

function DrawFactorizationSquare(E, x, y) {
    for (let i = 0; i < 9; i++) {
        placeArray[i].innerText = Factorization(placeFormulas[i](E, x, y))
    }
    factorizationSwitch = true
}

acegjRandomButton.onclick = RandomACEGJ

function RandomACEGJ() {
    let a = Random(2, +inputMaxAcegj.value)
    let b = Random(1, a - 1)
    let gcd = Math.gcd(a, b)
    a /= gcd
    b /= gcd
    let c = Random(2, +inputMaxAcegj.value)
    let d = Random(1, c - 1)
    gcd = Math.gcd(c, d)
    c /= gcd
    d /= gcd
    inputA1.value = a
    inputA2.value = c
    inputB1.value = b
    inputB2.value = d
}

function Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

acegjButton.onclick = CalculateCurrentByACEGJ
abehjButton.onclick = CalculateCurrentByABEHJ
bdefhButton.onclick = CalculateCurrentByBDEFH
abdejButton.onclick = CalculateCurrentByABDEJ
abefhButton.onclick = CalculateCurrentByABEFH
acdfhButton.onclick = CalculateCurrentByACDFH
acefghButton.onclick = CalculateCurrentByACEFGH
abdfhjButton.onclick = CalculateCurrentByABDFHJ

function CalculateCurrentByACEGJ() {
    CalculateValuesByACEGJ(inputA1.value, inputB1.value, inputA2.value, inputB2.value)
    UpdateSquare()
}

function CalculateCurrentByABEHJ() {
    CalculateValuesByABEHJ(inputA1.value, inputB1.value, inputA2.value, inputB2.value)
    UpdateSquare()
}

function CalculateCurrentByBDEFH() {
    CalculateValuesByBDEFH(inputA1.value, inputB1.value, inputA2.value, inputB2.value)
    UpdateSquare()
}

function CalculateCurrentByABDEJ() {
    CalculateValuesByABDEJ(inputA1.value, inputB1.value, inputA2.value, inputB2.value)
    UpdateSquare()
}

function CalculateCurrentByABEFH() {
    CalculateValuesByABEFH(inputA1.value, inputB1.value, inputA2.value, inputB2.value)
    UpdateSquare()
}

function CalculateCurrentByACDFH() {
    CalculateValuesByACDFH(inputA1.value, inputB1.value, inputA2.value, inputB2.value)
    UpdateSquare()
}

function CalculateCurrentByACEFGH() {
    CalculateValuesByACEFGH(inputA1.value, inputB1.value, inputA2.value, inputB2.value)
    UpdateSquare()
}

function CalculateCurrentByABDFHJ() {
    CalculateValuesByABDFHJ(inputA1.value, inputB1.value, inputA2.value, inputB2.value)
    UpdateSquare()
}

function CalculateValuesByACEGJ(a1, b1, a2, b2) {
    E = GetE(a1, b1, a2, b2)
    inputE.value = E * E
    inputX.value = DirxE(a1, b1, E)
    inputY.value = DirxE(a2, b2, E)
}

function CalculateValuesByABEHJ(a1, b1, a2, b2) {
    E = GetE(a1, b1, a2, b2)
    inputE.value = E * E
    inputX.value = DirxE(a1, b1, E)
    inputY.value = DirxE(a2, b2, E) + (+inputX.value)
}

function CalculateValuesByBDEFH(a1, b1, a2, b2) {
    E = GetE(a1, b1, a2, b2)
    let dir1 = DirxE(a1, b1, E)
    let dir2 = DirxE(a2, b2, E)
    inputE.value = E * E
    inputX.value = (dir1 + dir2) / 2
    inputY.value = (dir1 - dir2) / 2
}

function CalculateValuesByABDEJ(a1, b1, a2, b2) {
    let fmn1 = Fmn(a1, b1)
    let fmn2 = Fmn(a2, b2)
    let sum1 = SquareSumSquares(a1, b1)
    let sum2 = SquareSumSquares(a2, b2)

    let E = sum1 * sum2

    inputE.value = E
    inputX.value = 4 * fmn1 * sum2
    inputY.value = 4 * fmn2 * (sum1 - 4 * fmn1)
}

function CalculateValuesByABEFH(a1, b1, a2, b2) {
    let fmn1 = Fmn(a1, b1)
    let fmn2 = Fmn(a2, b2)
    let sum1 = SquareSumSquares(a1, b1)
    let sum2 = SquareSumSquares(a2, b2)

    let diff1 = sum1 - 4 * fmn1
    let diff2 = sum2 - 4 * fmn2

    let E = sum1 * diff2
    let x = 4 * (fmn2 * sum1 - fmn1 * sum2)
    let y = 4 * fmn2 * diff1

    inputE.value = E
    inputX.value = x
    inputY.value = y
}

function CalculateValuesByACDFH(a1, b1, a2, b2) {
    let fmn1 = Fmn(a1, b1)
    let fmn2 = Fmn(a2, b2)
    let sum1 = SquareSumSquares(a1, b1)
    let sum2 = SquareSumSquares(a2, b2)

    let E = sum1 * sum2 + 16 * fmn1 * fmn2
    let x = 4 * fmn1 * sum2 - 16 * fmn1 * fmn2
    let y = 4 * fmn2 * sum1 + 16 * fmn1 * fmn2

    inputE.value = E
    inputX.value = x
    inputY.value = y
}

function CalculateValuesByACEFGH(a1, b1, a2, b2) {
    let fmn1 = Fmn(a1, b1)
    let fmn2 = Fmn(a2, b2)
    let sum1 = SquareSumSquares(a1, b1)
    let sum2 = SquareSumSquares(a2, b2)
    let gcdFmn = Math.gcd(fmn1, fmn2)
    let gcdSum = Math.gcd(sum1, sum2)

    let E = fmn1 * sum2 / gcdFmn
    let A = fmn2 * sum1 / gcdFmn
    let y = 4 * fmn2 * E / sum2

    inputE.value = E
    inputX.value = A - E
    inputY.value = y
}

function CalculateValuesByABDFHJ(a1, b1, a2, b2) {
    let fmn1 = Fmn(a1, b1)
    let fmn2 = Fmn(a2, b2)
    let sum1 = SquareSumSquares(a1, b1)
    let sum2 = SquareSumSquares(a2, b2)
    let gcdFmn = Math.gcd(fmn1, fmn2)
    let gcdSum = Math.gcd(sum1, sum2)

    let B = fmn2 * sum1 / gcdFmn
    let A = fmn1 * sum2 / gcdFmn
    let y = 4 * fmn1 * B / sum1

    inputE.value = (+A + (+B)) / 2
    inputX.value = (A - B) / 2
    inputY.value = y
}

function GetE(a1, b1, a2, b2) {
    let sum1 = a1 * a1 + b1 * b1
    let sum2 = a2 * a2 + b2 * b2
    let gcd = Math.gcd(sum1, sum2)
    let E = sum1 * sum2 / gcd
    E = reduce(E, 2)
    return E
}

function DirxE(a, b, E) {
    let v = E / (a * a + b * b)
    return 4 * a * b * (a * a - b * b) * v * v
}

solveFirstButton.onclick = () => Solve1(inputC.value, inputD.value)
solveSecondButton.onclick = () => Solve2(inputC.value, inputD.value)
solveThirdButton.onclick = () => Solve3(inputC.value, inputD.value)
solveFourthButton.onclick = () => Solve4(inputC.value, inputD.value)

randomButtonCD.onclick = () => {
    let c = Random(2, inputMaxCD.value)
    let d = Random(1, inputMaxCD.value)
    let gcd = Math.gcd(c, d)
    inputC.value = c /= gcd
    inputD.value = d /= gcd
}

function Solve1(c, d) { //tf(2a, a+b) = tf(a, b)
    let a1 = c ** 2 - 2 * d ** 2
    let b1 = 6 * d ** 2
    let gcd = Math.gcd(a1, b1)

    inputA1.value = a1 / gcd
    inputB1.value = b1 / gcd
    inputA2.value = 2 * a1 / gcd
    inputB2.value = (+a1 + (+b1)) / gcd
}

function Solve2(c, d) { //tf(2a, a-b) = tf(a, b)
    let a1 = c ** 2 + 2 * d ** 2
    let b1 = 6 * d ** 2
    let gcd = Math.gcd(a1, b1)

    inputA1.value = a1 / gcd
    inputB1.value = b1 / gcd
    inputA2.value = 2 * a1 / gcd
    inputB2.value = (+a1 - (+b1)) / gcd
}

function Solve3(c, d) { //tf(a+b, b) = tf(a, b)
    let a1 = c ** 2 + 2 * d ** 2
    let b1 = c ** 2 - d ** 2
    let gcd = Math.gcd(a1, b1)

    inputA1.value = a1 / gcd
    inputB1.value = b1 / gcd
    inputA2.value = (+a1 + (+b1)) / gcd
    inputB2.value = b1 / gcd
}

function Solve4(m, n) { //f(a, b) = f(b, c)
    let mn = m * n
    let mm = m * m
    let nn = n * n
    let a = Math.abs(3 * nn - 2 * mn)
    let b = Math.abs(mm + 3 * nn - 3 * mn)
    let c = Math.abs(2 * mn - mm)

    inputA1.value = Math.max(a, b)
    inputB1.value = Math.min(a, b)
    inputA2.value = Math.max(b, c)
    inputB2.value = Math.min(b, c)
}

function t(n) {
    let k = n;
    for(let i = 2; i*i <= Math.abs(n); i++){
        while (k % (i*i) == 0) k /= (i*i);
    }
    return +k;
}

function first(m, n) {
    return m**4 - 6* n**2 * m**2 + n**4;
}

function second(m, n) {
    return m**4 + 4 * n**4;
}

function third(m, n) {
    return m**4 + 6 * m**2 * n**2 + n**4;
}

function printFor(func, z) {
    let str = ``;
    for (let m = 1; m < z; m++){
        for (let n = 1; n <= m; n++){
            if (Math.gcd(m, n) != 1) continue;
            let x = Math.abs(func(m, n));
            str += `${m} ${n}: ${Factorization(x)}, ${Factorization(t(x))} 
`;
        }
    }
    console.log(str);
}

function printFmnFor(y, z) {
    let str = ``;
    for (let a = y; a < z; a++){
        for (let b = 1; b < a; b++){
            let f1 = Fmn(a,b)
            for (let c = 1; c < a; c++){
                for (let d = 1; d < c; d++){
                    if (a == d || b == c || b == d || a-b == c+d || a+b == c+d) continue;
                    if (a % 2 == b % 2 && c % 2 == d % 2) continue;
                    if (Math.gcd(Math.gcd(a,b), Math.gcd(c, d)) != 1) continue;
                    let f2 = Fmn(c, d);
                    if (f1 == f2) str += `f(${a}, ${b}) = f(${c}, ${d})
`;
                }
            }
        }
    }
    console.log(str);
}

let f = (a, b) => a*b*(a**2 - b**2);
let g = (a, b) => a*b*(a**2 + b**2);

function Fmns(min, max){
    let fmns = [];
    for(let i = min; i < max; i++){
        for(let j = 1; j < i; j++){
            if (Math.gcd(i, j) == 1) fmns.push([i, j, f(i,j)]);
        }
    }
    return fmns;
}

function Gmns(min, max){
    let gmns = [];
    for(let i = min; i < max; i++){
        for(let j = 1; j < i; j++){
            if (Math.gcd(i, j) == 1) gmns.push([i, j, g(i,j)]);
        }
    }
    return gmns;
}

function compareAndPrint(){
    str = ``;
    for (let i = 0; i < fmns.length; i++){
        for (let j = 0; j < gmns.length; j++){
            if (fmns[i][2] == gmns[j][2]){
                str += `f(${fmns[i][0]}, ${fmns[i][1]}) = g(${gmns[j][0]}, ${gmns[j][1]})
`;
            }
        }
    }
    console.log(str);
}