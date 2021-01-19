class Calculator {
    constructor(previousOperandtextElement, currentOperandtextElement) {
        this.previousOperandtextElement = previousOperandtextElement;
        this.currentOperandtextElement = currentOperandtextElement;
        this.clear();

        this.storedConstants = new StoredConstants();
        this.loadStoredConstants();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }   else  {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }   else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandtextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandtextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)
            } ${this.operation}`
        }   else {
            this.previousOperandtextElement.innerText = ''
        }
    }


    loadStoredConstants() {
        this.storedConstants.load();
        let options = this.storedConstants.constants;

        // write the select box like 
        let select = document.getElementById("select-constant"); 

        // empty first
        select.innerHTML = "";

        // add the constants
        for(let key in options) {
            let el = document.createElement("option");
            el.textContent =  key;
            el.value = options[key];
            select.appendChild(el);
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const loadConstantButton = document.querySelector('[data-load-constant]');
const saveConstantButton = document.querySelector('[data-save-constant]');
const deleteConstantButton = document.querySelector('[data-delete-constant]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandtextElement = document.querySelector('[data-previous-operand]');
const currentOperandtextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandtextElement, currentOperandtextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

/**
 * Load button - load the value of the selected constant into
 * the display
 */
loadConstantButton.addEventListener('click', button => {

    let select = document.getElementById("select-constant");
    let name = select.options[select.selectedIndex].text;
    let val = calculator.storedConstants.value(name);
    calculator.currentOperand = val;
    calculator.updateDisplay()

})

saveConstantButton.addEventListener('click', button => {

    // get the value from the calculator
    let value = calculator.currentOperand;
    if(value == ''){
        alert('Sie müssen einen Wert für die Variable in den Rechner eingeben');
        return;
    }

    // get the name of the constant
    let name = prompt('Geben Sie den Namen der Konstanten ein', '');
    if(name == null || name == '' ){
        return;
    }   

    // add the constant to the stored constants
    calculator.storedConstants.add(name, value);

    // save the changed list locally
    calculator.storedConstants.save();

    // recreate the select box
    calculator.loadStoredConstants();
    
    // tell about the success
    alert('Die Konstante wurde gespeichert');
})

deleteConstantButton.addEventListener('click', button => {

    // ask if you really like to delete
    if(confirm('Wollen Sie die Konstante wirklich löschen?')){

        // get the selected name
        let select = document.getElementById("select-constant");
        let name = select.options[select.selectedIndex].text;

        // remove it from list
        calculator.storedConstants.remove(name);

        // reload the modified list
        calculator.loadStoredConstants();
    }

})