Math.gcd = function() {
    let result;
    if (arguments.length == 2) {
        if (arguments[1] == 0) result = arguments[0]
        else result = Math.gcd(arguments[1], arguments[0] % arguments[1]);
    } 
    else if (arguments.length > 2) {
        result = Math.gcd(arguments[0], arguments[1]);
        for (var i = 2; i < arguments.length; i++){
            result = Math.gcd(result, arguments[i])
            if (result == 1 || result == -1) break;
        }
    }
    if (result < 0) result *= -1;
    return result;
}

function Factorization(n){
    return FactorizationRec(n, 1)
}

function FactorizationRec(n, lastFactor){
    if(n == 0) return "0"
    if(n == 1 && lastFactor == 1) return "1"
    if(n == -1 && lastFactor == 1) return "-1"

    if(!Number.isInteger(n) || n == 1) return ""

    let string = GetBeginString(n, lastFactor)
    if (n < 0) n *= -1

    let currentFactor = FindMinFactor(n, lastFactor)
    string += currentFactor

    let degree = GetDegreeIn(n, currentFactor)
    if(degree >= 2) string += MakeSuperscript(degree)

    return string + FactorizationRec(reduce(n, currentFactor), currentFactor)
}

function GetBeginString(n, lastFactor){
    if (lastFactor == 1){ 
        if(n < 0) return "-"
        else return ""
    }
    else return "\u22c5"
}

function FindMinFactor(n, lastFactor = 1){
    for(let i = lastFactor + 1; i * i <= n; i++){
        if(n % i == 0) return i;
    }
    return n;
}

function reduce(n, k){
    while(n % k == 0) n /= k
    return n
}

function GetDegreeIn(n, k){
    let i = 0
    while(n % k == 0){
        i++;
        n /= k
    }
    return i
}

function MakeSuperscript(n){
    if(n > 9) return MakeSuperscript(Div(n, 10)) + MakeSuperscript(n % 10)
    else if(n == 9) return "\u2079"
    else if(n == 8) return "\u2078"
    else if(n == 7) return "\u2077"
    else if(n == 6) return "\u2076"
    else if(n == 5) return "\u2075"
    else if(n == 4) return "\u2074"
    else if(n == 3) return "\u00b3"
    else if(n == 2) return "\u00b2"
    else if(n == 1) return "\u00b9"
    else if(n == 0) return "\u2070"
    else return "die"
}

function Div(n, k){
    return (n - n % k) / k
}

function Fmn(a, b){
    return a * b * (a - b) * (+a + (+b))
}

function SquareSumSquares(a, b){
    return (a ** 2 + b ** 2) ** 2
}

function isSquare (n) {
    let sqrtN = Math.sqrt(n);
    if (Number.isInteger(sqrtN)) return true;
    return false;
}

function getSimpleDividers (n) {
    let simpleDividers = [];
    let k = n;
    let current = FindMinFactor(k);
    simpleDividers.push(current);
    while(current != k){
        while (k % current == 0)
            k /= current;
        if (k == 1) break;
        current = FindMinFactor(k, current);
        simpleDividers.push(current);
    }
    return simpleDividers;
}

function getDividers (n) {
    if (n == 0) return [0];
    let dividers = [];
    let absN = Math.abs(n);
    for (var i = 1; i * i < absN; i++){
        if (n % i == 0){
            dividers.push(i);
        }
    }

    let minus = 1;
    if (i * i == absN){
        dividers.push(i);
        minus++;
    } 
    for (let i = dividers.length - minus; i >= 0; i--){
        dividers.push(Math.abs(n) / dividers[i]);
    }
    return dividers;
}