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