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

// limits character output on the calculator to avoid overflowing of display
const limit = function(value){
    var max_chars = 10;
    return value.toString().substring(0, max_chars);
}

//updates what to show on the calculator display 
const updateDisplay = function(displayValue) {
    const display = document.querySelector(".display");
    displayValue = limit(displayValue)
    display.textContent = displayValue;
};

//button reacts on click and report its id
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
      evaluateInput(button.id);
    });
  });

const equals = function(){
    secondOperand = displayValue;
    result = operate(operator, parseInt(firstOperand), parseInt(secondOperand));
    displayValue = result;
    updateDisplay(displayValue);
}


const clear = function(){
    displayValue= '0';
    updateDisplay(displayValue);
    operator ='';
    firstOperand ='';
    secondOperand ='';
}

const operatorSelection = function(input) {
    firstOperand = displayValue;
    operator = input;
    displayValue = '0';
}

const numberSelection = function(input) {
    if(displayValue === '0') { 
        displayValue = input;
    } else {
        displayValue += input;
    }
}

const deleteNumber  = function() {
    if(displayValue.length===1) { 
        displayValue = "0";
    } else {
        displayValue = displayValue.substring(0,(displayValue.length-1));
    }
}

const evaluateInput = function(input) {
    inputAsNumber = parseInt(input);
    if(Number.isNaN(inputAsNumber)) {
        if(input === '='){
            equals();
        } else if(input === 'C') {
            clear();
        } else if(input === 'delete') {
            deleteNumber();
            updateDisplay(displayValue);
        } else if(operator === '') { 
            operatorSelection(input);
        } else { // operator already selected, and pressed again instead of "="
            equals();
            operatorSelection();
        }
    } else {
        //enables C to work without creating an empty display or a trailing 0 
        numberSelection(input);
        updateDisplay(displayValue);
    };
};

updateDisplay(0);

