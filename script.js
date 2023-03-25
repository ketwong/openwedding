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

showStep(currentStep);

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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Save the data to Local Storage
  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  localStorage.setItem("weddingPlannerData", JSON.stringify(data));

  // Redirect or show a success message
  alert("Form submitted successfully!");
});

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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Export the data to a CSV file
  const csvData = exportFormDataToCSV();
  downloadCSV("wedding_planner_data.csv", csvData);

  // Redirect or show a success message
  alert("Form submitted successfully!");
});
