class Calculator {
  constructor(previousText, currentText) {
    this.previousText = previousText;
    this.currentText = currentText;
    this.resetAll();
  }

  resetAll() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operator = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendValue(value) {
    if (value ==='.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + value.toString();
  }

  chooseOperator(operator) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operator) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }


    this.currentOperand = computation;
    this.operator = undefined;
    this.previousOperand = "";
  }

  getDisplayValue(value) {
    const stringValue = value.toString();
    const integerDigits = parseFloat(stringValue.split(".")[0]);
    const decimalDigits = stringValue.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentText.innerText = this.getDisplayValue(this.currentOperand);
    if (this.operator != null) {
      this.previousText.innerText = `${this.getDisplayValue(this.previousOperand)} ${this.operator}`;
    } else {
      this.previousText.innerText = this.getDisplayValue(this.previousOperand);
    }
    this.previousText.innerText = this.previousOperand;

  }
}

const valueBtns = document.querySelectorAll("[data-value]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector("[data-equals]");
const resetBtn = document.querySelector("[data-reset]");
const deleteBtn = document.querySelector("[data-delete]");
const previousText = document.querySelector("[data-previous]");
const currentText = document.querySelector("[data-current]");

const calculator = new Calculator(previousText, currentText);

valueBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendValue(button.innerText);
    calculator.updateDisplay();
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperator(button.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

resetBtn.addEventListener("click", () => {
  calculator.resetAll();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
}); 