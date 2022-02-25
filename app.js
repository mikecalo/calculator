const topDisplay = document.querySelector('.top-display');
const mainDisplay = document.querySelector('.main-display');
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
    mainDisplay.appendChild(span);
}

// when one of the operator functions are pressed
const operatorFunc = function(e) {
    const span = document.querySelector('span');
    const div = document.querySelector('.display-value')
    const firstArray = Array.from(mainDisplay.querySelectorAll('span')).map(x => x.innerText)
    const secondArray = Array.from(topDisplay.querySelectorAll('div')).map(x => x.innerText)
    const operator = e.target.value
    if (operator != '=') {
        if (topDisplay.childElementCount === 0) {
            clearDisplay()
            storeFirstValue(firstArray, operator)
            // console.log(firstValue, secondValue)
        } else {
            const firstValue = getValue(secondArray);
            const secondValue = getValue(firstArray);
            evaluate(firstValue, secondValue);
        }
    } else {
        storeFirstValue(firstArray, operator)
        setTimeout(clearDisplay, 1000);
    }

}

function storeFirstValue(arr, operator) {
    // logic to display value at the top of display window 
    const value = getValue(arr)
    const valueDiv = document.createElement('div');
    valueDiv.className = 'display-value';
    valueDiv.textContent = `${value}`
    topDisplay.appendChild(valueDiv)
    if (operator != '=') {
        const operatorDiv = document.createElement('div');
        operatorDiv.className = 'display-value';
        operatorDiv.textContent = `${operator}`
        topDisplay.appendChild(operatorDiv)
    }

}

function clearDisplay() {
    const spans = Array.from(document.querySelectorAll('span'));
    const divs = Array.from(document.querySelectorAll('.display-value'));
    spans.forEach(span => span.remove());
    divs.forEach(div => div.remove());
}

const getValue = function(arr) {
    const mapped = arr.map(Number)
    const filtered = mapped.filter(Number.isInteger)
    return filtered.join("")
}



const evaluate = function (num1, num2) {
console.log(num1, num2);
}

    


// Events
numbers.forEach(number => number.addEventListener('click', displayValue))
operators.forEach(operator => operator.addEventListener('click', operatorFunc))
const btnClear = document.querySelector('#clear').onclick = clearDisplay
// const equal = document.querySelector('.equal').onclick = evaluate(firstValue,secondValue)

