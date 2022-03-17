function searchCloseKeyBySearchMinFactor(n, openKey){
    return searchCloseKey(n, openKey, findMinFactor);
}

function searchCloseKeyByFermat(n, openKey) {
    return searchCloseKey(n, openKey, minFactorByFermat);
}

function searchCloseKey(n, openKey, firstFactorSearcher) {
    n = BigInt(n);
    openKey = BigInt(openKey);
    let phi = EulerFromTwoPrime(n, firstFactorSearcher(n));
    return getInverseByModal(phi, openKey);
}

function rsaDecode(n, closeKey, message){
    return number0xToText(powerByModal(n, closeKey, message).toString(16));
}

function rsaEncode(n, openKey, message){
    return powerByModal(n, openKey, textToNumber0x(message));
}

function number0xToText(message){
    let translate = "";
    for (let i = 0; i < message.length; i+=2){
        translate += String.fromCharCode(+("0x" + message[i] + message[i+1]))
    }
    return translate;
}

function textToNumber0x(message){
    let translate = "0x";
    for (let i = 0; i < message.length; i++){
        translate += (message[i]).charCodeAt(0).toString(16);
    }
    return translate;
}

function minFactorByFermat(n){
    n = BigInt(n);
    let x = searchRoot(n, 2n)[1];
    while (true) {
        let root = searchRoot(x ** 2n - n, 2n);
        if(root[0]) return x - root[1];
        x++;
    }
    return -1;
}

function tryDecode(n, message) {
    for (let i = 1n; true; i++){
        let encrypt = rsaDecode(n, i, message);
        if (encrypt.slice(0, 4) === "RSA{")
            return encrypt;
    }
}

function tryDecodeFromMax(n, message) {
    for (let i = n - 1n; true; i--){
        let encrypt = rsaDecode(n, i, message);
        if (encrypt.slice(0, 4) === "RSA{")
            return encrypt;
    }
}

function tryDecodeFromE(n, e, message) {
    for (let i = 0n; true; i--){
        let encrypt = rsaDecode(n, e + i, message);
        if (encrypt.slice(0, 4) === "RSA{")
            return encrypt;
        encrypt = rsaDecode(n, e - i, message);
        if (encrypt.slice(0, 4) === "RSA{")
            return encrypt;
    }
}

function FranklinReuterDecode(e, base, c_wrong, c_correct, vector){
    let vec1 = vecPower(vector, e);
    vec1[vec1.length - 1] -= c_correct;
    let vec2 = vecPower([1, 0], e);
    vec2[vec2.length - 1] -= c_wrong;

    let gcd = vecGcd(vec1, vec2, base);
    let inverse = getInverseByModal(base, gcd[0]);
    let result = -gcd[1] * inverse % base;
    return number0xToText(result.toString(16)) + '}';
}

function HastadDecode(e, bases, messages){
    return number0xToText(searchRoot(chines(messages, bases), e)[1].toString(16));
}

function WienerDecode(n, e, c) {
    n = BigInt(n); e = BigInt(e); c = BigInt(c);
    let approxes = getApproximationsForContinuedFraction(calculateContinuedFraction(e, n));
    for (let i = 1; i < approxes.length; i++){
        let phi = (e * approxes[i][1] - 1n) / approxes[i][0];
        let solves = quadraticEquation(phi - n - 1n, n);
        if (solves[0] * solves[1] === n)
            return rsaDecode(n, approxes[i][1], c);
    }

    return "hvatit!!!";
}

function decodeByCommonBase(n, e1, e2, c1, c2){
    let st = bezout(e1, e2);
    let m1 = powerByModal(n, st[0], c1);
    let m2 = powerByModal(n, st[1], c2);
    return number0xToText(((m1 * m2) % n).toString(16));
}