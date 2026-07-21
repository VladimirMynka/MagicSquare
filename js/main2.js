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
let interestingButton = document.getElementById("interestingButton")

let inputA1 = document.getElementById("inputA1")
let inputB1 = document.getElementById("inputB1")
let inputA2 = document.getElementById("inputA2")
let inputB2 = document.getElementById("inputB2")
let swapButton1 = document.getElementById("swapButton1")
let swapButton2 = document.getElementById("swapButton2")
let bigSwapButton = document.getElementById("bigSwapButton")
let inputMaxParam = document.getElementById("inputMaxParam")
let paramRandomButton = document.getElementById("randomButtonParam")

let acegButton = document.getElementById("applyButtonACEG")
let bdefButton = document.getElementById("applyButtonBDEF")
let abejButton = document.getElementById("applyButtonABEJ")
let bdejButton = document.getElementById("applyButtonBDEJ")
let abehButton = document.getElementById("applyButtonABEH")
let bdfgButton = document.getElementById("applyButtonBDFG")
let abdjButton = document.getElementById("applyButtonABDJ")

let acehButton = document.getElementById("applyButtonACEH")
let acdeButton = document.getElementById("applyButtonACDE")
let bdfhButton = document.getElementById("applyButtonBDFH")
let acgjButton = document.getElementById("applyButtonACGJ")
let abfjButton = document.getElementById("applyButtonABFJ")
let abhjButton = document.getElementById("applyButtonABHJ")

let bcdeButton = document.getElementById("applyButtonBCDE")
let acfgButton = document.getElementById("applyButtonACFG")
let abdfButton = document.getElementById("applyButtonABDF")
let acdfButton = document.getElementById("applyButtonACDF")

let abcgButton = document.getElementById("applyButtonABCG")
let abchButton = document.getElementById("applyButtonABCH")
let abceButton = document.getElementById("applyButtonABCE")
let abdeButton = document.getElementById("applyButtonABDE")
let abcdButton = document.getElementById("applyButtonABCD")

let acegjButton = document.getElementById("applyButtonACEGJ")
let bdefhButton = document.getElementById("applyButtonBDEFH")
let abehjButton = document.getElementById("applyButtonABEHJ")
let bdefjButton = document.getElementById("applyButtonBDEFJ")
let bdfgjButton = document.getElementById("applyButtonBDFGJ")
let abdejButton = document.getElementById("applyButtonABDEJ")

let bdfhjButton = document.getElementById("applyButtonBDFHJ")
let abdfjButton = document.getElementById("applyButtonABDFJ")
let acehjButton = document.getElementById("applyButtonACEHJ")
let acdegButton = document.getElementById("applyButtonACDEG")
let abcehButton = document.getElementById("applyButtonABCEH")
let acdefButton = document.getElementById("applyButtonACDEF")
let abefjButton = document.getElementById("applyButtonABEFJ")
let abfgjButton = document.getElementById("applyButtonABFGJ")

let abcdhButton = document.getElementById("applyButtonABCDH")
let abcdjButton = document.getElementById("applyButtonABCDJ")
let abdefFiveButton = document.getElementById("applyButtonABDEF")

let abcdeButton = document.getElementById("applyButtonABCDE")
let abcgjButton = document.getElementById("applyButtonABCGJ")
let abcghButton = document.getElementById("applyButtonABCGH")
let abcdfButton = document.getElementById("applyButtonABCDF")
let abcdgButton = document.getElementById("applyButtonABCDG")

let abefghButton = document.getElementById("applyButtonABEFGH")

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

let otherFormulas = [
    (E, x, y) => BigInt(E) - BigInt(x) - BigInt(y),
    (E, x, y) => BigInt(E) - BigInt(x),
    (E, x, y) => BigInt(E) - BigInt(x) + BigInt(y),
    (E, x, y) => BigInt(E) - BigInt(y),
    (E, x, y) => BigInt(E),
    (E, x, y) => BigInt(E) + BigInt(y),
    (E, x, y) => BigInt(E) + BigInt(x) - BigInt(y),
    (E, x, y) => BigInt(E) + BigInt(x),
    (E, x, y) => BigInt(E) + BigInt(x) + BigInt(y)
]

