"use strict";

let display = document.getElementById("display"),
  numbers = document.querySelectorAll(".numBtn"),
  operators = document.querySelectorAll(".opBtn"),
  result = document.getElementById("result"),
  clear = document.getElementById("clear"),
  resultDisplayed = false;

// adding click hadelers to number button

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function (e) {
    let currentString = display.innerHTML; // to store current string
    let lastChar = currentString[currentString.length - 1]; // to store operators symbol

    if (resultDisplayed === false) {
      display.innerHTML += e.target.value;
    } else if (
      resultDisplayed === true ||
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "x" ||
      lastChar === "÷"
    ) {
      resultDisplayed === false;
      display.innerHTML += e.target.value;
    } else {
      resultDisplayed === false;
      display.innerHTML = "";
      display.innerHTML += e.target.value;
    }
  });
}

// adding click handelers to operators buttons;

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function (e) {
    let currentString = display.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    //if last character entered is an operator, replace it with the currently pressed one
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "x" ||
      lastChar === "÷"
    ) {
      let newString =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML;
      display.innerHTML = newString;
    } else if (currentString.length == 0) {
      console.log("enter a number first");
    } else {
      display.innerHTML += e.target.innerHTML;
    }
  });
}

// on click of equal button

result.addEventListener("click", function () {
  // store the current displaying string in variable
  let inputString = display.innerHTML; // eg. 54+2-87x22
  // convert this into an array eg. [54, 2, 87, 22]
  let arrNum = inputString.split(/\+|\-|\x|\÷/g);

  // array of operators
  let arrOperator = inputString.replace(/[0-9]|\./g, "").split("");

  // now we are looping through the array and doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition

  let divide = arrOperator.indexOf("÷");
  while (divide != -1) {
    arrNum.splice(divide, 2, arrNum[divide] / arrNum[divide + 1]);
    arrOperator.splice(divide, 1);
    divide = arrOperator.indexOf("÷");
  }

  let multiply = arrOperator.indexOf("x");
  while (multiply != -1) {
    arrNum.splice(multiply, 2, arrNum[multiply] * arrNum[multiply + 1]);
    arrOperator.splice(multiply, 1);
    multiply = arrOperator.indexOf("x");
  }

  let subtract = arrOperator.indexOf("-");
  while (subtract != -1) {
    arrNum.splice(subtract, 2, arrNum[subtract] - arrNum[subtract + 1]);
    arrOperator.splice(subtract, 1);
    subtract = arrOperator.indexOf("-");
  }

  let add = arrOperator.indexOf("+");
  while (add != -1) {
    arrNum.splice(
      add,
      2,
      parseFloat(arrNum[add]) + parseFloat(arrNum[add + 1])
    );
    arrOperator.splice(add, 1);
    add = arrOperator.indexOf("+");
  }

  display.innerHTML = arrNum[0]; // display the output
  resultDisplayed = true; // flag on for displaying result
});

// clear input on clicking clear
clear.addEventListener("click", function () {
  display.innerHTML = "";
});