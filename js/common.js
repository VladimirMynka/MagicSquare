function GetE(a1, b1, a2, b2) {
    a1 = BigInt(a1);
    b1 = BigInt(b1);
    a2 = BigInt(a2);
    b2 = BigInt(b2);

    let sum1 = a1 * a1 + b1 * b1;
    let sum2 = a2 * a2 + b2 * b2;
    let gcd = Math.gcd(sum1, sum2)
    let E = sum1 * sum2 / gcd;
    E = reduce(E, 2);
    return E;
}

function DirxE(a, b, E) {
    a = BigInt(a);
    b = BigInt(b);
    E = BigInt(E);

    let v = (a * a + b * b);
    return 4n * a * b * (a * a - b * b) * E * E / v / v;
}

function max(a, b) {
    return a > b ? a : b;
}

function min(a, b) {
    return a < b ? a : b;
}

function abs(a) {
    return a > 0 ? a : -a;
}

function t(n) {
    n = BigInt(n);
    let k = n;
    for(let i = 2n; i * i <= abs(n); i++){
        while (k % (i*i) === 0n) k /= (i*i);
    }
    return +k;
}

function first(m, n) {
    m = BigInt(m); n = BigInt(n);

    return m ** 4n - 6n * n ** 2n * m ** 2n + n ** 4n;
}

function second(m, n) {
    m = BigInt(m); n = BigInt(n);

    return m**4n + 4n * n**4n;
}

function third(m, n) {
    m = BigInt(m); n = BigInt(n);

    return m**4n + 6n * m**2n * n**2n + n**4n;
}

function printFor(func, z) {
    let str = ``;
    for (let m = 1; m < z; m++){
        for (let n = 1; n <= m; n++){
            if (Math.gcd(m, n) != 1) continue;
            let x = Math.abs(func(m, n));
            str += `${m} ${n}: ${factorization(x)}, ${factorization(t(x))} 
`;
        }
    }
    console.log(str);
}

function printFmnFor(y, z) {
    let str = ``;
    for (let a = y; a < z; a++){
        for (let b = 1; b < a; b++){
            let f1 = fmn(a,b)
            for (let c = 1; c < a; c++){
                for (let d = 1; d < c; d++){
                    if (a == d || b == c || b == d || a-b == c+d || a+b == c+d) continue;
                    if (a % 2 == b % 2 && c % 2 == d % 2) continue;
                    if (Math.gcd(Math.gcd(a,b), Math.gcd(c, d)) != 1) continue;
                    let f2 = fmn(c, d);
                    if (f1 == f2) str += `f(${a}, ${b}) = f(${c}, ${d})
`;
                }
            }
        }
    }
    console.log(str);
}

let c = (a, b) => (BigInt(a) ** 2n + BigInt(b) ** 2n) ** 2n;

let f = (a, b) => {
    a = BigInt(a); b = BigInt(b);
    return a * b * (a ** 2n - b ** 2n);
}
let g = (a, b) => {
    a = BigInt(a); b = BigInt(b);
    return a * b * (a ** 2n + b ** 2n);
}

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



