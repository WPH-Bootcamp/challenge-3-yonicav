"use strict";

// Import prompt-sync library for user input
const prompt = require("prompt-sync")({ sigint: true });

/**
 * 1. User Input Handling
 * Function to get a valid number from the user
 */
function getValidNumberInput(promptMessage) {
  let input;
  let number;
  while (true) {
    input = prompt(promptMessage);
    number = Number(input);

    // Validation: Check if it is not NaN and input is not an empty string (which converts to 0)
    if (!isNaN(number) && input.trim() !== "") {
      return number;
    } else {
      console.log("Invalid input. Please enter a valid number.");
    }
  }
}

/**
 * Function to get a valid operator from the user
 */
function getValidOperatorInput(promptMessage) {
  let input;
  const validOperators = ["+", "-", "*", "/", "%", "**"];
  while (true) {
    input = prompt(promptMessage);
    if (validOperators.includes(input)) {
      return input;
    } else {
      console.log(
        `Invalid operator. Please use one of: ${validOperators.join(", ")}`
      );
    }
  }
}

/**
 * 2. Basic Arithmetic Operation (Function Declarations)
 */
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero!";
  }
  return a / b;
}

function modulo(a, b) {
  return a % b;
}

function power(a, b) {
  return a ** b;
}

/**
 * Main Application Logic
 */
console.log("=== Interactive Calculator & Data Analyzer ===");

// 3. Main Calculator Logic (While Loop)
while (true) {
  console.log("\n--- New Calculation ---");

  // Get inputs
  const num1 = getValidNumberInput("Enter the first number: ");
  const operator = getValidOperatorInput(
    "Enter an operator (+, -, *, /, %, **): "
  );
  const num2 = getValidNumberInput("Enter the second number: ");

  let result;

  // Switch statement to handle operations
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    case "%":
      result = modulo(num1, num2);
      break;
    case "**":
      result = power(num1, num2);
      break;
    default:
      // This should theoretically not be reached due to validation
      result = null;
      console.log("Unknown Error.");
  }

  // 4. Data Type Analysis & Conditional Output
  console.log(`\nResult: ${result}`);

  // Nullish Coalescing check (for safety/requirement fulfillment)
  const checkedResult =
    result ?? "Result is undefined or null, something went wrong!";

  if (typeof checkedResult === "string") {
    // Handle String Result (Error Message)
    console.log(
      `[Analysis]: The result is a String. Message: "${checkedResult}"`
    );
  } else if (typeof checkedResult === "number") {
    console.log(`[Analysis]: The result is a Number.`);

    // Positive, Negative, or Zero check
    if (checkedResult > 0) {
      process.stdout.write("It is Positive"); // process.stdout.write prints without newline
    } else if (checkedResult < 0) {
      process.stdout.write("It is Negative");
    } else {
      process.stdout.write("It is Zero");
    }

    // Complex condition (AND/OR) example logic
    if (checkedResult > 100 && checkedResult < 1000) {
      process.stdout.write(" and it's a large number (between 100-1000)");
    }

    console.log("."); // End the line

    // Integer vs Float check
    if (Number.isInteger(checkedResult)) {
      console.log("It is an Integer.");
    } else {
      console.log("It is a Floating-point number.");
    }

    // Ternary Operator for Even/Odd
    const evenOrOdd = checkedResult % 2 === 0 ? "Even" : "Odd";
    console.log(`The number is ${evenOrOdd}.`);
  } else {
    // Fallback for undefined/null found by coalescing operator
    console.log(checkedResult);
  }

  // 5. Exit Mechanism
  const continueAnswer = prompt(
    "Do you want to perform another calculation? (yes/no): "
  );

  // Check for 'no' (case-insensitive)
  if (continueAnswer.toLowerCase() === "no") {
    console.log("Exiting application. Goodbye!");
    break;
  }
}
