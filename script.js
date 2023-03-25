const form = document.getElementById("wedding-planner-form");
const fieldsets = Array.from(form.querySelectorAll("fieldset"));
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");

let currentStep = 0;

function showStep(step) {
  fieldsets.forEach((fieldset, index) => {
    fieldset.hidden = index !== step;
  });

  previousButton.hidden = step === 0;
  nextButton.hidden = step === fieldsets.length - 1;
  submitButton.hidden = step !== fieldsets.length - 1;
}

previousButton.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

nextButton.addEventListener("click", () => {
  if (currentStep < fieldsets.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Process the form data here
  console.log("Form submitted");
});

const resultsList = document.getElementById("results-list");

function displayResults() {
  const formData = new FormData(form);
  const results = [];

  formData.forEach((value, key) => {
    results.push(`<li><strong>${key.replace(/_/g, " ")}:</strong> ${value}</li>`);
  });

  resultsList.innerHTML = results.join("");
}

nextButton.addEventListener("click", () => {
  if (currentStep < fieldsets.length - 1) {
    currentStep++;
    showStep(currentStep);
  }

  if (currentStep === fieldsets.length - 2) {
    displayResults();
  }
});


showStep(currentStep);
