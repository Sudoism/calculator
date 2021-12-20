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
    return value.toString().substring(0, max_chars);
}

const equals = function(){
    if(operator === '' ) {
        return; //if no operator selected, there is nothing to calculate/equal, 
    } else if(result === '') {
        secondOperand = displayValue;
    } else {
        firstOperand = displayValue;
    }
    result = operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
    displayValue = result;
    updateDisplay();
}

const clear = function(){
    displayValue= '0';
    displayValueMini = '';
    operator ='';
    firstOperand ='';
    secondOperand ='';
    result ='';
    clearInput = true;
    updateDisplay();
}

const operatorSelection = function(input) {

    if(clearInput === true) {
        return;
    }

    if(result != '') {
        firstOperand = result;
        operator = input;
        result = '';
        secondOperand = '';
    } else if(secondOperand != '') {
        operator = input;
        equals();
    } else if (firstOperand === '') {
        operator = input;
        firstOperand = displayValue;
    } else if(secondOperand === '') {
        secondOperand = displayValue;
        equals();
        firstOperand = result;
        secondOperand = '';
        result = '';
        operator = input;
    } 

    updateDisplay();
    clearInput = true;
}

const numberSelection = function(input) {
    if(displayValue.length >= max_chars){
        return;
    }
    if(clearInput) { 
        displayValue = input;
    } else {
        displayValue += input;
    }
    updateDisplay();
    clearInput = false;
}

const deleteNumber  = function() {
    if(displayValue.length===1) { 
        displayValue = "0";
        clearInput = true;
    } else {
        displayValue = displayValue.substring(0,(displayValue.length-1));
    }
    updateDisplay();
}

const decimal = function() {
    if(displayValue.includes(".")){
        return;
    } else {
        displayValue += '.';
        updateDisplay();
    }
}

//updates what to show on the calculator display 
const updateDisplay = function() {
    const display = document.querySelector("#displayValue");
    displayValue = limit(displayValue);
    display.textContent = displayValue;
    updateDisplayMini();
};

const updateDisplayMini = function() {
    const displayMini = document.querySelector("#mini");
    if(result==='') {
        displayValueMini = `${firstOperand} ${operator} ${secondOperand}`
    } else{
        displayValueMini = `${firstOperand} ${operator} ${secondOperand} = ${result}`
    }
    displayMini.textContent = displayValueMini;
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

//keyboard support 
document.addEventListener('keydown', function(event) {
    //alert(event.key)
    if(event.key === "0" || event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4" || event.key === "5" || event.key === "6" || event.key === "7" || event.key === "8" || event.key === "9") {
        numberSelection(event.key);
    };

    if(event.key === "Backspace") {
        deleteNumber();
    }

    if(event.key ==='/' || event.key ==='*' || event.key ==='+' || event.key ==='-') {
        operatorSelection(event.key);
    }

    if(event.key === '=' || event.key ===  "Enter"){
        equals();
    }

    if(event.key === '.'){
        decimal();
    }
});

//Value to show on the calculator display
let displayValue = '0';
let firstOperand = '';
let secondOperand = '';
let operator = '';
let result = '';
let clearInput = true;
const max_chars = 10;