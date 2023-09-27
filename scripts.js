/*
mejoras para un futuro: es mejor usar un array para las operaciones y despues hacerlo un string para el eval,
  pero como lo he hecho ya esta bastante bien. 
*/

var display = document.getElementById("screen");
var buttons = document.getElementsByClassName("button");
var opers = "";

const buttonActions = {
  C: clear,
  "<=": backspace,
  x: multiply,
  "+": plus,
  "-": minus,
  "÷": divide,
  "±": plusMinus,
  "x!": factorial,
  "x^": exponent,
  "x²": square,
  rad: radians,
  "∘": degrees,
  "√": squareRoot,
  π: pi,
  e: exp,
  sin: sin,
  "=": equals,

  "x√": root,
  cos: cos,
  tan: tan,
  log10: log,
  ln: ln,
};

const buttonArray = Array.from(buttons);

const recordCalc = [];

buttonArray.forEach(function (button) {
  button.addEventListener("click", function () {
    var buttonText = button.textContent;
    var actionFunction = buttonActions[buttonText];

    if (actionFunction) {
      actionFunction();
    } else {
      display.value += buttonText;
      opers += buttonText;
    }
  });
});

function clear() {
  display.value = "";
  opers = "";
}

function backspace() {
  display.value = display.value.slice(0, -1);
  opers = opers.slice(0, -1);
}

function multiply() {
  display.value += "*";
  opers += "*";
}

function plus() {
  display.value += "+";
  opers += "+";
}

function minus() {
  display.value += "-";
  opers += "-";
}

function divide() {
  display.value += "/";
  opers += "/";
}

function plusMinus() {
  display.value = display.value.startsWith("-")
    ? display.value.slice(1)
    : "-" + display.value;
}

function factorial() {
  display.value += "!";
  opers += "!";
}

function exponent() {
  display.value += "^";
  opers += "**";
}

function square() {
  display.value += "^2";
  opers += "**2";
}

function radians() {
  display.value += "rad";
  opers += "*(Math.PI / 180)";
}

function degrees() {
  display.value += "º";
  opers += "*(180 / Math.PI)";
}

function squareRoot() {
  display.value += "√";
  opers += "√";
}

function root() {
  display.value += "√";
  opers += "√";
}

function exp() {
  display.value += "e";
  let aux = opers[-1];
  if (aux.isNaN()) opers += "Math.exp(1)";
  else opers = opers.slice(0, -1);
  opers += `*Math.exp( ${aux} )`;
}

function pi() {
  display.value += "π";
  opers += "* Math.PI";
}

function sin() {
  display.value += "sin(";
  opers += "Math.sin(";
}

function cos() {
  display.value += "cos(";
  opers += "Math.cos(";
}

function tan() {
  display.value += "tan(";
  opers += "Math.tan(";
}

function log() {
  display.value += "log10(";
  opers += "Math.log10(";
}

function ln() {
  display.value += "ln(";
  opers += "Math.log(";
}

function getAllIndexes(str, val) {
  const indexes = [];
  let currentIndex = str.indexOf(val);

  while (currentIndex !== -1) {
    indexes.push(currentIndex);
    currentIndex = str.indexOf(val, currentIndex + 1);
  }

  return indexes;
}

function removechars(origString, index_or, index_fin) {
  let firstPart = origString.substr(0, index_or);
  let lastPart = origString.substr(index_fin + 1);

  let newString = firstPart + lastPart;
  return newString;
}

function addChar(origString, addChar, index) {
  let firstPart = origString.substr(0, index);
  let lastPart = origString.substr(index);

  let newString = firstPart + addChar + lastPart;
  return newString;
}

function equals() {
  var inputop = opers;
  console.log(opers);
  var indexsquare = getAllIndexes(inputop, "√");

  indexsquare.forEach((index) => {
    var indexfin = index + 1;
    while (!isNaN(inputop[indexfin + 1])) {
      indexfin += 1;
    }
    if (index - 1 >= 0) {
      if (isNaN(inputop[index - 1])) {
        inputop = removechars(inputop, index, index);
        inputop = addChar(inputop, "**(1/2)", indexfin + 1);
      } else {
        var num1 = inputop[index - 1];
        inputop = removechars(inputop, index - 1, index);
        inputop = addChar(inputop, `**(1/${num1})`, indexfin - 1);
      }
    } else {
      inputop = removechars(inputop, index, index);
      inputop = addChar(inputop, "**(1/2)", indexfin + 1);
    }
  });

  console.log(inputop);
  var result = "";
  try {
    result = eval(inputop);
    if (!isNaN(result)) {
      display.value = result.toString();
    } else {
      display.value = "Invalid Input";
    }
  } catch (error) {
    display.value = "Syntax Error";
  }

  console.log(result);
  recordCalc.push(inputop + " = " + display.value);

  mostrarRecord();
}

var record = document.getElementById("record");

function mostrarOcultarDiv() {
  if (window.innerWidth >= 650) {
    record.removeAttribute("hidden");
    record.style.display = "block";
  } else {
    record.setAttribute("hidden", "true");
    record.style.display = "none";
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
