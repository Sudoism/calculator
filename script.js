const addition = function(a, b) {
    return a+b;
};

const subtract = function(a, b) {
    return a-b;
};

const multiply = function(a, b) {
    return a*b;
};

const divide = function(a, b) {
    return a/b;
};

const operate = function(operator, a ,b) {
    switch(operator) {
        case "+":
            return addition(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    };
}

//Value to show on the calculator display
let displayValue = '';
let firstOperand = '';
let secondOperand = '';
let operator = '';
let result = '';

//updates what to show on the calculator display 
const updateDisplay = function(displayValue) {
    const display = document.querySelector(".display");
    display.textContent = displayValue;
};

//makes button react on click and report id
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
      evaluateInput(button.id);
    });
  });

  const evaluateInput = function(input) {
      inputAsNumber = parseInt(input);
      if(Number.isNaN(inputAsNumber)) {
          //operator is = first
          if(input === '='){
            secondOperand = displayValue;
            result = operate(operator, parseInt(firstOperand), parseInt(secondOperand))
            displayValue = result;
            updateDisplay(displayValue);
            // bug, cant make it work to click "=" repeateadly 
            //firstOperand = secondOperand;
          } else if(input === 'C') {
            displayValue= '0';
            updateDisplay(displayValue);
            operator ='';
          } else if(operator === '') {
            firstOperand = displayValue;
            operator = input;
            displayValue = '0';
            // enables to get result when clicking an operator with two operands avaialable
          } else {
            secondOperand = displayValue;
            result = operate(operator, parseInt(firstOperand), parseInt(secondOperand))
            displayValue = result;
            updateDisplay(displayValue);
            firstOperand = displayValue;
            operator = input;
            displayValue = '0';
          }

      } else {
          //enables C to work without creating an empty display or a trailing 0 
          if(displayValue === '0') { 
            displayValue = input;
          } else {
            displayValue += input;
          }
          updateDisplay(displayValue);
      };
  };


updateDisplay(0);

//next step? -> Take array as input for updatedisplay, use evaluate as array.push 

