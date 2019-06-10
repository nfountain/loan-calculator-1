// Global variables

const form = document.getElementById('loan-form');
const card = document.querySelector('.card');
const loadingGif = document.getElementById('loading');
const results = document.getElementById('results');
let alreadyAlerted = false;

// Listen for submit
form.addEventListener('submit', revealResults);

// event handler
function revealResults(event) {
  hideElement(results);
  displayElement(loadingGif);
  calculateResults();
  event.preventDefault();
}

// hide/display elements (reusable functions)
function displayElement(e) {
  e.style.display = 'block';
}

function hideElement(e) {
  e.style.display = 'none';
}

// Math it out
function calculateResults() {
  // Variables for calculations
  const loanAmt = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const pmtYears = document.getElementById('years');
  const monthlyPmt = document.getElementById('monthly-payment');
  const ttlPmt = document.getElementById('total-payment');
  const ttlInterest = document.getElementById('total-interest');

  // Calculations
  const principal = parseFloat(loanAmt.value);
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
    hideElement(loadingGif);
    showAlert();
  }
}

// Show alert
function showAlert() {
  if (alreadyAlerted === false) {
    popupAlert('Please enter all of the values below.');
    alreadyAlerted = true;
    setTimeout(clearAlert, 3000);
  }
}

function popupAlert(alertMssg) {
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-danger';
  alertDiv.appendChild(document.createTextNode(alertMssg));
  card.insertBefore(alertDiv, form);
}

function clearAlert() {
  document.querySelector('.alert').remove();
  alreadyAlerted = false;
}
