function printTfmnsForMaxM(maxM){
    return printTfmnsWithPairs(generateUsingGcd(maxM));
}

function printTfmnsWithPairs(tfmns) {
    let str = '';
    tfmns.forEach(tfmn => str += `\n${strTfmnWithPairs(tfmn)}`);
    return str;
}

function strTfmnWithPairs(tfmn) {
    let str = `${tfmn[0]} = ${Factorization(tfmn[0])}`;
    for (let i = 1; i < tfmn.length; i++)
        str += ` = tfmn(${tfmn[i][0]}, ${tfmn[i][1]})`;
    return str;
}

function generateUsingGcd(maxM){
    let time = performance.now();
    console.log(new Date());
    let fmns = [];
    let tfmns = [];
    for (let m1 = 2; m1 < maxM; m1++) {
        for (let n1 = m1 - 1; n1 > 0; n1 -= 2) {
            if (Math.gcd(m1, n1) === 1) {
                let i = fmns.length;
                fmns.push([[m1, n1], null]);
                for (let j = 0; j < i; j++) {
                    let tfmn = fmns[j][1]
                    if (tfmn != null) {
                        if (checkSquareExistUseTfmn(m1, n1, tfmn)) {
                            tfmns[fmns[j][1]].push([m1, n1]);
                            break;
                        }
                        continue;
                    }
                    let m2 = fmns[j][0][0], n2 = fmns[j][0][1];
                    tfmn = checkSquareExist(m1, n1, m2, n2);
                    if (tfmn) {
                        fmns[i][1] = tfmns.length; fmns[j][1] = tfmns.length;
                        tfmns.push([tOf(tfmn), [m2, n2], [m1, n1]]);
                        break;
                    }
                }
            }
        }
        if (m1 % 100 === 0)
            console.log(`m1 = ${m1}, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
    }
    console.log(`Finished, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
    return tfmns;
}

function tOf(n) {
    let primes = getPrimeDividersNotBigint(n);
    primes.forEach(p => {
        while (n % (p * p) === 0) n /= (p * p);
    });
    return n;
}

function tOfBigInt(n) {
    n = BigInt(n);
    let factorization = getFactorization(n);
    return factorization.reduce((prod, elem) => prod * elem[0] ** (elem[1] % 2n), 1n);
}

function tfmnOf(a, b) {
    a = BigInt(a);
    b = BigInt(b);
    return tfmnByFactorizations(
        getFactorization(a),
        getFactorization(b),
        getFactorization(a + b),
        getFactorization(a - b)
    );
}

function tfmnByFactorizations(a, b, apb, amb) {
    let factorization = addFactorization(a, b, apb, amb);
    return factorization.reduce((prod, elem) => prod * elem[0] ** (elem[1] % 2n), 1n);
}

function getFormattedTime(milliseconds) {
    milliseconds = Math.floor(milliseconds)
    if (milliseconds > 1000) {
        let seconds = Math.floor(milliseconds / 1000);
        milliseconds %= 1000;
        if (seconds >= 60) {
            let minutes = Math.floor(seconds / 60);
            seconds %= 60;
            if (minutes >= 60) {
                let hours = Math.floor(seconds / 60);
                minutes %= 60;
                return `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
            }
            return `${minutes}m ${seconds}s ${milliseconds}ms`;
        }
        return `${seconds}s ${milliseconds}ms`;
    }
    return `${milliseconds}ms`;
}

function checkSquareExistUseTfmn(m1, n1, tfmn) {
    let fmn = m1 * n1 * (m1 + n1) * (m1 - n1);
    if (fmn % tfmn !== 0) return false;
    let d = fmn / tfmn;
    return checkSqrt(d);
}

function checkSquareExist(m1, n1, m2, n2) {
    let s1 = m1 + n1;
    let s2 = m2 + n2;
    let d1 = m1 - n1;
    let d2 = m2 - n2;
    //let gcd = gcdForMultiplies([m1, n1, s1, d1], [m2, n2, s2, d2]);
    let fmn1 = m1 * n1 * s1 * d1;
    let fmn2 = m2 * n2 * s2 * d2;
    let gcd = Math.gcd(fmn1, fmn2);
    //return searchRoot(fmn1 / gcd, 2)[0] && searchRoot(fmn2 / gcd, 2)[0];
    let check = checkSqrt(fmn1 / gcd) && checkSqrt(fmn2 / gcd);
    return check ? gcd : false;
}

function checkSqrt(n) {
    let sqrt = Math.sqrt(n);
    return Math.floor(sqrt) ** 2 === n;
}

function gcdForMultiplies(a, b) {
    let gcd = 1;
    a.forEach(ai => b.forEach(bi => gcd *= Math.gcd(ai, bi)));
    return gcd;
}

function getAllMAndNForFmn(fmn) {
    fmn = BigInt(fmn);
    if (fmn % 6n !== 0n) return [];
    let dividers = getDividers(fmn);
    let maxN = searchRoot(fmn, 3)[1];
    let maxM = searchRoot(fmn, 2)[1];
    let minM = searchRoot(fmn, 4)[1] - 1n;
    let result = [];
    for (let mi = 0; mi < dividers.length; mi++) {
        if (dividers[mi] < minM) continue;
        if (dividers[mi] > maxM) break;
        for (let ni = 0; ni < dividers.length; ni++) {
            if (dividers[ni] > min(maxN, dividers[mi] - 1n)) break;
            if ((dividers[ni] + dividers[mi]) % 2n === 0n) continue;
            if (Math.gcd(dividers[ni], dividers[mi]) !== 1n) continue;
            let current = Fmn(dividers[mi], dividers[ni]);
            if (current !== fmn) continue;
            result.push([dividers[mi], dividers[ni]]);
        }
    }
    return result;
}

function getAllFmnForTfmn(tfmn, maxK = 100n) {
    let result = [];
    let plus = 1n;
    tfmn = BigInt(tfmn);
    if (tfmn % 2n !== 0n) plus *= 2n;
    if (tfmn % 3n !== 0n) plus *= 3n;
    let k = 1n;
    tfmn *= plus ** 2n;
    while (k < maxK) {
        let fmn = tfmn * (k ** 2n);
        let res = getAllMAndNForFmn(fmn);
        if (res.length !== 0) result.push([fmn, res]);
        k++;
        if (k % 100n === 0n)
            console.log(`k = ${k}, fmn = ${fmn}, length = ${result.length}, ${(new Date()).toTimeString()}`);
    }
    return result;
}

function getAllFmnForTfmn2(tfmn, maxK = 100n) {
    let result = [];
    tfmn = BigInt(tfmn);
    maxK = BigInt(maxK);
    let factor = 1n;
    if (tfmn % 2n !== 0n) factor *= 2n;
    if (tfmn % 3n !== 0n) factor *= 3n;
    let max = tfmn * (maxK ** 2n) * (factor ** 2n);

    for (let m = 2n; ; m++) {
        if (Fmn(m, 1n) > max) break;
        for (let n = (m % 2n) + 1n; n < m; n += 2n) {
            if (Math.gcd(m, n) !== 1n) continue;
            let fmn = Fmn(m, n);
            if (fmn % tfmn !== 0n) continue;
            let c = fmn / tfmn;
            if (searchRoot(c, 2n)[0]) {
                result.push([fmn, m, n]);
            }
        }
        if (m % 1000n === 0n)
            console.log(`m = ${m}, length = ${result.length}, ${(new Date()).toTimeString()}`);
    }
    return result;
}

function F7(a, b) {
    a = BigInt(a); b = BigInt(b);
    return [(a ** 2n + b ** 2n) ** 2n, 4n * Fmn(a, b)];
}

function factorizeAllUntil(n) {
    let factorizations = [];
    factorizations.push([[0n, 1n]], [[1n, 1n]]);
    for (let i = 2n; i <= n; i++){
        let minFactor = FindMinFactor(i);
        if (minFactor === i)
            factorizations.push([[i, 1n]]);
        else
            factorizations.push(addFactorToList(factorizations[i / minFactor], minFactor));
    }
    return factorizations;
}

function addFactorToList(list, factor) {
    let check = false;
    let index = list.length;
    for (let i = 0; i < list.length; i++) {
        if (list[i][0] === factor) {
            check = true;
            index = i;
            break;
        }
        if (list[i][0] > factor) {
            index = i;
            break;
        }
    }

    let newList = [];
    if (check) {
        for (let i = 0; i < list.length; i++) {
            newList.push([list[i][0], list[i][1]]);
        }
        newList[index][1]++;
    }
    else {
        for (let i = 0; i < index; i++) {
            newList.push([list[i][0], list[i][1]]);
        }
        newList.push([factor, 1n]);
        for (let i = index; i < list.length; i++) {
            newList.push([list[i][0], list[i][1]]);
        }
    }

    return newList;
}

function addFactorization() {
    if (arguments.length === 1) return arguments[0];
    let list1 = arguments[0].map(elem => elem);
    if (arguments.length === 2) {
        let list2 = arguments[1];
        list2.forEach(element => {
            let index = binarySearchIndex(list1, elem => elem[0] === element[0] ? 0 : elem[0] > element[0] ? 1 : -1);
            if (index < 0) {
                insert(element, ~index, list1);
            }
            else
                list1[index][1] += element[1];
        })
        return list1;
    }
    for (let i = 1; i < arguments.length; i++) {
        list1 = addFactorization(list1, arguments[i]);
    }
    return list1;
}

function generateUsingFactorizationAndBinarySearch(maxM) {
    let factorizations = factorizeAllUntil(2 * maxM);
    let time = performance.now();
    console.log(new Date());
    let tfmns = [];
    for (let m = 1; m <= maxM; m++) {
        for (let n = m - 1; n > 0; n -= 2) {
            if (Math.gcd(m, n) !== 1) continue;
            let tfmn = tfmnByFactorizations(
                factorizations[m],
                factorizations[n],
                factorizations[m + n],
                factorizations[m - n]
            );
            let index = binarySearchIndex(tfmns, compareTfmn(tfmn));
            if (index < 0n)
                insert([tfmn, [m, n]], ~index, tfmns);
            else {
                tfmns[index].push([m, n]);
            }
        }
        if (m % 100 === 0)
            console.log(`m = ${m}, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
    }
    console.log(`Finished, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
    return tfmns.filter(tfmn => tfmn.length >= 3);
}

function generateUsingUsualFilter(maxM) {
    let time = performance.now();
    console.log(new Date());
    let tfmns = [];
    for (let m = 1; m <= maxM; m++) {
        for (let n = m - 1; n > 0; n -= 2) {
            if (Math.gcd(m, n) !== 1) continue;
            let tfmn = tOf(Fmn(m, n));
            let index = tfmns.findIndex(elem => elem[0] === tfmn);
            if (index === -1)
                tfmns.push([tfmn, [m, n]]);
            else {
                tfmns[index].push([m, n]);
            }
        }
        if (m % 100 === 0)
            console.log(`m = ${m}, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
    }
    console.log(`Finished, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
    return tfmns.filter(tfmn => tfmn.length >= 3).sort((tfmn1, tfmn2) => {
        if (tfmn1[0] >= tfmn2[0]) return 1;
        return -1;
    });
}

function generateUsingUsualFilterAndBinarySearch(maxM) {
    let time = performance.now();
    console.log(new Date());
    let tfmns = [];
    for (let m = 1n; m <= maxM; m++) {
        for (let n = m - 1n; n > 0n; n -= 2n) {
            if (Math.gcd(m, n) !== 1n) continue;
            let tfmn = tfmnOf(m, n);
            let index = binarySearchIndex(tfmns, compareTfmn(tfmn));
            if (index < 0n)
                insert([tfmn, [m, n]], ~index, tfmns);
            else {
                tfmns[index].push([m, n]);
            }
        }
        if (m % 100n === 0n)
            console.log(`m = ${m}, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
    }
    console.log(`Finished, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
    return tfmns.filter(tfmn => tfmn.length >= 3);
}

function binarySearchIndex(array, checker) {
    if (array.length === 0) return ~0;
    if (checker(array[0]) === 0) return 0;
    let start = 0;
    let end = array.length;
    while (end > start + 1) {
        let middle = Div((start + end), 2);
        if (checker(array[middle]) === 0)
            return middle;
        if (checker(array[middle]) === 1)
            end = middle;
        else
            start = middle;
    }
    return ~end;
}

function insert(value, index, array) {
    array.splice(index, 0, value);
    return array;
}

function compareTfmn(value) {
    return tfmn => tfmn[0] === value ? 0 : tfmn[0] > value ? 1 : -1;
}

function F1ForGenerating(m, n) {
    let mm = m ** 2;
    let nn = n ** 2;
    let mmMinus2nn = mm - 2 * nn;
    let n6n = 6 * nn;
    return [mmMinus2nn, n6n, 2 * mmMinus2nn, mmMinus2nn + n6n];
}

function F3ForGenerating(m, n) {
    let mm = m ** 2;
    let nn = n ** 2;
    let mmPlus2nn = mm + 2 * nn;
    let mmMinusNn = mm - nn;
    return [mmPlus2nn, mmMinusNn, mmPlus2nn + mmMinusNn, mmMinusNn];
}

function F4ForGenerating(m, n) {
    let mm = m ** 2;
    let nn = n ** 2;
    let mn = m * n;
    let a = mm + mn + nn;
    return [a, mm - nn, a, mm + nn];
}

function F7ForGenerating(m, n) {
    m = BigInt(m);
    n = BigInt(n);
    return [m, n, (m ** 2n + n ** 2n) ** 2n, 4n * Fmn(m, n)];
}

function generateForOnlyOne(maxM, string) {
    switch (string) {
        case "F1":
            return generateForOnlyOneF(maxM, F1ForGenerating);
        case "F3":
            return generateForOnlyOneF(maxM, F3ForGenerating);
        case "F4":
            return generateForOnlyOneF(maxM, F4ForGenerating);
        default:
            return generateForOnlyOneF(maxM, F7ForGenerating);
    }
}

function generateForOnlyOneF(maxM, method) {
    let time = performance.now();
    console.log(new Date());
    let tfmns = [];
    for (let m = 1; m <= maxM; m++) {
        for (let n = m - 1; n > 0; n -= 2) {
            if (Math.gcd(m, n) !== 1) continue;
            let all = method(m, n);
            //let gcd = Math.gcd(all[0], all[1]);
            //all = all.map(one => one / gcd);
            let tfmn = tOf(Fmn(all[0], all[1]));
            let index = binarySearchIndex(tfmns, compareTfmn(tfmn));
            if (index < 0)
                insert([tfmn, [all[0], all[1]], [all[2], all[3]]], ~index, tfmns);
            else {
                tfmns[index].push([all[0], all[1]], [all[2], all[3]]);
            }
        }
        if (m % 100 === 0)
            console.log(`m = ${m}, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
    }
    console.log(`Finished, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
    return tfmns.filter(tfmn => tfmn.length >= 3);
}

function F8NextStep(a, b) {
    a = BigInt(a);
    b = BigInt(b);
    if (a % 2n !== 0n) return [];
    let x2 = a ** 4n / 2n + b ** 4n;
    let x = searchRoot(x2);
    if (!x[0]) return [];
    x = x[1];
    let y = a * b;
    let v2 = abs(4n * x2 ** 2n - 8n * y ** 4n);
    let u = 4n * x * y;
    let v = searchRoot(v2)[1];
    let gcd = Math.gcd(u, v);
    return [u / gcd, v / gcd];
}

function F8ForGenerate(u, v) {
    u = BigInt(u);
    v = BigInt(v);
    let u4 = u ** 4n;
    let v4 = v ** 4n;
    let u2v2 = u ** 2n * v ** 2n;
    return [u4 + 2n * v4, 2n * v4, u4 + 4n * v4, 4n * u2v2];
}

function searchResourceForF8(maxM) {
    let resources = [];
    for (let m = 2n; m <= maxM; m++) {
        for (let n = m - 1n; n > 0n; n -= 2n) {
            if (Math.gcd(m, n) !== 1n) continue;
            let a = m % 2n === 0n ? m : n;
            let b = m === a ? n : m;
            let x2 = a ** 4n / 2n + b ** 4n;
            if (searchRoot(x2)[0]) resources.push([m, n]);
        }
    }
    return resources;
}

function F8NextSteps(maxLength, startA, startB) {
    let a = BigInt(startA);
    let b = BigInt(startB);
    let f8 = F8ForGenerate(a, b);
    let tfmns = [[tfmnOf(f8[0], f8[1]), [f8[0], f8[1]], [f8[2], f8[3]]]];
    while (tfmns[tfmns.length - 1][0].toString().length < maxLength) {
        let next = F8NextStep(a, b);
        a = next[0];
        b = next[1];
        f8 = F8ForGenerate(a, b);
        tfmns.push([tfmnOf(f8[0], f8[1]), [f8[0], f8[1]], [f8[2], f8[3]]]);
    }
    return tfmns;
}

function generateForOnlyF8(maxM, maxLength) {

}

function generateWithPrepareFiltration(maxM) {
    let factorizations = factorizeAllUntil(2 * maxM);
    let time = performance.now();
    console.log(new Date());
    let tfmns = [];
    for (let m = 1; m <= maxM; m++) {
        for (let n = m - 1; n > 0; n -= 2) {
            if (Math.gcd(m, n) !== 1) continue;
            let tfmn = tfmnByFactorizations(
                factorizations[m],
                factorizations[n],
                factorizations[m + n],
                factorizations[m - n]
            );
            let index = binarySearchIndex(tfmns, compareTfmn(tfmn));
            if (index < 0n)
                insert([tfmn, [m, n]], ~index, tfmns);
            else {
                tfmns[index].push([m, n]);
            }
        }
        if (m % 100 === 0)
            console.log(`m = ${m}, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
        tfmns = tfmns.filter(tfmn => tfmn.length >= 3 || tfmn[tfmn.length - 1][0] > 3 * m / 4);
    }
    console.log(`Finished, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
    return tfmns.filter(tfmn => tfmn.length >= 3);
}

function generateForPithagorasOf(maxM, type) {
    switch (type) {
        case 1: return generateForPithagoras(maxM, getPithagoras1);
        case 2: return generateForPithagoras(maxM, getPithagoras2);
        default: return generateForPithagoras(maxM, getPithagoras3);
    }
}

function generateForPithagoras(maxM, getter) {
    let time = performance.now();
    console.log(new Date());
    let tfmns = [];
    for (let m = 1n; m <= maxM; m++) {
        for (let n = m - 1n; n > 0n; n -= 2n) {
            if (Math.gcd(m, n) !== 1n) continue;
            let abt = getter(m ,n);
            let tfmn = tOfBigInt(abt[2]);
            let index = binarySearchIndex(tfmns, compareTfmn(tfmn));
            if (index < 0n)
                insert([tfmn, [abt[0], abt[1]]], ~index, tfmns);
            else {
                tfmns[index].push([abt[0], abt[1]]);
            }
        }
        if (m % 100n === 0n)
            console.log(`m = ${m}, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
    }
    console.log(`Finished, length = ${tfmns.length}, current time: ${getFormattedTime(performance.now() - time)}`);
    return tfmns;
}

function getPithagoras1(m, n) {
    let mm = m ** 2n;
    let nn = n ** 2n;
    let a = (mm - nn) ** 2n;
    let b = 4n * mm * nn;
    return [max(a, b), min(a, b), abs(mm ** 2n + nn ** 2n - 6n * mm * nn)];
}

function getPithagoras2(m, n) {
    let mm = m ** 2n;
    let nn = n ** 2n;
    return [(mm + nn) ** 2n, 4n * mm * nn, abs(mm ** 2n + nn ** 2n + 6n * mm * nn)];
}

function getPithagoras3(m, n) {
    let mm = m ** 2n;
    let nn = n ** 2n;
    let a = mm ** 2n + 4n * nn ** 2n;
    let b = 4n * mm * nn;
    return [a, 4n * mm * nn, a];
}

function tfmnListMinus(list1, list2) {
    return list1.filter(elem => {
        for (let i = 0; i < list2.length; i++) {
            if (elem[0] === list2[i][0]) return false;
        }
        return true;
    });
}

function tfmnListUnion() {
    if (arguments.length === 1) return arguments[0].slice();
    let union = arguments[0].slice();
    if (arguments.length === 2) {
        let second = arguments[1].slice();
        second.forEach(elem => {
            let index = binarySearchIndex(union, compareTfmn(elem[0]));
            if (index < 0)
                insert(elem, ~index, union);
            else
                union[index] = mergeTfmn(union[index], elem);
        });
        return union;
    }
    for (let i = 1; i < arguments.length; i++)
        union = tfmnListUnion(union, arguments[i]);
    return union;
}

function mergeTfmn(first, second) {
    let result = [];
    result.push(first[0]);
    let i = 1, j = 1;
    while (i < first.length && j < second.length) {
        if (first[i][0] < second[j][0]) {
            result.push(first[i]);
            i++;
        }
        else if (first[i][0] > second[j][0]) {
            result.push(second[j]);
            j++;
        }
        else if (first[i][1] < second[j][1]) {
            result.push(first[i]);
            i++;
        }
        else if (first[i][1] > second[j][1]) {
            result.push(second[j]);
            j++;
        }
        else {
            result.push(first[i]);
            i++;
            j++;
        }
    }
    while (i < first.length) {
        result.push(first[i]);
        i++;
    }
    while (j < second.length) {
        result.push(second[j]);
        j++;
    }
    return result;
}