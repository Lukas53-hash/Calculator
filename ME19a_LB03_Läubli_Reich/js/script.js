class Calculator {
    constructor(previousOperandtextElement, currentOperandtextElement) {
        this.previousOperandtextElement = previousOperandtextElement;
        this.currentOperandtextElement = currentOperandtextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {

    }

    appendNumber(number) {
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {

    }

    compute() {

    }

    updateDisplay() {
        this.currentOperandtextElement.innerText = this.currentOperand;
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandtextElement = document.querySelector('[data-previous-operand]');
const currentOperandtextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandtextElement, currentOperandtextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
});