let factorizationSwitch = false
let lastClickGroup1 = acegButton;

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
interestingButton.onclick = () => {
    let z = otherFormulas
    otherFormulas = placeFormulas
    placeFormulas = z
    UpdateSquare()
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
    // let px = 180 / (15 * (div(placeFormulas[5](E, x, y).toString().length, 15) + 1)) * 5 / 3 + 'px';
    for (let i = 0; i < 9; i++) {
        let number = placeFormulas[i](E, x, y);
        placeArray[i].innerText = number;
        // placeArray[i].style.fontSize = px;
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

paramRandomButton.onclick = RandomACEGJ

function RandomACEGJ() {
    let a = Random(2, +inputMaxParam.value)
    let b = Random(1, a - 1)
    let gcd = Math.gcd(a, b)
    a /= gcd
    b /= gcd
    let c = Random(2, +inputMaxParam.value)
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

function CalculateCurrentBy(func, button) {
    return () => {
        [inputE.value, inputX.value, inputY.value] =
            func(inputA1.value, inputB1.value, inputA2.value, inputB2.value)
        UpdateSquare()
        lastClickGroup1 = button
    }
}

let buttonGroup1 = [
    acegButton,
    bdefButton,
    abejButton,
    bdejButton,
    abehButton,
    bdfgButton,
    abdjButton,

    acehButton,
    acdeButton,
    bdfhButton,
    acgjButton,
    abfjButton,
    abhjButton,

    bcdeButton,
    acfgButton,
    abdfButton,
    acdfButton,

    abcgButton,
    abchButton,
    abceButton,
    abdeButton,
    abcdButton,

    acegjButton,
    bdefhButton,
    abehjButton,
    bdefjButton,
    bdfgjButton,
    abdejButton,

    bdfhjButton,
    abdfjButton,
    acehjButton,
    acdegButton,
    abcehButton,
    acdefButton,
    abefjButton,
    abfgjButton,

    abcdhButton,
    abcdjButton,
    abdefFiveButton,

    abcdeButton,
    abcgjButton,
    abcghButton,
    abcdfButton,
    abcdgButton,

    abefghButton,
]

let functionGroup1 = [
    aceg,
    bdef,
    abej,
    bdej,
    abeh,
    bdfg,
    abdj,

    aceh,
    acde,
    bdfh,
    acgj,
    abfj,
    abhj,

    bcde,
    acfg,
    abdf,
    acdf,

    abcg,
    abch,
    abce,
    abde,
    abcd,

    acegj,
    bdefh,
    abehj,
    bdefj,
    bdfgj,
    abdej,

    bdfhj,
    abdfj,
    acehj,
    acdeg,
    abceh,
    acdef,
    abefj,
    abfgj,

    abcdh,
    abcdj,
    abdefFive,

    abcde,
    abcgj,
    abcgh,
    abcdf,
    abcdg,

    abefgh
]

for(let i = 0; i < buttonGroup1.length; i++){
    buttonGroup1[i].onclick = CalculateCurrentBy(functionGroup1[i], buttonGroup1[i]);
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

inputA1.onchange = () => {lastClickGroup1.onclick()}
inputB1.onchange = () => {lastClickGroup1.onclick()}
inputA2.onchange = () => {lastClickGroup1.onclick()}
inputB2.onchange = () => {lastClickGroup1.onclick()}


// 4/9
function red(a, b, c, d) {
    [a, b, c, d] = [a, b, c, d].map(elem => BigInt(elem))
    let ab = a * b;
    let a_b = a * a - b * b;
    let r1 = (2n * ab - a_b) * c;
    let r2 = (a * a + b * b) * c;
    let r3 = (2n * ab + a_b) * c;
    return [r1 * r1, r2 * r2, r3 * r3, d * d]
}

function yellow(a, b, c, d) {
    [a, b, c, d] = [a, b, c, d].map(elem => BigInt(elem))
    return [
        a * c + b * d,
        a * d - b * c,
        a * c - b * d,
        a * d + b * c
    ].map(elem => elem * elem)
}

function blue(a, b, c, d) {
    [a, b, c, d] = [a, b, c, d].map(elem => BigInt(elem))
    return [
        a * c + b * d,
        a * c - b * d,
        a * d + 2n * b * c,
        a * d - 2n * b * c
    ].map(elem => elem * elem)
}

function brown(a, b, c, d) {
    [a, b, c, d] = [a, b, c, d].map(elem => BigInt(elem));
    let [A, B, C] = [a, b, c];
    return [
        -2n * A * A - 4n * A * B + 2n * A * C + 2n * B * B - C * C,
        2n * A * A - 4n * A * B - 2n * B * B + 2n * B * C - C * C,
        2n * A * A + 2n * B * B - C * C,
        2n * A * A - 4n * A * C + 2n * B * B - 4n * B * C + C * C
    ].map(elem => elem * elem)
}

function green(a, b, c, d) {
    [a, b, c, d] = [a, b, c, d].map(elem => BigInt(elem));
    let [A, B, C, D] = [a, b, c, d].map(elem => elem * elem)
    return [
        A + B - C - D + 2n * (a * c - a * d + b * c + b * d),
        A - B + C - D + 2n * (a * d - a * b + b * c + c * d),
        A - B - C + D + 2n * (a * b - a * c + b * d + c * d),
        A + B + C + D
    ].map(elem => elem * elem)
}

function darkgray(a, b, c, d) {
    [a, b, c, d] = [a, b, c, d].map(elem => BigInt(elem));
    let [A, B, C] = [a, b, c];
    return [
        -2n * A * A - 2n * A * B - 2n * A * C + B * B + C * C,
        2n * A * A - 4n * A * B - B * B - 2n * B * C + C * C,
        2n * A * A - 4n * A * C + B * B - 2n * B * C - C * C,
        2n * A * A + B * B + C * C
    ].map(elem => elem * elem)
}

function lightgray(a, b, c, d) {
    [a, b, c, d] = [a, b, c, d].map(elem => BigInt(elem));
    let [A, B, C] = [a, b, c];
    return [
        -2n * A * A + 2n * A * B + 8n * A * C - B * B - 4n * C * C,
        2n * A * A - B * B - 4n * C * C,
        2n * A * A - 4n * A * C - B * B + 2n * B * C + 4n * C * C,
        2n * A * A - 4n * A * B + B * B + 8n * B * C - 4n * C * C
    ].map(elem => elem * elem)
}

// 5/9
function redRed(a, b, c, d) {
    let k1 = a * a + b * b;
    let k2 = c * c + d * d;
    let [A, _, J, __] = red(a, b, k2, 0);
    let [B, E, H, ___] = red(c, d, k1, 0);
    return [E, A, J, B, H];
}

function redRed2(a, b, c, d) {
    let k1 = a * a - b * b + 2 * a * b;
    let k2 = c * c - d * d + 2 * c * d;
    let [_, J, B, __] = red(b, a, k2, 0);
    let [D, E, F, ___] = red(d, c, k1, 0);
    return [D, E, J, F, B];
}

function redRed3(a, b, c, d) {
    let k1 = a * a - b * b + 2 * a * b;
    let k2 = c * c + d * d;
    let [A, E, _, __] = red(a, b, k2, 0);
    let [D, J, B, ___] = red(c, d, k1, 0);
    return [J, E, A, D, B];
}

function redYellow(a, b, c, d) {
    [a, b, c, d] = [a, b, c, d].map(elem => BigInt(elem));
    c = Math.gcd(2n * a * b, c)
    d = Math.gcd(a * a - b * b, d)
    let A = 2n * a * b / c;
    let B = (a * a - b * b) / d;
    let E = a * a + b * b;
    return [E * E].concat(yellow(A, B, c, d));
}

function redYellow2(a, b, c, d) {
    [a, b, c, d] = [a, b, c, d].map(elem => BigInt(elem));
    c = Math.gcd(b * (a + b), c)
    d = Math.gcd(a * (a - b), d)
    let A = b * (a + b) / c;
    let B = a * (a - b) / d;
    let J = a * a - b * b + 2n * a * b;
    return [J * J].concat(yellow(A, B, c, d));
}

//red
function aceg(a, b, c, d) {
    let [C, E, G, A] = red(a, b, c, d)
    return [
        E,
        A - E,
        G - E
    ]
}

function bdef(a, b, c, d) {
    let [D, E, F, B] = red(a, b, c, d)
    if (F % 2n !== B % 2n) {
        [D, E, F, B] = [D, E, F, B].map(elem => elem * 4n)
    }
    return [
        E,
        (F - B) / 2n,
        (B - D) / 2n
    ]
}

function abej(a, b, c, d) {
    let [J, E, A, B] = red(a, b, c, d)
    return [
        E,
        A - E,
        B - J
    ]
}

function bdej(a, b, c, d) {
    let [D, J, B, E] = red(a, b, c, d)
    return [
        E,
        E - J,
        J - D
    ]
}

function abeh(a, b, c, d) {
    let [B, E, H, A] = red(a, b, c, d)
    return [
        E,
        A - E,
        A - H
    ]
}

function bdfg(a, b, c, d) {
    let [B, G, F, D] = red(a, b, c, d)
    if (B % 2n !== D % 2n) {
        [B, G, F, D] = [B, G, F, D].map(elem => elem * 4n)
    }
    return [
        (D + F) / 2n,
        G - B,
        (B - D) / 2n
    ]
}

function abdj(a, b, c, d) {
    let [D, J, B, A] = red(a, b, c, d)
    if (A % 2n !== J % 2n) {
        [D, J, B, A] = [D, J, B, A].map(elem => elem * 4n)
    }
    return [
        (A + J) / 2n,
        (A - J) / 2n,
        B - J
    ]
}

//yellow
function aceh(a, b, c, d) {
    let [A, C, E, H] = yellow(a, b, c, d);
    return [
        E,
        A - E,
        E - C
    ]
}

function acde(a, b, c, d) {
    let [A, D, C, E] = yellow(a, b, c, d);
    return [
        E,
        A - E,
        E - C
    ]
}

function bdfh(a, b, c, d) {
    let [B, H, D, F] = yellow(a, b, c, d);
    if (B % 2n !== H % 2n) {
        [B, H, D, F] = [B, H, D, F].map(elem => elem * 4n)
    }
    return [
        (B + H) / 2n,
        (F - B) / 2n,
        (B - D) / 2n
    ]
}

function acgj(a, b, c, d) {
    let [A, J, C, G] = yellow(a, b, c, d);
    if (A % 2n !== J % 2n) {
        [A, J, C, G] = [A, J, C, G].map(elem => elem * 4n)
    }
    return [
        (A + J) / 2n,
        (A - J) / 2n,
        (G - C) / 2n
    ]
}

function abfj(a, b, c, d) {
    let [A, B, F, J] = yellow(a, b, c, d);
    if (A % 2n !== J % 2n) {
        [A, B, F, J] = [A, B, F, J].map(elem => elem * 4n)
    }
    return [
        (A + J) / 2n,
        (A - J) / 2n,
        B - J
    ]
}

function abhj(a, b, c, d) {
    let [A, J, B, H] = yellow(a, b, c, d);
    if (A % 2n !== J % 2n) {
        [A, J, B, H] = [A, J, B, H].map(elem => elem * 4n)
    }
    return [
        (A + J) / 2n,
        (A - J) / 2n,
        B - J
    ]
}

//blue
function bcde(a, b, c, d) {
    let [E, C, B, D] = blue(a, b, c, d);
    return [
        E,
        C - D,
        E - C
    ]
}

function acfg(a, b, c, d) {
    let [F, A, G, C] = blue(a, b, c, d);
    if (C % 2n !== G % 2n) {
        [F, A, G, C] = [F, A, G, C].map(elem => elem * 4n)
    }
    return [
        (C + G) / 2n,
        F - G,
        F - A
    ]
}

function abdf(a, b, c, d) {
    let [F, A, B, D] = blue(a, b, c, d);
    if (D % 2n !== F % 2n) {
        [F, A, B, D] = [F, A, B, D].map(elem => elem * 4n)
    }
    return [
        (D + F) / 2n,
        (F - B) / 2n,
        (B - D) / 2n
    ]
}

function acdf(a, b, c, d) {
    let [A, C, F, D] = blue(a, b, c, d);
    if (D % 2n !== F % 2n) {
        [A, C, F, D] = [A, C, F, D].map(elem => elem * 4n)
    }
    return [
        (D + F) / 2n,
        C - D,
        F - A
    ]
}

//brown
function abcg(a, b, c, d) {
    let [A, B, G, C] = brown(a, b, c, d);
    if (C % 2n !== G % 2n) {
        [A, B, G, C] = [A, B, G, C].map(elem => elem * 4n)
    }
    return [
        (G + C) / 2n,
        G - B,
        (G - C) / 2n
    ]
}

function abch(a, b, c, d) {
    let [A, C, H, B] = brown(a, b, c, d);
    if (B % 2n !== H % 2n) {
        [A, C, H, B] = [A, C, H, B].map(elem => elem * 4n)
    }
    return [
        (B + H) / 2n,
        H - C,
        A - H
    ]
}

//green
function abce(a, b, c, d) {
    let [A, B, C, E] = green(a, b, c, d);
    return [
        E,
        A - E,
        E - C
    ]
}

//darkgray
function abde(a, b, c, d) {
    let [A, B, D, E] = darkgray(a, b, c, d);
    if (B % 2n !== D % 2n) {
        [A, B, D, E] = [A, B, D, E].map(elem => elem * 4n)
    }
    return [
        E,
        A - E,
        (B - D) / 2n
    ]
}

//darkgray
function abcd(a, b, c, d) {
    let [A, D, C, B] = lightgray(a, b, c, d);
    if ((A + B + C) % 3n !== 0n) {
        [A, D, C, B] = [A, D, C, B].map(elem => elem * 9n)
    }
    if (B % 2n !== D % 2n) {
        [A, D, C, B] = [A, D, C, B].map(elem => elem * 4n)
    }
    return [
        (A + B + C) / 3n,
        C - D,
        (B - D) / 2n
    ]
}

//redred
function acegj(a, b, c, d) {
    let [E, J, A, C, G] = redRed(a, b, c, d);
    return [E, A - E, G - E];
}

function bdefh(a, b, c, d) {
    let [E, D, F, B, H] = redRed(a, b, c, d);
    if (B % 2n !== D % 2n) {
        [E, D, F, B, H] = [E, D, F, B, H].map(elem => elem * 4n);
    }
    return [E, (F - B) / 2n, (B - D) / 2n];
}

function abehj(a, b, c, d) {
    let [E, J, A, B, H] = redRed(a, b, c, d);
    return [E, A - E, A - H];
}

function bdefj(a, b, c, d) {
    let [D, E, J, F, B] = redRed2(a, b, c, d);
    return [E, E - J, B - J];
}

function bdfgj(a, b, c, d) {
    let [B, G, J, D, F] = redRed2(a, b, c, d);
    if (D % 2n !== F % 2n) {
        [B, G, J, F, D] = [B, G, J, F, D].map(elem => elem * 4n);
    }
    return [(D + F) / 2n, G - B, B - J];
}

function abdej(a, b, c, d) {
    let [J, E, A, B, D] = redRed3(a, b, c, d);
    return [E, E - J, B - J];
}

//redyellow
function bdfhj(a, b, c, d) {
    let [J, B, H, D, F] = redYellow(b, a, c, d);
    if (F % 2n !== D % 2n) {
        [J, B, H, D, F] = [J, B, H, D, F].map(elem => elem * 4n);
    }
    return [(D + F) / 2n, (F - B) / 2n, B - J];
}

function abdfj(a, b, c, d) {
    let [D, J, F, B, A] = redYellow2(b, a, c, d);
    if (F % 2n !== D % 2n) {
        [D, J, F, B, A] = [D, J, F, B, A].map(elem => elem * 4n);
    }
    return [(D + F) / 2n, (F - B) / 2n, B - J];
}

function acehj(a, b, c, d) {
    let [A, E, C, J, H] = redYellow2(b, a, c, d);
    return [E, A - E, E - C];
}

function acdeg(a, b, c, d) {
    [a, b, c, d] = [a, b, c, d].map(elem => BigInt(elem));
    let r = -a * a + 2n * a * b + b * b;
    let s = a * a + b * b;
    let t = a * a + 2n * a * b - b * b;
    let N = c * c + d * d;
    let P = d * d - c * c;
    let Q = 2n * c * d;
    let A = P * r - Q * s;
    let E = N * s;
    let G = N * t;
    return [E * E, A * A - E * E, G * G - E * E];
}

function abceh(a, b, c, d) {
    [a, b, c, d] = [a, b, c, d].map(elem => BigInt(elem));
    let r = -a * a + 2n * a * b + b * b;
    let s = a * a + b * b;
    let t = a * a + 2n * a * b - b * b;
    let N = c * c + d * d;
    let P = d * d - c * c;
    let Q = 2n * c * d;
    let A = P * s - Q * t;
    let C = Q * s + P * t;
    let E = N * s;
    return [E * E, A * A - E * E, E * E - C * C];
}

function acdef(a, b, c, d) {
    let [F, E, C, D, A] = redYellow2(b, a, c, d);
    return [E, A - E, E - C];
}

function abefj(a, b, c, d) {
    let [E, A, B, J, F] = redYellow(b, a, c, d);
    return [E, A - E, B - J];
}

function abfgj(a, b, c, d) {
    let [G, B, A, F, J] = redYellow(b, a, c, d);
    if (A % 2n !== J % 2n) {
        [G, B, A, F, J] = [G, B, A, F, J].map(elem => elem * 4n);
    }
    return [(A + J) / 2n, (A - J) / 2n, B - J];
}

function toBigInts(values) {
    return values.map(elem => BigInt(elem));
}

function squareTuple(values) {
    return values.map(elem => elem * elem);
}

function redSeed(a, b) {
    [a, b] = toBigInts([a, b]);
    return {
        r: -a * a + 2n * a * b + b * b,
        s: a * a + b * b,
        t: a * a + 2n * a * b - b * b
    };
}

function redBlueParams(c, d, sign) {
    [c, d] = toBigInts([c, d]);
    return {
        P: c * c + sign * 2n * d * d,
        Q: 2n * c * d,
        M: c * c - sign * 2n * d * d
    };
}

function redBlueFromFormula(a, b, c, d, formula, order) {
    let letters = formula(redSeed(a, b), redBlueParams(c, d, 1n));
    return squareTuple(order.map(letter => letters[letter]));
}

function redBlue1(a, b, c, d) {
    return redBlueFromFormula(a, b, c, d, ({r, s, t}, {P, Q, M}) => ({
        A: Q * t + P * r,
        B: P * t + 2n * Q * r,
        C: M * s,
        D: M * t,
        H: M * r
    }), ["A", "B", "C", "D", "H"]);
}

function redBlue2(a, b, c, d) {
    return redBlueFromFormula(a, b, c, d, ({r, s, t}, {P: N, Q, M: P}) => ({
        A: P * r + Q * t,
        B: P * t - 2n * Q * r,
        D: N * t,
        E: N * s,
        F: N * r
    }), ["A", "B", "D", "E", "F"]);
}

function redBlue3(a, b, c, d) {
    return redBlueFromFormula(a, b, c, d, ({r, s, t}, {P, Q, M}) => ({
        A: P * s + 2n * Q * t,
        B: M * r,
        C: Q * s + P * t,
        D: M * t,
        J: M * s
    }), ["A", "B", "C", "D", "J"]);
}

// START_FUNCTION ensureSameParity
// START_CONTRACT
// PURPOSE
// Clear a possible factor `1/2` in opposite-cell center reconstruction.
//
// CONTRACT
// - If the selected square values have different parity, scale every square
//   value by `4`, equivalently scaling every root by `2`.
// - Parity comparison is sign-independent.
// END_CONTRACT
function ensureSameParity(values, left, right) {
    if ((values[left] - values[right]) % 2n !== 0n) {
        return values.map(elem => elem * 4n);
    }
    return values;
}
// END_FUNCTION ensureSameParity

//redblue
function abcdh(a, b, c, d) {
    let [A, B, C, D, H] = redBlue1(a, b, c, d);
    return [A - H + C, H - C, A - H];
}

function abcdj(a, b, c, d) {
    let [A, B, C, D, J] = redBlue3(a, b, c, d);
    [A, B, C, D, J] = ensureSameParity([A, B, C, D, J], 0, 4);
    return [(A + J) / 2n, (A - J) / 2n, J - D];
}

function abdefFive(a, b, c, d) {
    let [A, B, D, E, F] = redBlue2(a, b, c, d);
    return [E, A - E, F - A];
}

function normParams(a, b, c, d) {
    [a, b, c, d] = toBigInts([a, b, c, d]);
    return {
        P: a * a - b * b,
        Q: 2n * a * b,
        N: a * a + b * b,
        U: c * c - 2n * d * d,
        V: 2n * c * d,
        M: c * c + 2n * d * d
    };
}

function blueParams(a, b) {
    [a, b] = toBigInts([a, b]);
    return {
        U: a * a - 2n * b * b,
        V: 2n * a * b,
        M: a * a + 2n * b * b
    };
}

//yellowblue
// START_FUNCTION yellowBlue1
// START_CONTRACT
// PURPOSE
// Generate the yellow-blue `A,B,C,D,E` roots without runtime division.
//
// CONTRACT
// - Uses `P²+Q²=N²` and `U²+2V²=M²` to cancel the two formal norm
//   denominators symbolically.
// - Returns square values in `A,B,C,D,E` order.
// END_CONTRACT
function yellowBlue1(a, b, c, d) {
    let {P, Q, N, U, V, M} = normParams(a, b, c, d);
    return squareTuple([
        -P * U + Q * M - N * V,
        -P * U + 2n * N * V - Q * M,
        -N * U - P * V,
        -P * M - Q * U,
        Q * V - N * M
    ]);
}
// END_FUNCTION yellowBlue1

function abcde(a, b, c, d) {
    let [A, B, C, D, E] = yellowBlue1(a, b, c, d);
    return [E, A - E, E - C];
}

// START_FUNCTION yellowBlue2
// START_CONTRACT
// PURPOSE
// Generate the yellow-blue `A,B,C,G,J` roots without runtime division.
//
// CONTRACT
// - Uses the two norm identities to return closed polynomial roots.
// - Returns square values in `A,B,C,G,J` order.
// END_CONTRACT
function yellowBlue2(a, b, c, d) {
    let {P, Q, N, U, V, M} = normParams(a, b, c, d);
    return squareTuple([
        N * (2n * P * V - N * U),
        N * (Q * M - N * V - P * U),
        N * (-M * Q + 2n * N * V - P * U),
        N * (Q * U - M * P),
        N * (-M * N + 2n * Q * V)
    ]);
}
// END_FUNCTION yellowBlue2

function abcgj(a, b, c, d) {
    let [A, B, C, G, J] = yellowBlue2(a, b, c, d);
    [A, B, C, G, J] = ensureSameParity([A, B, C, G, J], 0, 4);
    return [(A + J) / 2n, (A - J) / 2n, (A + J) / 2n - C];
}

// START_FUNCTION yellowBlue3
// START_CONTRACT
// PURPOSE
// Generate the yellow-blue `A,B,C,G,H` roots without runtime division.
//
// CONTRACT
// - Uses the two norm identities to return closed polynomial roots.
// - Returns square values in `A,B,C,G,H` order.
// END_CONTRACT
function yellowBlue3(a, b, c, d) {
    let {P, Q, N, U, V, M} = normParams(a, b, c, d);
    return squareTuple([
        -Q * M - N * V - P * U,
        Q * M + 2n * N * V - P * U,
        2n * P * V - N * U,
        -2n * Q * V - N * M,
        -P * M - Q * U
    ]);
}
// END_FUNCTION yellowBlue3

function abcgh(a, b, c, d) {
    let [A, B, C, G, H] = yellowBlue3(a, b, c, d);
    [A, B, C, G, H] = ensureSameParity([A, B, C, G, H], 2, 3);
    return [(C + G) / 2n, A - (C + G) / 2n, (G - C) / 2n];
}

// START_FUNCTION blueBlue
// START_CONTRACT
// PURPOSE
// Generate the blue-blue `A,B,C,D,F` roots in closed polynomial form.
//
// CONTRACT
// - Uses simplified compatibility minors and `Uᵢ²+2Vᵢ²=Mᵢ²`.
// - Performs no runtime division, including at degenerate parameter tuples.
// - Returns square values in `A,B,C,D,F` order.
// END_CONTRACT
function blueBlue(a, b, c, d) {
    let {U: U1, V: V1, M: M1} = blueParams(a, b);
    let {U: U2, V: V2, M: M2} = blueParams(c, d);
    return squareTuple([
        M2 * (U1 * U2 + V1 * M2),
        M2 * (U1 * M2 - 2n * U2 * V1 - 2n * M1 * V2),
        M2 * (M2 * U1 + U2 * V1 - M1 * V2),
        M2 * (M1 * M2 - 2n * U1 * V2),
        M2 * (M1 * U2 + 2n * V1 * V2)
    ]);
}
// END_FUNCTION blueBlue

function abcdf(a, b, c, d) {
    let [A, B, C, D, F] = blueBlue(a, b, c, d);
    [A, B, C, D, F] = ensureSameParity([A, B, C, D, F], 3, 4);
    return [(D + F) / 2n, C - D, F - A];
}

// START_FUNCTION abcdg
// START_CONTRACT
// PURPOSE
// Generate the yellow-brown `A,B,C,D,G` five-square family without division.
//
// CONTRACT
// - Inputs `(m,n,mu,nu)` are integer parameters accepted by `BigInt`.
// - Output is the canonical `(E,x,y)` tuple for the ordinary magic square.
// - Positions `A,B,C,D,G` are squares by the polynomial identities mirrored
//   in `magic-squares-core/src/magic_squares_core/colored.py`.
//
// FAILURE_MEANING
// A mismatch with the proof-core formula invalidates the UI generator.
// END_CONTRACT
function abcdg(m, n, mu, nu) {
    [m, n, mu, nu] = toBigInts([m, n, mu, nu]);
    let r = -m * m + 2n * m * n + n * n;
    let s = m * m + n * n;
    let u = m * m + 2n * m * n - n * n;
    let K = 2n * r * r - s * s;
    let P = K * mu * mu - nu * nu;
    let Q = 2n * u * mu * nu;
    let aRoot = u * (K * mu * mu + nu * nu);
    let gRoot = Q * r - P * s;
    let E = P * P * s * s + Q * Q * r * r;
    let A = aRoot * aRoot;
    let G = gRoot * gRoot;
    return [E, A - E, G - E];
}
// END_FUNCTION abcdg

// redredred 6/9
function redRatioParts(p, q) {
    return {
        numerator: p * p - 2n * p * q - q * q,
        denominator: p * p + 2n * p * q - q * q,
        center: p * p + q * q
    };
}

function redRedRed2S(a, b, c, d) {
    [a, b, c, d] = toBigInts([a, b, c, d]);
    let zNumerator = a ** 4n - 2n * a ** 3n * b + 2n * a * a * b * b + 2n * a * b ** 3n + b ** 4n;
    let zDenominator = a ** 4n + 2n * a ** 3n * b + 2n * a * a * b * b - 2n * a * b ** 3n + b ** 4n;
    let yNumerator = (a + b) * (a ** 4n - 2n * a ** 3n * b - 2n * a * a * b * b - 2n * a * b ** 3n + b ** 4n);
    let yDenominator = (a - b) * (a ** 4n + 2n * a ** 3n * b - 2n * a * a * b * b + 2n * a * b ** 3n + b ** 4n);

    let xParts = redRatioParts(a, b);
    let zParts = redRatioParts(zNumerator, zDenominator);
    let yParts = redRatioParts(yNumerator, yDenominator);
    let scale = c * c + d * d;

    let B = xParts.denominator * zParts.denominator * yParts.denominator * scale;
    let F = xParts.numerator * zParts.denominator * yParts.denominator * scale;
    let H = xParts.numerator * zParts.numerator * yParts.denominator * scale;
    let G = xParts.center * zParts.denominator * yParts.denominator * scale;
    let A = zParts.center * xParts.numerator * yParts.denominator * scale;
    let E = yParts.center * xParts.denominator * zParts.denominator * scale;

    return squareTuple([A, B, E, F, G, H]);
}

function abefgh(a, b, c, d) {
    let [A, B, E, F, G, H] = redRedRed2S(a, b, c, d);
    return [E, A - E, G - E];
}
