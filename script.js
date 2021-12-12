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
const displayValue = 0;

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
          alert("operator");
      } else {
          updateDisplay(inputAsNumber);
      };
  };


updateDisplay(0);

