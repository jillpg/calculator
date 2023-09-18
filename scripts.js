var display = document.getElementById("screen");
var buttons = document.getElementsByClassName("button");

// Define a mapping of button text content to functions
const buttonActions = {
  "=": equals,
  C: clear,
  x: multiply,
  "÷": divide,
  "±": plusMinus,
  "<=": backspace,
  "%": percent,
  π: pi,
  "x ²": square,
  "√": squareRoot,
  sin: sin,
  cos: cos,
  tan: tan,
  log: log,
  ln: ln,
  "x^": exponent,
  "x!": factorial,
  e: exp,
  rad: radians,
  "∘": degrees,
};

const buttonArray = Array.from(buttons);

const recordCalc = [];

// Iterate over buttons and add click event listeners
buttonArray.forEach(function (button) {
  button.addEventListener("click", function () {
    const buttonText = button.textContent;
    const actionFunction = buttonActions[buttonText];

    if (actionFunction) {
      actionFunction();
    } else {
      // Handle appending numbers and operators to display
      if (buttonText !== "=") {
        display.value += buttonText;
      }
    }
  });
});

function syntaxError() {
  try {
    eval(display.value);
    console.log(display.value);
  } catch (error) {
    if (
      error instanceof SyntaxError ||
      error instanceof ReferenceError ||
      error instanceof TypeError
    ) {
      display.value = "Syntax Error";
    }
  }
}

function equals() {
  const input = display.value;

  // Check for power operation
  if (input.includes("^")) {
    const [base, exponent] = input.split("^").map(parseFloat);
    if (!isNaN(base) && !isNaN(exponent)) {
      const result = Math.pow(base, exponent);
      display.value = result.toString();
    } else {
      display.value = "Invalid Input";
    }
  } else {
    try {
      const result = eval(input);
      if (!isNaN(result)) {
        display.value = result.toString();
      } else {
        display.value = "Invalid Input";
      }
    } catch (error) {
      display.value = "Syntax Error";
    }
  }
  recordCalc.push(input + " = " + display.value);

  mostrarRecord();
}

function clear() {
  display.value = "";
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function multiply() {
  display.value += "*";
}

function divide() {
  display.value += "/";
}

function plusMinus() {
  display.value = display.value.startsWith("-")
    ? display.value.slice(1)
    : "-" + display.value;
}

function factorial() {
  const inputValue = parseInt(display.value);
  if (isNaN(inputValue) || inputValue < 0) {
    display.value = "Invalid Input";
    return;
  }
  let result = 1;
  for (let i = 2; i <= inputValue; i++) {
    result *= i;
  }
  display.value = result.toString();
}

function pi() {
  display.value = display.value * Math.PI;
}

function square() {
  const inputValue = parseFloat(display.value);
  if (!isNaN(inputValue)) {
    display.value = (inputValue * inputValue).toString();
  } else {
    display.value = "Invalid Input";
  }
}

function squareRoot() {
  display.value = Math.sqrt(display.value);
}

function percent() {
  display.value = display.value / 100;
}

function sin() {
  display.value = Math.sin(display.value);
}

function cos() {
  display.value = Math.cos(display.value);
}

function tan() {
  display.value = Math.tan(display.value);
}

function log() {
  display.value = Math.log10(display.value);
}

function ln() {
  display.value = Math.log(display.value);
}

function exponent() {
  display.value += "^";
}

function exp() {
  display.value = Math.exp(display.value);
}

function radians() {
  display.value = display.value * (Math.PI / 180);
}

function degrees() {
  display.value = display.value * (180 / Math.PI);
}

var record = document.getElementById("record");

function mostrarOcultarDiv() {
  if (window.innerWidth >= 650) {
    record.removeAttribute("hidden");
    record.style.display="block"
  } else {
    record.setAttribute("hidden", "true");
    record.style.display="none"

  }
}

window.addEventListener("resize", mostrarOcultarDiv);

mostrarOcultarDiv;





function mostrarRecord() {
  while (record.firstChild) {
    record.removeChild(record.firstChild);
  }
  recordCalc
    .slice()
    .reverse()
    .forEach(function (aux) {
      var op = document.createElement("div");
      op.className = "operations";
      op.innerHTML = aux;
      



      record.appendChild(op);
    });
}

