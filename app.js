// grab the form
const form = document.getElementById('loan-form');
const card = document.querySelector('.card');
const loadingGif = document.getElementById('loading');
const results = document.getElementById('results');
let alreadyAlerted = false;

// Listen for submit
form.addEventListener('submit', revealResults);

// event handler
function revealResults(event) {
  // console.log(`and the results are`); // verify it's linked
  hideElement(results);
  displayElement(loadingGif); // nested display element and hide loadingGif in the if statement that determines there's an error to prevent the loadingGif from showing if the error is triggered
  calculateResults();
  event.preventDefault();
}

function displayElement(e) {
  e.style.display = 'block';
  console.log(`showing ${e}`);
}

function hideElement(e) {
  e.style.display = 'none';
  console.log(`hiding ${e}`);
}

// Math
function calculateResults() {
  // Verify function is linked
  // console.log('calculating')
  // Variables for calculations
  const loanAmt = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const pmtYears = document.getElementById('years');
  const monthlyPmt = document.getElementById('monthly-payment');
  const ttlPmt = document.getElementById('total-payment');
  const ttlInterest = document.getElementById('total-interest');
  // verify variables are linked to DOM
  // console.log(`${loanAmt.value}, ${interest.value}, ${pmtYears.value}, ${
  //    monthlyPmt.value}, ${ttlPmt.value}, ${ttlInterest.value}`);

  // Calculations
  const principal = parseFloat(loanAmt.value); // turns it into a decimal
  const calcInterest = parseFloat(interest.value) / 100 / 12;
  const calcPmts = parseFloat(pmtYears.value) * 12;

  const x = Math.pow(1 + calcInterest, calcPmts);
  const monthly = (principal * x * calcInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPmt.value = monthly.toFixed(2);
    ttlPmt.value = (monthly * calcPmts).toFixed(2);
    ttlInterest.value = (monthly * calcPmts - principal).toFixed(2);
    setTimeout(function() {
      hideElement(loadingGif);
      displayElement(results);
    }, 2000);
  } else {
    // console.log(`this isn't finite`); // verify else works; code the showError function later
    hideElement(loadingGif);
    showError();
  }

  // event.preventDefault(); // Move up to the new revealResults event handler, as calculateResults() is now just a function and no longer an event handler.
}

// Show error

function showError() {
  if (alreadyAlerted === false) {
    popupAlert('Please enter all of the values below.');
    alreadyAlerted = true;
    setTimeout(clearError, 3000);
  } else {
    console.log(`there is already an alert`);
  }
}

function popupAlert(errorMssg) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger'; // bootstrap classes
  errorDiv.appendChild(document.createTextNode(errorMssg));
  // Insert error after heading
  card.insertBefore(errorDiv, form);
}

function clearError() {
  document.querySelector('.alert').remove();
  alreadyAlerted = false;
}

/*
 * debug - can get multiple error messages in the 3 seconds
 *   1. disable the button right below error = true && enable it in clearError
 *   2. set a condition that must be met, like if alert === true, do not showError with the inital value of let alert = true; and then put alert = false to the clearError. ()
 */
