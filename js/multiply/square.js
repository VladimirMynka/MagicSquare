const MAGIC_SQUARE = 1;
const CHARMING_SQUARE = 0;

const ROTATE_LEFT = 0;
const ROTATE_RIGHT = 1;
const TRANSPOSE = 2;
const MINIMIZE = 3;
const MULTIPLY_ON = 4;
const FACTORIZE = 5;


let magicFormulas = [
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

let charmingFormulas = [
    (E, x, y) => BigInt(E) + 2n * BigInt(x) - BigInt(y),
    (E, x, y) => BigInt(E) - BigInt(x) - BigInt(y),
    (E, x, y) => BigInt(E) - BigInt(x) + 2n * BigInt(y),
    (E, x, y) => BigInt(E) - BigInt(x) - BigInt(y),
    (E, x, y) => BigInt(E) + 2n * BigInt(x) + 2n * BigInt(y),
    (E, x, y) => BigInt(E) - BigInt(x) - BigInt(y),
    (E, x, y) => BigInt(E) - BigInt(x) + 2n * BigInt(y),
    (E, x, y) => BigInt(E) - BigInt(x) - BigInt(y),
    (E, x, y) => BigInt(E) + 2n * BigInt(x) - BigInt(y)
]

class Square {
    constructor(E = 5n, x = 3n, y = 1n, type = MAGIC_SQUARE) {
        this.$squareWrapper = $('.square-wrapper.d-none').clone();
        this.$squareWrapper.removeClass('d-none');
        $('.square-container').append(this.$squareWrapper);

        this.$square = this.$squareWrapper.find('.square');
        this.$inputType = this.$squareWrapper.find('select');
        this.$inputE = this.$squareWrapper.find('.input-E');
        this.$inputX = this.$squareWrapper.find('.input-x');
        this.$inputY = this.$squareWrapper.find('.input-y');

        this.squareType = type; this.$inputType.val(type === CHARMING_SQUARE ? 'c' : 'm');
        this.E = BigInt(E);     this.$inputE.val(E);
        this.x = BigInt(x);     this.$inputX.val(x);
        this.y = BigInt(y);     this.$inputY.val(y);
        this.factorize = false;

        this.cells = [
            this.$square.find('.Ex'),
            this.$square.find('.E-xy'),
            this.$square.find('.E-y'),
            this.$square.find('.E-x-y'),
            this.$square.find('.E'),
            this.$square.find('.Exy'),
            this.$square.find('.Ey'),
            this.$square.find('.Ex-y'),
            this.$square.find('.E-x')
        ]

        this.$inputType.on('change', () => this.onChangeType(this.$inputType.val()));
        this.$inputE.on('change', () => this.onChangeE(this.$inputE.val()));
        this.$inputX.on('change', () => this.onChangeX(this.$inputX.val()));
        this.$inputY.on('change', () => this.onChangeY(this.$inputY.val()));

        this.operator = null;
        this.$oneOperationSelect = this.$squareWrapper.find('.operator-one-select');
        this.$numberInput = this.$squareWrapper.find('.number-input');
        this.$operatorButton = this.$squareWrapper.find('.apply-one-operator');
        this.$oneOperationSelect.on('change', () => {
            this.operator = +this.$oneOperationSelect.val();
            if(this.operator === MULTIPLY_ON)
                this.$numberInput.removeClass('d-none');
            else
                this.$numberInput.addClass('d-none');
        });
        this.$operatorButton.on('click', () => {
            let z;
            switch (this.operator) {
                case ROTATE_LEFT:
                    z = this.x;
                    this.setX(-this.y);
                    this.setY(z);
                    break;
                case ROTATE_RIGHT:
                    z = this.x;
                    this.setX(this.y);
                    this.setY(-z);
                    break;
                case TRANSPOSE:
                    this.setY(-this.y);
                    break;
                case MINIMIZE:
                    z = Math.gcd(this.E, this.x, this.y);
                    this.setE(this.E / z);
                    this.setX(this.x / z);
                    this.setY(this.y / z);
                    break;
                case MULTIPLY_ON:
                    z = BigInt(this.$numberInput.val());
                    this.setE(this.E * z);
                    this.setX(this.x * z);
                    this.setY(this.y * z);
                    break;
                case FACTORIZE:
                    this.factorize = true;
                    this.fillSquare();
            }
        })

        this.fillSquare();
    }

    fillSquare() {
        let formulas = this.squareType === MAGIC_SQUARE ? magicFormulas : charmingFormulas;
        this.cells.forEach((cell, i) => {
            let value = formulas[i](this.E, this.x, this.y);
            cell.text((this.factorize ? factorization(value) : value));
            if (searchRoot(value)[0])
                cell.addClass('red');
            else
                cell.removeClass('red');
        });
    }

    onChangeType(type) {
        this.squareType = (type === 'c' ? CHARMING_SQUARE : MAGIC_SQUARE);
        this.fillSquare();
    }

    onChangeE(newE) {
        this.E = BigInt(newE);
        this.fillSquare();
    }

    onChangeX(newX) {
        this.x = BigInt(newX);
        this.fillSquare();
    }

    onChangeY(newY) {
        this.y = BigInt(newY);
        this.fillSquare();
    }

    getMath() {
        return new SquareMath(this.E, this.x, this.y, this.squareType);
    }

    remove() {
        this.$squareWrapper.remove();
    }

    insertBefore(elem) {
        this.$squareWrapper.before(elem);
    }

    setE(E) {
        this.E = BigInt(E);
        this.$inputE.val(E);
        this.fillSquare();
    }

    setX(x) {
        this.x = BigInt(x);
        this.$inputX.val(x);
        this.fillSquare();
    }

    setY(y) {
        this.y = BigInt(y);
        this.$inputY.val(y);
        this.fillSquare();
    }
}

class SquareMath {
    constructor(E = 5n, x = 3n, y = 1n, type = MAGIC_SQUARE) {
        this.E = BigInt(E);
        this.x = BigInt(x);
        this.y = BigInt(y);
        this.type = type;
    }

    add(otherSquare) {
        if (this.type !== otherSquare.type){
            alert("Сложение между квадратами разных видов не тудасюдакается");
            return new SquareMath(0n, 0n, 0n, MAGIC_SQUARE);
        }
        return new SquareMath(
            this.E + otherSquare.E,
            this.x + otherSquare.x,
            this.y + otherSquare.y,
            this.type
        )
    }

    minus(otherSquare) {
        if (this.type !== otherSquare.type){
            alert("Сложение между квадратами разных видов не тудасюдакается");
            return new SquareMath(0n, 0n, 0n, MAGIC_SQUARE);
        }
        return new SquareMath(
            this.E - otherSquare.E,
            this.x - otherSquare.x,
            this.y - otherSquare.y,
            this.type
        )
    }

    multiply(otherSquare) {
        let E1 = this.E, x1 = this.x, y1 = this.y, t1 = this.type;
        let E2 = otherSquare.E, x2 = otherSquare.x, y2 = otherSquare.y, t2 = otherSquare.type;
        let params;
        if (t1 === MAGIC_SQUARE)
            if (t2 === MAGIC_SQUARE) params = this.mm(E1, x1, y1, E2, x2, y1);
            else params = this.mc(E1, x1, y1, E2, x2, y1);
        else
            if (t2 === MAGIC_SQUARE) params = this.cm(E1, x1, y1, E2, x2, y1);
            else params = this.cc(E1, x1, y1, E2, x2, y1);

        return new SquareMath(...params);
    }

    getRealSquare() {
        return new Square(this.E, this.x, this.y, this.type);
    }

    mm(E1, x1, y1, E2, x2, y2) {
        return [
            3n * E1 * E2,
            x1 * x2 - y1 * y2,
            y1 * x2 - x1 * y2,
            CHARMING_SQUARE
        ]
    }

    mc(E1, x1, y1, E2, x2, y2) {
        return [
            3n * E1 * E2,
            3n * (x1 * x2 - y1 * y2),
            3n * (y1 * x2 - x1 * y2),
            MAGIC_SQUARE
        ]
    }

    cm(E1, x1, y1, E2, x2, y2) {
        return [
            3n * E1 * E2,
            3n * (x1 * x2 + y1 * y2),
            3n * (y1 * x2 + x1 * y2),
            MAGIC_SQUARE
        ]
    }

    cc(E1, x1, y1, E2, x2, y2) {
        return [
            3n * E1 * E2,
            3n * (x1 * x2 + y1 * y2),
            3n * (y1 * x2 + x1 * y2),
            CHARMING_SQUARE
        ]
    }
}