let inputE = document.getElementById("inputE")
let inputX = document.getElementById("inputX")
let inputY = document.getElementById("inputY")
let inputMultiply = document.getElementById("inputMultiply")
let applyButton = document.getElementById("applyButton")
let factorizeButton = document.getElementById("factorizeButton")
let minimizeButton = document.getElementById("minimizeButton")
let leftRotateButton = document.getElementById("leftRotateButton")
let rightRotateButton = document.getElementById("rightRotateButton")
let mirrorButton = document.getElementById("mirrorButton")
let multiplyButton = document.getElementById("multiplyButton")

let inputA1 = document.getElementById("inputA1")
let inputB1 = document.getElementById("inputB1")
let inputA2 = document.getElementById("inputA2")
let inputB2 = document.getElementById("inputB2")
let swapButton1 = document.getElementById("swapButton1")
let swapButton2 = document.getElementById("swapButton2")
let bigSwapButton = document.getElementById("bigSwapButton")
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
let swapCdButton = document.getElementById("swapCdButton")
let inputMaxCD = document.getElementById("inputMaxCD")
let randomButtonCD = document.getElementById("randomButtonCD")
let solveFirstButton = document.getElementById("solveFirstButton")
let solveSecondButton = document.getElementById("solveSecondButton")
let solveThirdButton = document.getElementById("solveThirdButton")
let solveFourthButton = document.getElementById("solveFourthButton")
let solveSevenButton = document.getElementById("solveSevenButton")

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
    (E, x, y) => BigInt(E) + BigInt(x),
    (E, x, y) => BigInt(E) - BigInt(x) + BigInt(y),
    (E, x, y) => BigInt(E) - BigInt(y),
    (E, x, y) => BigInt(E) - BigInt(x) - BigInt(y),
    (E, x, y) => BigInt(E),
    (E, x, y) => BigInt(E) + BigInt(x) + BigInt(y),
    (E, x, y) => BigInt(E) + BigInt(y),
    (E, x, y) => BigInt(E) + BigInt(x) - BigInt(y),
    (E, x, y) => BigInt(E) - BigInt(x)
]

let factorizationSwitch = false
let lastClickGroup1 = acegjButton;
let lastClickGroup2 = solveFirstButton;

applyButton.onclick = DrawCurrentSquare
factorizeButton.onclick = FactorizeCurrentSquare
minimizeButton.onclick = MinimizeValues
multiplyButton.onclick = () => {
    let factor = BigInt(inputMultiply.value);
    inputE.value = (BigInt(inputE.value) * factor).toString();
    inputX.value = (BigInt(inputX.value) * factor).toString();
    inputY.value = (BigInt(inputY.value) * factor).toString();
    UpdateSquare();
}
leftRotateButton.onclick = () => {
    let temp = inputX.value;
    inputX.value = -inputY.value;
    inputY.value = temp;
    UpdateSquare();
}
rightRotateButton.onclick = () => {
    let temp = inputX.value;
    inputX.value = inputY.value;
    inputY.value = -temp;
    UpdateSquare();
}
mirrorButton.onclick = () => {
    let temp = inputX.value;
    inputX.value = inputY.value;
    inputY.value = temp;
    UpdateSquare();
}

function UpdateSquare() {
    if (factorizationSwitch) factorizeButton.click();
    else applyButton.click();
}

function DrawCurrentSquare() {
    DrawSquare(inputE.value, inputX.value, inputY.value)
}

function FactorizeCurrentSquare() {
    DrawFactorizationSquare(inputE.value, inputX.value, inputY.value)
}

function MinimizeValues() {
    let E = BigInt(inputE.value);
    let x = BigInt(inputX.value);
    let y = BigInt(inputY.value);
    let gcd = Math.gcd(E, x, y)
    inputE.value = (E / gcd).toString();
    inputX.value = (x / gcd).toString();
    inputY.value = (y / gcd).toString();

    UpdateSquare();
}

function DrawSquare(E, x, y) {
    let px = 180 * (div(placeFormulas[5](E, x, y).toString().length, 15) + 1) + 'px';
    for (let i = 0; i < 9; i++) {
        let number = placeFormulas[i](E, x, y);
        placeArray[i].innerText = number;
        placeArray[i].style.width = px;
        placeArray[i].style.lineHeight = px;
        placeArray[i].style.height = px;
        if (isSquare(number)) placeArray[i].classList.add("red");
        else placeArray[i].classList.remove("red");
    }
    factorizationSwitch = false
}

