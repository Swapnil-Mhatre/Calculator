const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#allClear");
const decimal = document.querySelector("#decimal");
const backspace = document.querySelector("#backspace");
const previousOp = document.querySelector("#previousOperation");
const currentOp = document.querySelector("#currentOperation");
let operandA = 0;
let operandB = 0;
let operator;
let finalOperand;

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (operator !== undefined) {
      // for updating value 0 of operand to the button input clicked
      operandB === 0 ? (operandB = number.value) : (operandB += number.value);
      currentOp.textContent = operandB;
    } else {
      operandA === 0 ? (operandA = number.value) : (operandA += number.value);
      currentOp.textContent = operandA;
    }
  });
});

operators.forEach((operatorsym) => {
  operatorsym.addEventListener("click", () => {
    performOperation();
    operator = operatorsym.value;
    // it is taking second operation value to perform operation find a way

    if (operator === "%") {
      finalOperand = operandA / 100;
      previousOp.textContent = `${operandA} %`;
      currentOp.textContent = finalOperand;
    }
    previousOp.textContent = `${operandA} ${operatorsym.value} `;
  });
});

const removeVal = () => {
  if (operator !== undefined && operandB !== 0) {
    operandB = operandB.slice(0, -1);
    currentOp.textContent = operandB;
  } else {
    operandA = operandA.slice(0, -1);
    if (operandA === "") operandA = 0;
    currentOp.textContent = operandA;
  }
};

const reset = () => {
  previousOp.textContent = "";
  currentOp.textContent = 0;
  operandA = 0;
  operandB = 0;
  operator = undefined;
};

clear.addEventListener("click", reset);
backspace.addEventListener("click", removeVal);

const addDecimal = () => {
  if (operator !== undefined) {
    for (let i = 0; i < operandB.length; i++) {
      if (operandB[i] === ".") return;
    }
  } else {
    for (let i = 0; i < operandA.length; i++) {
      if (operandA[i] === ".") return;
    }
  }

  if (operator !== undefined) {
    operandB += ".";
    currentOp.textContent = operandB;
  } else {
    operandA += ".";
    currentOp.textContent = operandA;
  }
};

decimal.addEventListener("click", addDecimal);

const performOperation = () => {
  if (operator === undefined || operandB === 0) return;
  if (operator === "+") {
    finalOperand = Number(operandA) + Number(operandB);
    previousOp.textContent = `${operandA} + ${operandB}`;
  }
  if (operator === "-") {
    finalOperand = operandA - operandB;
    previousOp.textContent = `${operandA} - ${operandB}`;
  }
  if (operator === "*") {
    if (operandB === 0) return;
    finalOperand = operandA * operandB;
    previousOp.textContent = `${operandA} * ${operandB}`;
  }
  if (operator === "/") {
    if (operandB === 0) return;
    finalOperand = operandA / operandB;
    previousOp.textContent = `${operandA} / ${operandB}`;
  }

  currentOp.textContent = finalOperand;
  operandA = `${finalOperand}`;
  operandB = 0;
};

equal.addEventListener("click", performOperation);
