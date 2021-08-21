class BigInt {
    constructor(number = 0){
        this.number = new Array()
        this.positive = (number > 0)
        while(number > 0){
            this.number.push(number % 10)
            number = Div(number, 10)
        }
    }

    plus(other){
        let bigSum = new BigInt()
        let memory = 0
        let i = 0
        for(; i < Math.max(this.number.length, other.number.length); i++){
            let first = (this.number[i] != null) ? this.number[i] : 0
            let second = (other.number[i] != null) ? other.number[i] : 0
            let sum = first + second + memory
            bigSum.number.push(sum % 10)
            memory = Div(sum, 10)
        }
        if (memory != 0) bigSum.number.push(memory)
        return bigSum
    }

    minus(other){
        let bigDiff = new BigInt()
        let memory = 0
        let i = 0
        for(; i < Math.max(this.number.length, other.number.length); i++){
            let first = (this.number[i] != null) ? this.number[i] : 0
            let second = (other.number[i] != null) ? other.number[i] : 0
            let diff = first - second - memory
            if (diff < 0){
                memory = 1
                diff += 10
            }
            else memory = 0
            bigDiff.number.push(diff)
        }
        return bigDiff
    }

    toString(){
        let str = ""
        for (let i = this.number.length - 1; i >= 0; i--){
            str += this.number[i]
        }
        return str
    }
}

let a = new BigInt(58496543)
let b = new BigInt(57846532)
console.log(a.toString(), b.toString(), a.plus(b).toString(), a.minus(b).toString())