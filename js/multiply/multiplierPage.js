const PLUS = 0;
const MINUS = 1;
const MULTIPLY = 2;

let squares = [];
let operations = [];
let result = null;
let button = document.getElementById("add-square-button");
let calculateButton = document.getElementById("calculate-button");

window.onload = () => {
    button.onclick = () => {
        squares.push(new Square(5n, 3n, 1n, 0));
        if (squares.length > 1) {
            let $operation = $('.operation-select.d-none').clone();
            $operation.removeClass('d-none');
            squares[squares.length - 1].insertBefore($operation);
            operations.push(PLUS);
            let i = operations.length - 1;
            $operation.on('change', () => {
                switch ($operation.val()) {
                    case '+':
                        operations[i] = PLUS; break;
                    case '-':
                        operations[i] = MINUS; break;
                    case '×':
                        operations[i] = MULTIPLY; break;
                }
            });
        }
    }

    calculateButton.onclick = () => {
        let needEqualSymbol = false;
        if (result !== null) {
            result.remove();
        }
        else
           needEqualSymbol = true;
        let resultMath = squares[0].getMath();
        for (let i = 1; i < squares.length; i++) {
            switch (operations[i - 1]) {
                case PLUS:
                    resultMath = resultMath.add(squares[i].getMath());
                    break;
                case MINUS:
                    resultMath = resultMath.minus(squares[i].getMath());
                    break;
                case MULTIPLY:
                    resultMath = resultMath.multiply(squares[i].getMath());
                    break;
            }
        }
        result = resultMath.getRealSquare();
        if (needEqualSymbol)
            result.insertBefore($('<div style="font-size: 24px">=</div>'));
    }

    button.click();
    button.click();
}

