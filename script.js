document.addEventListener("DOMContentLoaded", function() {
    const integerInput = document.getElementById("integer-input");
    const proceedToStep2 = document.getElementById("proceed-to-step-2");
    const step1 = document.querySelector(".step-1");
    const step2 = document.querySelector(".step-2");

    const optionButtons = document.querySelectorAll(".option-button");
    const proceedToStep3 = document.getElementById("proceed-to-step-3");

    const step3 = document.querySelector(".step-3");
    const resultInteger = document.getElementById("result-integer");
    const resultOption = document.getElementById("result-option");

    let enteredInteger;
    let selectedOption;

    proceedToStep2.addEventListener("click", () => {
        const integerValue = parseInt(integerInput.value);

        if (!isNaN(integerValue) && Number.isInteger(integerValue)) {
            enteredInteger = integerValue;
            step1.hidden = true;
            step2.hidden = false;
        } else {
            alert("Please enter a valid integer.");
        }
    });

    optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            optionButtons.forEach((btn) => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedOption = button.dataset.option;
            proceedToStep3.hidden = false;
        });
    });

    proceedToStep3.addEventListener("click", () => {
        // Display the results
        resultInteger.textContent = enteredInteger;
        resultOption.textContent = `Option ${selectedOption}`;

        step2.hidden = true;
        step3.hidden = false;

        // Your logic here to navigate to the next page or capture more data
        // ...
    });
});
