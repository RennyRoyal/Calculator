let currentDisplay = "0";
let resultDisplay = false;


function appendNumber(value) {
    if (currentDisplay === "0" || resultDisplay) {
        currentDisplay = value;
    } 
    else {
        currentDisplay += value;
    }
    resultDisplay = false;

    updateDisplay();
}

function appendOperator(operator) {
    currentDisplay += operator;
    updateDisplay();
}

function appendDecimal() {
    if (!currentDisplay.includes('.')) {
        currentDisplay += '.';
        updateDisplay();
    }
}

function updateDisplay() {
    const displayElement = document.getElementById("display")
    displayElement.textContent = currentDisplay;
}

function calculate() {
    try {
        let result = calculateResult(currentDisplay);
        currentDisplay += '\n' + result.toString();
        updateDisplay();
    }
    catch (error) {
        currentDisplay += "\nError";
        updateDisplay();
    }
    resultDisplay = true;
}

function calculateResult(currentDisplay) {
let operands = currentDisplay.split(/[-+*/]/);
let operators = currentDisplay.split(/\d*\.?\d+/).filter(Boolean);
let result = parseFloat(operands[0]);

for (let i = 0; i < operators.length; i++) {
    let operand = parseFloat(operands[i + 1]);
    switch (operators[i]) {
        case '+':
            result += operand;
            break;
        case '-':
            result -= operand;
            break;
        case '*':
            result *= operand;
            break;
        case '/':
            if (operand === 0) throw new Error('Division by zero');
            result /= operand;
            break; 
        default:
            throw new Error('Invalid operation');
    }
} 
return result;
}

function clearDisplay() {
    currentDisplay = "0";

    updateDisplay();
}

function clearLastElement() {
    currentDisplay = currentDisplay.slice(0, -1);
    if (currentDisplay === "") {
        currentDisplay = "0"
    }
    updateDisplay();
}