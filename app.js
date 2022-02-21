const display1 = document.querySelector('.display-1');
const display2 = document.querySelector('.display-2');
const buttons = Array.from(document.querySelectorAll('button'));
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operators'));


// Math Functions:
const add = function(...arr) {
    const sum = arr.reduce((total, num) => total + num, 0);
  return sum;
};

const subtract = function(...arr) {
    const subtraction = arr.reduce((previousValue, currentValue) => previousValue - currentValue);
    return subtraction;
};


const multiply = function(...arr) {
  const product = arr.reduce((previousValue, currentValue) => previousValue * currentValue);
return product;
};

const divide = function(...arr) {
    const division = arr.reduce((previousValue, currentValue) => previousValue / currentValue);
  return division;
  };

const operate = function(operator, ...arr) {
    if (operator === add) return add(...arr)
    if (operator === subtract) return subtract(...arr)
    if (operator === multiply) return multiply(...arr)
    if (operator === divide) return divide(...arr)
}

// Display Functions:
const displayValue = function(e) {
    const view = e.target.value
    const span = document.createElement('span');
    span.textContent = view;
    display2.appendChild(span);
}

const operatorFunc = function(e) {
        const arr = Array.from(document.querySelectorAll('span')).map(x => x.innerText)
        const operator = e.target.value
        getDisplayValue(arr)
        clearDisplay()
        storeDisplayValue(arr, operator)
}

function clearDisplay() {
    const spans = Array.from(document.querySelectorAll('span'));
    spans.forEach(span => span.remove());
}

function getDisplayValue(arr) {
    const mappedNums = arr.map(Number)
    const filteredNums = mappedNums.filter(Number.isInteger)
    const joinedNums = filteredNums.join("")
    const value = parseInt(joinedNums)
    return value
}



function storeDisplayValue(arr, operator) {
    // logic to display value at the top of display window 
    const value = getDisplayValue(arr)
    const span = document.createElement('span');
    span.className = 'display-value';
    span.textContent = (`${value} ${operator}`)
    display1.appendChild(span);

}
    


// Events
numbers.forEach(number => number.addEventListener('click', displayValue))
operators.forEach(operator => operator.addEventListener('click', operatorFunc))
const btnClear = document.querySelector('#clear').onclick = clearDisplay
// const evaluate = document.querySelector('.evaluate').onclick = evaluate()

