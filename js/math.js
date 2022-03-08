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

function FindMinFactorNotBigint(n, lastFactor = 1){
    for(let i = lastFactor + 1; i * i <= n; i++){
        if(n % i === 0) return i;
    }
    return n;
}

function FindMeanForTfmnMinFactor(n, lastFactor = 1n){
    n = BigInt(n);
    lastFactor = BigInt(lastFactor);

    for(let i = lastFactor + 1n; (i - 1n) ** 4n < n; i++){
        if(n % i === 0n) return i;
    }
    let root = searchRoot(n, 3n);
    if (root[0]) return root[1];
    root = searchRoot(n, 2n);
    if (root[0]) return root[1];
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
    return (n - n % k) / k
}

function Fmn(a, b){
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

function getPrimeDividers (n) {
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

function getFactorization (n) {
    n = BigInt(n);

    let simpleDividers = [];
    let k = BigInt(n);
    let current = FindMinFactor(k);

    while(k !== 1n){
        let i = 0n;
        while (k % current === 0n) {
            i++;
            k /= current;
        }
        simpleDividers.push([current, i]);
        if (k === 1n)
            break;
        current = FindMinFactor(k, current);
    }
    return simpleDividers;
}

function getMeanForTfmnFactorization (n) {
    n = BigInt(n);

    let simpleDividers = [];
    let k = BigInt(n);
    let current = FindMeanForTfmnMinFactor(k);

    while(k !== 1n){
        let i = 0n;
        while (k % current === 0n) {
            i++;
            k /= current;
        }
        simpleDividers.push([current, i]);
        if (k === 1n)
            break;
        current = FindMeanForTfmnMinFactor(k, current);
    }
    return simpleDividers;
}

function getPrimeDividersNotBigint(n) {
    let simpleDividers = [];
    let k = n;
    let current = FindMinFactorNotBigint(k);
    simpleDividers.push(current);

    while(current !== k){
        while (k % current === 0)
            k /= current;
        if (k === 1)
            break;
        current = FindMinFactorNotBigint(k, current);
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

    let minus = 1;
    if (i * i == absN){
        dividers.push(i);
        minus++;
    } 
    for (let i = dividers.length - minus; i >= 0; i--){
        dividers.push(abs(n) / dividers[i]);
    }
    return dividers;
}

function abs(n) {
    if (n >= 0n)
        return n;
    else return -n;
}

function Euler(n){
    n = BigInt(n);
    let dividers = getPrimeDividers(n);
    let val = BigInt(n);
    dividers.forEach((divider) => {
        val /= divider;
        val *= divider - 1n;
    })
    return val;
}

function EulerFromTwoPrime(n, p){
    n = BigInt(n);
    p = BigInt(p);

    return (p - 1n) * (n / p - 1n);
}

function EulerOfPrimary(n){
    return BigInt(n) - 1n;
}

function searchRoot(n, power = 2) {
    n = BigInt(n);
    power = BigInt(power);
    let start = 1n;
    let end = n / power;
    while (end > start + 1n){
        let middle = (start + end) / 2n;
        if (middle ** power > n)
            end = middle;
        else
            start = middle;
    }
    if (start ** power === n)
        return [true, start];
    return [false, end];
}

function powerByModal(base, power, number){
    base = BigInt(base);
    power = BigInt(power);
    number = BigInt(number);

    if (power < 0n){
        number = getInverseByModal(base, number);
        power = -power;
    }

    let mods = [];
    mods.push([1n, number % base]);
    let j = 0;
    for (let i = 2n; i < power; i *= 2n){
        mods.push([i, mods[j][1] * mods[j][1] % base]);
        j++;
    }
    let result = 1n;
    while (power > 0n){
        while (mods[j][0] > power)
            j--;
        result = (result * mods[j][1]) % base;
        power -= mods[j][0];
    }
    return result;
}

function chinesSuperC(c, n){
    let inv = inversesForChines(c, n);
    let ccc = prod(c);
    let nnn = prod(n);
    return c.reduce((result, elem, i) => result +
            ccc * nnn / n[i] * prod(inv[i]) / inv[i][i] % nnn,
        0n) % nnn;
}

function inversesForChines(c, n){
    let inv = [];
    for (let i = 0; i < c.length; i++){
        inv.push([])
        for (let j = 0; j < c.length; j++){
            inv[i].push(getInverseByModal(n[i], c[j] * n[j]));
        }
    }
    return inv;
}

function prod(array){
    return array.reduce((result, elem) => result * BigInt(elem), 1n);
}

function calculateContinuedFraction(numerator, denominator) {
    numerator = BigInt(numerator);
    denominator = BigInt(denominator);

    let result = [];
    while (denominator !== 0n){
        let stepper = numerator / denominator;
        result.push(stepper);
        let temp = numerator;
        numerator = denominator;
        denominator = temp - stepper * denominator;
    }

    return result;
}

function getApproximations(fraction) {
    let approxes = [];
    approxes.push([1n, 0n]);
    approxes.push([fraction[0], 1n]);

    for (let i = 1; i < fraction.length; i++){
        approxes.push([
            fraction[i] * approxes[i][0] + approxes[i - 1][0],
            fraction[i] * approxes[i][1] + approxes[i - 1][1],
        ])
    }

    return approxes.slice(1);
}

function quadraticEquation(b, c) {
    b = BigInt(b);
    c = BigInt(c);

    let d = searchRoot(b ** 2n - 4n * c, 2n);
    return [(b - d[1]) / 2n, (b + d[1]) / 2n];
}

function Bezout(a, b) {
    a = BigInt(a); b = BigInt(b);
    let oldGcd = a, gcd = b, oldX = 1n, x = 0n, oldY = 0n, y = 1n;
    while (gcd != 0n) {
        let quotient = oldGcd / gcd;
        let temp = gcd;
        gcd = oldGcd - quotient * gcd;
        oldGcd = temp;

        temp = x;
        x = oldX - quotient * x;
        oldX = temp;

        temp = y;
        y = oldY - quotient * y;
        oldY = temp;
    }
    return [oldX, oldY, oldGcd];
}