const topDisplay = document.querySelector('.top-display');
const mainDisplay = document.querySelector('.main-display');
const buttons = Array.from(document.querySelectorAll('button'));
const numbers = Array.from(document.querySelectorAll('.number'));
const dot = document.querySelector('#decimal')
const operators = Array.from(document.querySelectorAll('.operators'));
let initialValue = mainDisplay.querySelector('.initial-value')


// Math Functions:
const add = (firstValue, secondValue) => parseFloat(firstValue) + parseFloat(secondValue)

const subtract = (firstValue, secondValue) => firstValue - secondValue

const multiply = (firstValue, secondValue) => firstValue * secondValue

const divide = (firstValue, secondValue) => firstValue / secondValue

const power = (firstValue, secondValue) => Math.pow(firstValue, secondValue)

const operate = (operator, firstValue, secondValue) => {
    if (operator === 'add') return add(firstValue, secondValue)
    if (operator === 'subtract') return subtract(firstValue, secondValue)
    if (operator === 'multiply') return multiply(firstValue, secondValue)
    if (operator === 'divide') return divide(firstValue, secondValue)
    if (operator === 'power') return power(firstValue,secondValue)
}


// Display Functions:
const displayValue = function(e) {
    const solution = document.querySelectorAll('.solution')
    if (e.target.value != '.') {
        initialValue.remove()
    }
    if (solution.length > 0) {
        clearDisplay()
    }
    if (mainDisplay.childElementCount < 22) {
        const view = e.target.value
        const span = document.createElement('span');
        span.className = 'main-display-value';
        span.textContent = view;
        mainDisplay.appendChild(span);     
    }
    if (e.target.value === '.') e.target.disabled = true
}

const operatorFunc = function(e) {
    const firstArray = Array.from(mainDisplay.querySelectorAll('span')).map(x => x.innerText)
    const secondArray = Array.from(topDisplay.querySelectorAll('div')).map(x => x.innerText)
    const div = topDisplay.querySelector('.display-operator')
    const solution = mainDisplay.querySelectorAll('.solution')

    const operator = e.target.value
    if (operator != '=' && mainDisplay.childElementCount === 0) {
            clearDisplay()
            appendFirstValue(secondArray, operator)
        } else if (operator != '=' && topDisplay.childElementCount === 0 && solution.length === 0) {
            clearDisplay()
            appendFirstValue(firstArray, operator)
        } else if (operator != '=' && topDisplay.childElementCount === 0 && solution.length > 0) {
            clearDisplay()
            appendFirstValue(firstArray, operator)
        } else if (operator != '=' && topDisplay.childElementCount != 0) {
            storedOperator = div.textContent
            const getOperator = getOperatorValue(storedOperator)
            const firstValue = secondArray[0]
            const secondValue = getValue(firstArray);
            appendSecondValue(firstArray);
            const solution = operate(getOperator, firstValue, secondValue);
            displaySolution(solution)
        } else if (operator === '=' && topDisplay.childElementCount != 0 && mainDisplay.childElementCount != 0) {
            storedOperator = div.textContent
            const getOperator = getOperatorValue(storedOperator)
            const firstValue = secondArray[0]
            const secondValue = getValue(firstArray);
            const solution = operate(getOperator, firstValue, secondValue);
            displaySolution(solution)
        } else if (operator === '=' && topDisplay.childElementCount != 0 && mainDisplay.childElementCount === 0) {
            const firstValue = getValue(secondArray)
            displaySolution(firstValue)
        } else {
            const firstValue = getValue(firstArray)
            displaySolution(firstValue)
    }
}

function appendFirstValue(arr, operator) {
    const value = getValue(arr)
    const valueDiv = document.createElement('div');
    valueDiv.className = 'display-value';
    valueDiv.textContent = `${value}`
    topDisplay.appendChild(valueDiv)
    if (operator != '=') {
        const operatorDiv = document.createElement('div');
        operatorDiv.className = 'display-operator';
        operatorDiv.textContent = `${operator}`
        topDisplay.appendChild(operatorDiv)
    }
}

function appendSecondValue(arr) {
    const value = getValue(arr)
    const valueDiv = document.createElement('div');
    valueDiv.className = 'display-value';
    valueDiv.textContent = `${value}`
    topDisplay.appendChild(valueDiv)
}

function clearDisplay() {
    const spans = Array.from(document.querySelectorAll('span'));
    const divs = Array.from(topDisplay.querySelectorAll('div'));
    divs.forEach(div => div.remove());
    spans.forEach(span => span.remove());
    dot.disabled = false
}

function clearMainDisplay() {
    const spans = Array.from(document.querySelectorAll('span'));
    spans.forEach(span => span.remove());
    dot.disabled = false
}

function clearButton() {
    const spans = Array.from(document.querySelectorAll('span'));
    const divs = Array.from(topDisplay.querySelectorAll('div'));
    divs.forEach(div => div.remove());
    spans.forEach(span => span.remove());
    const initialZero = initialValue
    initialZero.className = 'initial-value';
    initialZero.textContent = '0';
    mainDisplay.appendChild(initialZero);
    dot.disabled = false
}

const getValue = function(arr) {
    const joined = arr.join("")
    const mapped = arr.map(Number)
    if (arr.includes('.') || mapped[0] === parseFloat(joined)) return (parseFloat(joined))
    return parseInt(joined)
}

const getOperatorValue = function(storedOperator) {
    if (storedOperator === '+') return 'add'
    if (storedOperator === '−') return 'subtract'
    if (storedOperator === '×') return 'multiply'
    if (storedOperator === '÷') return 'divide'
    if (storedOperator === '^') return 'power'
}

const displaySolution = function(solution) {
    clearDisplay()
    roundedSolution = Math.round((solution * 10000000)) / 10000000
    const solutionDisplay = document.createElement('span');
    solutionDisplay.className = 'solution';
    if (solution === Infinity) {
        alert("Can't divide by zero!!")
        clearButton()
    } else {
        solutionDisplay.textContent = `${roundedSolution}`
        mainDisplay.appendChild(solutionDisplay);
    }
}


// Events
numbers.forEach(number => number.addEventListener('click', displayValue))
operators.forEach(operator => operator.addEventListener('click', operatorFunc))
const btnClear = document.querySelector('#clear').onclick = clearButton
const btnClearEntry = document.querySelector('#clear-entry').onclick = clearMainDisplay

