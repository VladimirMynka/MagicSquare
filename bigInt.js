class MyBigInt {
    constructor(number = ""){
        let numberStr = String(number)
        this.number = new Array()
        for(let i = numberStr.length - 1; i >= 0; i--){
            this.number.push(Number(numberStr[i]))
        }
    }

    copy(){
        let other = new MyBigInt()
        for(let i = 0; i < this.getLength(); i++){
            other.push(this.getAt(i))
        }

        return other
    }

    push(value){
        this.number.push(value)
    }

    pop(){
        this.number.pop()
    }

    getLength(){
        return this.number.length
    }

    getAt(index){
        return this.number[index]
    }

    setAt(index, value){
        this.number[index] = value
    }

    getLast(){
        return this.getAt(this.getLength() - 1)
    }

    isMore(other){
        if (this.getLength() > other.getLength()) return true
        if (this.getLength() < other.getLength()) return false
        let i = this.getLength() - 1
        while (this.getAt(i) == other.getAt(i) && i > 0) i--
        return (this.getAt(i) > other.getAt(i))
    }

    isLittle(other){
        if (this.getLength() > other.getLength()) return false
        if (this.getLength() < other.getLength()) return true
        let i = this.getLength() - 1
        while (this.getAt(i) == other.getAt(i) && i > 0) i--
        return (this.getAt(i) < other.getAt(i))
    }

    isEqual(other){
        if (this.getLength() != other.getLength()) return false
        for(let i = 0; i < this.getLength(); i++){
            if(this.getAt(i) != other.getAt(i)) return false
        }
        return true
    }

    plus(other){
        let bigSum = new MyBigInt()
        let memory = 0
        let i = 0
        for(; i < Math.max(this.getLength(), other.getLength()); i++){
            let first = (this.getAt(i) != null) ? this.getAt(i) : 0
            let second = (other.getAt(i) != null) ? other.getAt(i) : 0
            let sum = first + second + memory
            bigSum.push(sum % 10)
            memory = Div(sum, 10)
        }
        if (memory != 0) bigSum.push(memory)
        return bigSum
    }

    minus(other){
        let bigDiff = new MyBigInt()
        let memory = 0
        let i = 0
        for(; i < Math.max(this.getLength(), other.getLength()); i++){
            let first = (this.getAt(i) != null) ? this.getAt(i) : 0
            let second = (other.getAt(i) != null) ? other.getAt(i) : 0
            let diff = first - second - memory
            if (diff < 0){
                memory = 1
                diff += 10
            }
            else memory = 0
            bigDiff.push(diff)
        }
        bigDiff.deleteZeros()
        return bigDiff
    } 

    multiply(other){
        let bigMulti = new MyBigInt()
        let memory = 0
        let sum = 0
        let i = 0
        for(; i < this.getLength() + other.getLength() - 1; i++){
            sum = memory
            for(let j = Math.min(i, this.getLength() - 1); j >= 0; j--){
                if (other.getAt(i - j) == null) break
                sum += this.getAt(j) * other.getAt(i - j)
            }
            bigMulti.push(sum % 10)
            memory = Div(sum, 10)
        }
        while(memory > 0){
            bigMulti.push(memory % 10)
            memory = Div(memory, 10)
        }
        bigMulti.deleteZeros()
        return bigMulti
    }

    deleteZeros(){
        while(this.getLast() == 0 && this.getLength() > 1) this.pop()
    }

    toString(){
        let str = ""
        for (let i = this.number.length - 1; i >= 0; i--){
            str += this.number[i]
        }
        return str
    }
}


document.getElementById("square").onclick = () => {
    let a = new MyBigInt("100")
    let b = new MyBigInt("0")
    console.log(
        a.toString(), 
        b.toString(), 
        a.plus(b).toString(), 
        a.minus(b).toString(), 
        a.multiply(b).toString()
    )
}