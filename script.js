const form = document.getElementById("wedding-planner-form");
const fieldsets = Array.from(form.querySelectorAll("fieldset"));
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");
const monthButtons = document.querySelectorAll(".month-button");
const selectedMonthInput = document.getElementById("selected-month");

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

  if (currentStep === fieldsets.length - 2) {
    displayResults();
  }
});

function displayResults() {
  const formData = new FormData(form);
  const results = [];

  formData.forEach((value, key) => {
    results.push(`<li><strong>${key.replace(/_/g, " ")}:</strong> ${value}</li>`);
  });

  resultsList.innerHTML = results.join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Export the data to a CSV file
  const csvData = exportFormDataToCSV();
  downloadCSV("wedding_planner_data.csv", csvData);

  // Redirect or show a success message
  alert("Form submitted successfully!");
});

function exportFormDataToCSV() {
  const formData = new FormData(form);
  const keys = [];
  const values = [];

  formData.forEach((value, key) => {
    keys.push(key);
    values.push(value);
  });

  const header = keys.join(",") + "\n";
  const data = values.join(",") + "\n";

  return header + data;
}

function downloadCSV(filename, data) {
  const csvData = new Blob([data], { type: "text/csv;charset=utf-8;" });
  const csvURL = URL.createObjectURL(csvData);
  const tempLink = document.createElement("a");

  tempLink.href = csvURL;
  tempLink.setAttribute("download", filename);
  tempLink.style.display = "none";
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}

monthButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const selectedMonth = event.target.getAttribute("data-month");

    monthButtons.forEach((btn) => {
      if (btn === event.target) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });

    selectedMonthInput.value = selectedMonth;
  });
});

showStep(currentStep);
