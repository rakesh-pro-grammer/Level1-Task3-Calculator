// Select the display element
const display = document.getElementById('display');

// Select all buttons
const buttons = document.querySelectorAll('.btn');

// Initialize input string
let input = "";

// Add event listener to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        // Clear input
        if (button.classList.contains('clear')) {
            input = "";
            display.value = "";

        // Delete last character (backspace)
        } else if (button.classList.contains('delete')) {
            input = input.slice(0, -1);
            display.value = input;

        // Calculate and display the result
        } else if (button.classList.contains('equals')) {
            try {
                const result = eval(prepareInput(input));
                display.value = cleanOutput(result);
            } catch (e) {
                display.value = "Error";
            }

        // Handle bracket input
        } else if (value === "(" || value === ")") {
            input += value;
            display.value = input;

        // Handle number, operator, and dot inputs
        } else {
            input += value;
            display.value = input;
        }
    });
});

// Function to prepare the input string for evaluation
function prepareInput(input) {
    return input.replace(/x/g, '*').replace(/÷/g, '/');
}

// Function to format the output with commas
function cleanOutput(output) {
    let outputString = output.toString();
    if (outputString.includes('.')) {
        const [integerPart, decimalPart] = outputString.split('.');
        return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + decimalPart;
    } else {
        return outputString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}