const farenheitInput = document.querySelector("#farenheit");
const submitInput = document.querySelector("input.btn");
const loadingDiv = document.querySelector("#loading");
const resultsDiv = document.querySelector("#results");
const celsiusInput = document.querySelector("#centigrade");
const cardDiv = document.querySelector(".card");
const headingH1 = document.querySelector(".heading");
let errorDiv;

submitInput.addEventListener("click", calculateTemperature);

function calculateTemperature(e) {
  e.preventDefault();
  farenheitValue = parseFloat(farenheitInput.value);
  if(isNaN(farenheitValue)) {
    displayError("Please enter a valid temperature.");
  } else {
    // Set results
    // Deduct 32, then multiply by 5, then divide by 9
    const celsiusResult = (((farenheitValue-32)*5)/9).toFixed(2);
    celsiusInput.value = celsiusResult;

    // Display thinker briefly
    loadingDiv.style.display = "block";
    resultsDiv.style.display = "none";
    setTimeout(showResults, 1000);
  }

}

function showResults() {
  loadingDiv.style.display = "none";
  resultsDiv.style.display = "block";
}

function displayError(message) {
  errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(message));
  cardDiv.insertBefore(errorDiv, headingH1);
  setTimeout(removeErrorDiv, 3000);
}

function removeErrorDiv() {
  errorDiv.remove();
}