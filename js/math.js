Math.gcd = function() {
    let result;
    if (arguments.length === 1)
        return arguments[0];
    if (arguments.length === 2) {
        let max = arguments[0] > arguments[1] ? arguments[0] : arguments[1];
        let min = arguments[0] < arguments[1] ? arguments[0] : arguments[1];
        if (min == 0) return max;
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

function factorization(n){
    return factorizationRec(n, 1)
}

function factorizationRec(n, lastFactor){
    n = BigInt(n);
    lastFactor = BigInt(lastFactor);

    if(n === 0n) return "0";
    if(n === 1n && lastFactor === 1n) return "1";
    if(n === -1n && lastFactor === 1n) return "-1";
    if(n === 1n || n === -1n) return "";

    let string = getBeginString(n, lastFactor);
    if (n < 0n) n *= -1n;

    let currentFactor = findMinFactor(n, lastFactor);
    string += currentFactor;

    let degree = getPowerIn(n, currentFactor);
    if (degree >= 2n) string += makeSuperscript(degree);

    return string + factorizationRec(reduce(n, currentFactor), currentFactor);
}

function getBeginString(n, lastFactor){
    n = BigInt(n);
    lastFactor = BigInt(lastFactor);
    if (lastFactor === 1n){
        if(n < 0n) return "-"
        else return ""
    }
    else return "\u22c5"
}

function findMinFactor(n, lastFactor = 1n){
    n = BigInt(n);
    lastFactor = BigInt(lastFactor);

    for(let i = lastFactor + 1n; i * i <= n; i++){
        if(n % i === 0n) return i;
    }
    return BigInt(n);
}

function findMinFactorNotBigint(n, lastFactor = 1){
    for(let i = lastFactor + 1; i * i <= n; i++){
        if(n % i === 0) return i;
    }
    return n;
}

function findMeanForTfmnMinFactor(n, lastFactor = 1n){
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

function getPowerIn(n, k){
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

function makeSuperscript(n){
    n = BigInt(n);
    if(n > 9n) return makeSuperscript(div(n, 10n)) + makeSuperscript(n % 10n)
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

function div(n, k) {
    return (n - n % k) / k
}

function fmn(a, b) {
    return a * b * (a - b) * (a + b);
}

function squareSumSquares(a, b) {
    let sqrSum = a * a + b * b;
    return sqrSum * sqrSum;
}

function isSquare(n) {
    n = BigInt(n);
    return searchRoot(n)[0];
}

function getPrimeDividers(n) {
    n = BigInt(n);

    let simpleDividers = [];
    let k = BigInt(n);
    let current = findMinFactor(k);
    simpleDividers.push(current);

    while(current !== k){
        while (k % current === 0n)
            k /= current;
        if (k === 1n)
            break;
        current = findMinFactor(k, current);
        simpleDividers.push(current);
    }
    return simpleDividers;
}

function getFactorization(n) {
    n = BigInt(n);

    let simpleDividers = [];
    let k = BigInt(n);
    let current = findMinFactor(k);

    while(k !== 1n){
        let i = 0n;
        while (k % current === 0n) {
            i++;
            k /= current;
        }
        simpleDividers.push([current, i]);
        if (k === 1n)
            break;
        current = findMinFactor(k, current);
    }
    return simpleDividers;
}

function getMeanForTfmnFactorization(n) {
    n = BigInt(n);

    let simpleDividers = [];
    let k = BigInt(n);
    let current = findMeanForTfmnMinFactor(k);

    while(k !== 1n){
        let i = 0n;
        while (k % current === 0n) {
            i++;
            k /= current;
        }
        simpleDividers.push([current, i]);
        if (k === 1n)
            break;
        current = findMeanForTfmnMinFactor(k, current);
    }
    return simpleDividers;
}

function getPrimeDividersNotBigint(n) {
    let simpleDividers = [];
    let k = n;
    let current = findMinFactorNotBigint(k);
    simpleDividers.push(current);

    while(current !== k){
        while (k % current === 0)
            k /= current;
        if (k === 1)
            break;
        current = findMinFactorNotBigint(k, current);
        simpleDividers.push(current);
    }
    return simpleDividers;
}

function getDividers(n) {
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

function euler(n) {
    n = BigInt(n);
    let dividers = getPrimeDividers(n);
    let val = BigInt(n);
    dividers.forEach((divider) => {
        val /= divider;
        val *= divider - 1n;
    })
    return val;
}

function eulerForTwoPrime(p, q) {
    q = BigInt(q);
    p = BigInt(p);

    return (p - 1n) * (q - 1n);
}

function eulerOfPrimary(n) {
    return BigInt(n) - 1n;
}

function searchRoot(n, power = 2) {
    n = BigInt(n);
    power = BigInt(power);
    if (n === 4n && power === 2n || n === 8n && power === 3n)
        return [true, 2n];
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

function powerByModal(base, power, number) {
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

function getInverseByModal(base, number){
    base = BigInt(base);
    number = BigInt(number);

    let t = 0n, r = base, newt = 1n, newr = number, quotient = 0n, temp = 0n;
    while (newr !== 0n){
        quotient = r / newr;

        temp = t;
        t = newt;
        newt = temp - quotient * newt;

        temp = r;
        r = newr;
        newr = temp - quotient * newr;
    }

    if (r > 1n) return -1n;
    if (t < 0n) return t + base;

    return t;
}

function chines(values, bases) {
    let inv = inversesForChines(values, bases);
    let ccc = prod(values);
    let nnn = prod(bases);
    return values.reduce((result, elem, i) => result +
            ccc * nnn / bases[i] * prod(inv[i]) / inv[i][i] % nnn,
        0n) % nnn;
}

function inversesForChines(c, n) {
    let inv = [];
    for (let i = 0; i < c.length; i++){
        inv.push([])
        for (let j = 0; j < c.length; j++){
            inv[i].push(getInverseByModal(n[i], c[j] * n[j]));
        }
    }
    return inv;
}

function prod(array) {
    return array.reduce((result, elem) => result * BigInt(elem), 1n);
}

function calculateContinuedFraction(numerator, denominator) {
    numerator = BigInt(numerator);
    denominator = BigInt(denominator);

    let result = [];
    while (denominator !== 0n) {
        let stepper = numerator / denominator;
        result.push(stepper);
        let temp = numerator;
        numerator = denominator;
        denominator = temp - stepper * denominator;
    }

    return result;
}

function getApproximationsForContinuedFraction(fraction) {
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

function bezout(a, b) {
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