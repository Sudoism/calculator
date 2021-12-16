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

// limits character output on the calculator to avoid overflowing of display
const limit = function(value){
    var max_chars = 10;
    return value.toString().substring(0, max_chars);
}

const equals = function(){
    if(operator === '') {
        return; //if no operator selected, there is nothing to calculate/equal
    }
    secondOperand = displayValue;
    displayValue = operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
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
    //if operator already selected, evaluate expression
    if(operator != ''){
        equals();
    }
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
    updateDisplay(displayValue);
}

const deleteNumber  = function() {
    if(displayValue.length===1) { 
        displayValue = "0";
    } else {
        displayValue = displayValue.substring(0,(displayValue.length-1));
    }
    updateDisplay(displayValue)
}

const decimal = function() {
    if(displayValue.includes(".")){
        return;
    } else {
        displayValue += '.';
        updateDisplay(displayValue);
    }
}

//updates what to show on the calculator display 
const updateDisplay = function(displayValue) {
    const display = document.querySelector(".display");
    displayValue = limit(displayValue)
    display.textContent = displayValue;
};

//number buttons interact with display
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
      numberSelection(button.id);
    });
});

//operators
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        operatorSelection(button.id);
    });
});

document.getElementById("equal").addEventListener("click", () =>{
    equals();
});

document.getElementById("clear").addEventListener("click", () =>{
    clear();
});

document.getElementById("delete").addEventListener("click", () =>{
    deleteNumber();
});

document.getElementById("decimal").addEventListener("click", () =>{
    decimal();
});

//Value to show on the calculator display
let displayValue = '';
let firstOperand = '';
let secondOperand = '';
let operator = '';

updateDisplay(0);