function DrawFactorizationSquare(E, x, y) {
    for (let i = 0; i < 9; i++) {
        let number = placeFormulas[i](E, x, y);
        placeArray[i].innerText = factorization(number);
        if (isSquare(number)) placeArray[i].classList.add("red");
        else placeArray[i].classList.remove("red");
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

    lastClickGroup1.onclick()
}

function Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let buttonGroup1 = [
    acegjButton,
    abehjButton,
    bdefhButton,
    abdejButton,
    abefhButton,
    acdfhButton,
    acefghButton,
    abdfhjButton
]

function CalculateCurrentBy(func, button) {
    return () => {func(inputA1.value, inputB1.value, inputA2.value, inputB2.value)
    UpdateSquare()
    lastClickGroup1 = button}
}

let functionGroup1 = [
    CalculateValuesByACEGJ,
    CalculateValuesByABEHJ,
    CalculateValuesByBDEFH,
    CalculateValuesByABDEJ,
    CalculateValuesByABEFH,
    CalculateValuesByACDFH,
    CalculateValuesByACEFGH,
    CalculateValuesByABDFHJ
]

for(let i = 0; i < buttonGroup1.length; i++){
    buttonGroup1[i].onclick = CalculateCurrentBy(functionGroup1[i], buttonGroup1[i]);
}

function CalculateValuesByACEGJ(a1, b1, a2, b2) {
    a1 = BigInt(a1);
    b1 = BigInt(b1);
    a2 = BigInt(a2);
    b2 = BigInt(b2);

    let E = GetE(a1, b1, a2, b2)
    inputE.value = E * E;
    inputX.value = DirxE(a1, b1, E);
    inputY.value = DirxE(a2, b2, E);
}

function CalculateValuesByABEHJ(a1, b1, a2, b2) {
    a1 = BigInt(a1);
    b1 = BigInt(b1);
    a2 = BigInt(a2);
    b2 = BigInt(b2);

    let E = GetE(a1, b1, a2, b2)
    inputE.value = E * E
    inputX.value = DirxE(a1, b1, E)
    inputY.value = DirxE(a2, b2, E) + BigInt(inputX.value)
}

function CalculateValuesByBDEFH(a1, b1, a2, b2) {
    a1 = BigInt(a1);
    b1 = BigInt(b1);
    a2 = BigInt(a2);
    b2 = BigInt(b2);

    let E = GetE(a1, b1, a2, b2)
    let dir1 = DirxE(a1, b1, E)
    let dir2 = DirxE(a2, b2, E)
    inputE.value = E * E
    inputX.value = (dir1 + dir2) / 2n
    inputY.value = (dir1 - dir2) / 2n
}

function CalculateValuesByABDEJ(a1, b1, a2, b2) {
    a1 = BigInt(a1);
    b1 = BigInt(b1);
    a2 = BigInt(a2);
    b2 = BigInt(b2);

    let fmn1 = fmn(a1, b1)
    let fmn2 = fmn(a2, b2)
    let sum1 = squareSumSquares(a1, b1)
    let sum2 = squareSumSquares(a2, b2)

    let E = sum1 * sum2

    inputE.value = E
    inputX.value = 4n * fmn1 * sum2
    inputY.value = 4n * fmn2 * (sum1 - 4n * fmn1)
}

function CalculateValuesByABEFH(a1, b1, a2, b2) {
    a1 = BigInt(a1);
    b1 = BigInt(b1);
    a2 = BigInt(a2);
    b2 = BigInt(b2);

    let fmn1 = fmn(a1, b1)
    let fmn2 = fmn(a2, b2)
    let sum1 = squareSumSquares(a1, b1)
    let sum2 = squareSumSquares(a2, b2)

    let diff1 = sum1 - 4n * fmn1
    let diff2 = sum2 - 4n * fmn2

    let E = sum1 * diff2
    let x = 4n * (fmn2 * sum1 - fmn1 * sum2)
    let y = 4n * fmn2 * diff1

    inputE.value = E
    inputX.value = x
    inputY.value = y
}

function CalculateValuesByACDFH(a1, b1, a2, b2) {
    a1 = BigInt(a1);
    b1 = BigInt(b1);
    a2 = BigInt(a2);
    b2 = BigInt(b2);

    let fmn1 = fmn(a1, b1)
    let fmn2 = fmn(a2, b2)
    let sum1 = squareSumSquares(a1, b1)
    let sum2 = squareSumSquares(a2, b2)

    let E = sum1 * sum2 + 16n * fmn1 * fmn2
    let x = 4n * fmn1 * sum2 - 16n * fmn1 * fmn2
    let y = 4n * fmn2 * sum1 + 16n * fmn1 * fmn2

    inputE.value = E
    inputX.value = x
    inputY.value = y
}

function CalculateValuesByACEFGH(a1, b1, a2, b2) {
    a1 = BigInt(a1);
    b1 = BigInt(b1);
    a2 = BigInt(a2);
    b2 = BigInt(b2);

    let fmn1 = fmn(a1, b1)
    let fmn2 = fmn(a2, b2)
    let sum1 = squareSumSquares(a1, b1)
    let sum2 = squareSumSquares(a2, b2)
    let gcdFmn = Math.gcd(fmn1, fmn2)

    let E = fmn1 * sum2 / gcdFmn
    let A = fmn2 * sum1 / gcdFmn
    let y = 4n * fmn2 * E / sum2

    inputE.value = E
    inputX.value = A - E
    inputY.value = y
}

function CalculateValuesByABDFHJ(a1, b1, a2, b2) {
    a1 = BigInt(a1);
    b1 = BigInt(b1);
    a2 = BigInt(a2);
    b2 = BigInt(b2);

    let fmn1 = fmn(a1, b1)
    let fmn2 = fmn(a2, b2)
    let sum1 = squareSumSquares(a1, b1)
    let sum2 = squareSumSquares(a2, b2)
    let gcdFmn = Math.gcd(fmn1, fmn2)

    let B = fmn2 * sum1 / gcdFmn
    let A = fmn1 * sum2 / gcdFmn
    let y = 4n * fmn1 * B / sum1

    if ((A + B) % 2n === 1n){
        A *= 4n;
        B *= 4n;
        y *= 4n;
    } 

    inputE.value = (A + B) / 2n
    inputX.value = (A - B) / 2n
    inputY.value = y
}

let buttonGroup2 = [
    solveFirstButton,
    solveSecondButton,
    solveThirdButton,
    solveFourthButton,
    solveSevenButton
]

function SolveBy(func, button) {
    return () => {func(inputC.value, inputD.value)
    acefghButton.click();
    lastClickGroup2 = button}
}

let functionGroup2 = [
    Solve1,
    Solve2,
    Solve3,
    Solve4,
    Solve7
]

for(let i = 0; i < buttonGroup2.length; i++){
    buttonGroup2[i].onclick = SolveBy(functionGroup2[i], buttonGroup2[i]);
}

randomButtonCD.onclick = () => {
    let c = Random(2, inputMaxCD.value)
    let d = Random(1, inputMaxCD.value)
    let gcd = Math.gcd(c, d)
    inputC.value = c / gcd
    inputD.value = d / gcd

    lastClickGroup2.click();
}

function Solve1(c, d) { //tf(2a, a+b) = tf(a, b)
    c = BigInt(c); d = BigInt(d);

    let a1 = c ** 2n - 2n * d ** 2n
    let b1 = 6n * d ** 2n
    let gcd = Math.gcd(a1, b1)

    let a = max(a1, b1);
    let b = min(a1, b1);
    let a2 = max(2n * a1, a1 + b1);
    let b2 = min(2n * a1, a1 + b1);

    inputA1.value = a / gcd
    inputB1.value = abs(b / gcd)
    inputA2.value = a2 / gcd
    inputB2.value = abs(b2 / gcd)

}

function Solve2(c, d) { //tf(2a, a-b) = tf(a, b)
    c = BigInt(c); d = BigInt(d);

    let a1 = c ** 2n + 2n * d ** 2n
    let b1 = 6n * d ** 2n
    let gcd = Math.gcd(a1, b1)

    let a = max(a1, b1);
    let b = min(a1, b1);
    let a2 = max(2n * a1, a1 - b1);
    let b2 = min(2n * a1, a1 - b1);

    inputA1.value = a / gcd
    inputB1.value = b / gcd
    inputA2.value = a2 / gcd
    inputB2.value = abs(b2 / gcd)

}

function Solve3(c, d) { //tf(a+b, b) = tf(a, b)
    c = BigInt(c); d = BigInt(d);

    let a1 = c ** 2n + 2n * d ** 2n
    let b1 = c ** 2n - d ** 2n
    let gcd = Math.gcd(a1, b1)

    inputA1.value = a1 / gcd
    inputB1.value = abs(b1 / gcd)
    inputA2.value = (a1 + b1) / gcd
    inputB2.value = abs(b1 / gcd)

}

function Solve4(m, n) { //f(a, b) = f(b, c)
    m = BigInt(m); n = BigInt(n);

    let mn = m * n
    let mm = m * m
    let nn = n * n
    let a = abs(mm - nn)
    let b = abs(mm + mn + nn)
    let c = abs(2n * mn + nn)

    inputA1.value = max(a, b)
    inputB1.value = min(a, b)
    inputA2.value = max(b, c)
    inputB2.value = min(b, c)

}

function Solve7(m, n) {
    m = BigInt(m); n = BigInt(n);

    inputA1.value = max(m, n);
    inputB1.value = min(m, n);
    inputA2.value = c(m, n);
    inputB2.value = abs(4n * f(m, n));

}

swapButton1.onclick = () => {
    let z = inputA1.value;
    inputA1.value = inputB1.value;
    inputB1.value = z;

    lastClickGroup1.onclick();
}

swapButton2.onclick = () => {
    let z = inputA2.value;
    inputA2.value = inputB2.value;
    inputB2.value = z;

    lastClickGroup1.onclick();
}

bigSwapButton.onclick = () => {
    let z = inputA1.value;
    inputA1.value = inputA2.value;
    inputA2.value = z;
    z = inputB1.value;
    inputB1.value = inputB2.value;
    inputB2.value = z;

    lastClickGroup1.onclick();
}

swapCdButton.onclick = () => {
    let z = inputC.value;
    inputC.value = inputD.value;
    inputD.value = z;

    lastClickGroup2.onclick()
}

inputA1.onchange = () => {lastClickGroup1.onclick()}
inputB1.onchange = () => {lastClickGroup1.onclick()}
inputA2.onchange = () => {lastClickGroup1.onclick()}
inputB2.onchange = () => {lastClickGroup1.onclick()}

inputC.onchange = () => {lastClickGroup2.onclick()}
inputD.onchange = () => {lastClickGroup2.onclick()}