Math.gcd = function() {
    let result;
    if (arguments.length === 1)
        return arguments[0];
    if (arguments.length === 2) {
        if (arguments[1] == 0) return arguments[0];
        let max = arguments[0] > arguments[1] ? arguments[0] : arguments[1];
        let min = arguments[0] < arguments[1] ? arguments[0] : arguments[1];
        while (max % min != 0){
            let temp = max % min;
            max = min;
            min = temp;
        }
        result = min;
    } 
    else if (arguments.length > 2) {
        result = Math.gcd(arguments[0], arguments[1]);
        for (let i = 2; i < arguments.length; i++){
            result = Math.gcd(result, arguments[i]);
            if (result == 1 || result == -1) break;
        }
    }
    if (result < 0) result = -result;
    return result;
}

function Factorization(n){
    return FactorizationRec(n, 1)
}

function FactorizationRec(n, lastFactor){
    n = BigInt(n);
    lastFactor = BigInt(lastFactor);

    if(n === 0n) return "0";
    if(n === 1n && lastFactor === 1n) return "1";
    if(n === -1n && lastFactor === 1n) return "-1";
    if(n === 1n || n === -1n) return "";

    let string = GetBeginString(n, lastFactor);
    if (n < 0n) n *= -1n;

    let currentFactor = FindMinFactor(n, lastFactor);
    string += currentFactor;

    let degree = GetDegreeIn(n, currentFactor);
    if (degree >= 2n) string += MakeSuperscript(degree);

    return string + FactorizationRec(reduce(n, currentFactor), currentFactor);
}

function GetBeginString(n, lastFactor){
    n = BigInt(n);
    lastFactor = BigInt(lastFactor);
    if (lastFactor === 1n){
        if(n < 0n) return "-"
        else return ""
    }
    else return "\u22c5"
}

function FindMinFactor(n, lastFactor = 1n){
    n = BigInt(n);
    lastFactor = BigInt(lastFactor);

    for(let i = lastFactor + 1n; i * i <= n; i++){
        if(n % i === 0n) return i;
    }
    return BigInt(n);
}

function reduce(n, k){
    if (k == 1) return BigInt(n);
    n = BigInt(n);
    k = BigInt(k);

    while(n % k === 0n) n /= k
    return n
}

function GetDegreeIn(n, k){
    if (k == 1) return -1n;
    n = BigInt(n);
    k = BigInt(k);

    let i = 0n;
    while(n % k === 0n){
        i++;
        n /= k;
    }
    return i;
}

function MakeSuperscript(n){
    n = BigInt(n);
    if(n > 9n) return MakeSuperscript(Div(n, 10n)) + MakeSuperscript(n % 10n)
    else if(n == 9n) return "\u2079"
    else if(n == 8n) return "\u2078"
    else if(n == 7n) return "\u2077"
    else if(n == 6n) return "\u2076"
    else if(n == 5n) return "\u2075"
    else if(n == 4n) return "\u2074"
    else if(n == 3n) return "\u00b3"
    else if(n == 2n) return "\u00b2"
    else if(n == 1n) return "\u00b9"
    else if(n == 0n) return "\u2070"
    else return "die"
}

function Div(n, k){
    n = BigInt(n);
    k = BigInt(k);

    return (n - n % k) / k
}

function Fmn(a, b){
    a = BigInt(a);
    b = BigInt(b);
    return a * b * (a - b) * (a + b);
}

function SquareSumSquares(a, b){
    a = BigInt(a);
    b = BigInt(b);

    return (a ** 2n + b ** 2n) ** 2n;
}

function isSquare (n) {
    n = Number(n);
    let sqrtN = Math.sqrt(n);
    if (Number.isInteger(sqrtN)) return true;
    return false;
}

function getSimpleDividers (n) {
    n = BigInt(n);

    let simpleDividers = [];
    let k = BigInt(n);
    let current = FindMinFactor(k);
    simpleDividers.push(current);

    while(current !== k){
        while (k % current === 0n)
            k /= current;
        if (k === 1n)
            break;
        current = FindMinFactor(k, current);
        simpleDividers.push(current);
    }
    return simpleDividers;
}

function getDividers (n) {
    n = BigInt(n);

    if (n === 0n) return [0n];
    let dividers = [];
    let absN = abs(n);

    for (var i = 1n; i * i < absN; i++){
        if (n % i === 0n){
            dividers.push(i);
        }
    }

    let minus = 1n;
    if (i * i == absN){
        dividers.push(i);
        minus++;
    } 
    for (let i = dividers.length - minus; i >= 0n; i--){
        dividers.push(Math.abs(n) / dividers[i]);
    }
    return dividers;
}

function abs(n) {
    if (n >= 0n)
        return n;
    else return -n;
}