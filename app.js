const topDisplay = document.querySelector('.top-display');
const mainDisplay = document.querySelector('.main-display');
const mainDisplayValue = document.querySelector('.main-display-value')
const topDisplayValue = document.querySelector('.top-display-value')
const displayOperator = document.querySelector('.top-display-operator')
const buttons = Array.from(document.querySelectorAll('button'));
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operators'));
const dot = document.querySelector('#decimal')
let numericDisplayValue = [0]



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
    if (e.target.value === '.') e.target.disabled = true
    if (e.target.value != '.') {
    }
    if (solution.length > 0) {
        clearDisplay()
    }
    if (numericDisplayValue.length < 22) {
        if (numericDisplayValue[0] === 0) numericDisplayValue.shift()
        numericDisplayValue.push(e.target.value)
        let displayValueStr = numericDisplayValue.join('')
        mainDisplayValue.textContent = displayValueStr
    }
}

const operatorFunc = function(e) {
    const operator = e.target.value
    let firstValue = mainDisplayValue.textContent
    let secondValue = 0
    let solutionValue = 0
    let storedOperator = 0
    let roundedSolutionValue = Math.round((solutionValue * 10000000)) / 10000000

    if (operator != '=') {
        if (topDisplayValue.textContent === '') {
            firstValue = mainDisplayValue.textContent
            appendFirstValue(firstValue, operator)
            clearMainDisplay()
        } else if (topDisplayValue.textContent != '' && mainDisplayValue.textContent === '0') {
            firstValue = topDisplayValue.textContent
            appendFirstValue(firstValue, operator)
            clearMainDisplay()
        } else {
            firstValue = topDisplayValue.textContent
            secondValue = mainDisplayValue.textContent
            storedOperator = getOperatorValue(displayOperator.textContent)
            solutionValue = operate(storedOperator, firstValue, secondValue);
            roundedSolutionValue = Math.round((solutionValue * 10000000)) / 10000000
            appendFirstValue(roundedSolutionValue, operator)
            clearMainDisplay()
        }
    } else if (operator === '=') {
        if (topDisplayValue.textContent === '') {
            displaySolution(firstValue)
        } else {
            firstValue = topDisplayValue.textContent
            secondValue = mainDisplayValue.textContent
            storedOperator = getOperatorValue(displayOperator.textContent)
            solutionValue = operate(storedOperator, firstValue, secondValue);
            roundedSolutionValue = Math.round((solutionValue * 10000000)) / 10000000
            displaySolution(roundedSolutionValue)   
        }
    }
}

//     if (operator != '=' && numericDisplayValue.length >= 1 && topDisplayValue.textContent === '') {
//         firstValue = mainDisplayValue.textContent
//         appendFirstValue(firstValue, operator)
//         clearMainDisplay()
//     } else if (operator != '=' && topDisplayValue.textContent != '' && mainDisplayValue.textContent === '0') {
//         firstValue = topDisplayValue.textContent
//         appendFirstValue(firstValue, operator)
//         clearMainDisplay()
//     } else if (operator != '=' && topDisplayValue.textContent != '' && mainDisplayValue.textContent != '0') {
//         firstValue = topDisplayValue.textContent
//         secondValue = mainDisplayValue.textContent
//         storedOperator = getOperatorValue(displayOperator.textContent)
//         solutionValue = operate(storedOperator, firstValue, secondValue);
//         appendFirstValue(solutionValue, operator)
//         clearMainDisplay()
//     } else if (operator === '=' && topDisplayValue.textContent === '') {
//         displaySolution(firstValue)
//     } else if (operator === '=' && topDisplay.childElementCount != '' && mainDisplayValue.textContent != '0') {
//         firstValue = topDisplayValue.textContent
//         secondValue = mainDisplayValue.textContent
//         storedOperator = getOperatorValue(displayOperator.textContent)
//         solutionValue = operate(storedOperator, firstValue, secondValue);
//         displaySolution(solutionValue)        
//     }
// }

function appendFirstValue(Value, operator) {
    topDisplayValue.textContent = Value
    if (operator != '=') {
        displayOperator.textContent = `${operator}`
    }
}

function clearDisplay() {
    dot.disabled = false
    numericDisplayValue = [0]
    mainDisplayValue.textContent = '0'
    topDisplayValue.textContent = ''
    displayOperator.textContent = ''
}

function clearMainDisplay() {
    dot.disabled = false
    numericDisplayValue = [0]
    mainDisplayValue.textContent = '0'
}

const getOperatorValue = function(storedOperator) {
    if (storedOperator === '+') return 'add'
    if (storedOperator === '−') return 'subtract'
    if (storedOperator === '×') return 'multiply'
    if (storedOperator === '÷') return 'divide'
    if (storedOperator === '^') return 'power'
}

const displaySolution = function(roundedSolutionValue) {
    clearDisplay()
    if (roundedSolutionValue === Infinity) {
        alert("Can't divide by zero!!")
    } else {
        mainDisplayValue.textContent = roundedSolutionValue
    }
}


// Events
numbers.forEach(number => number.addEventListener('click', displayValue))
operators.forEach(operator => operator.addEventListener('click', operatorFunc))
const btnClear = document.querySelector('#clear').onclick = clearDisplay
const btnClearEntry = document.querySelector('#clear-entry').onclick = clearMainDisplay

