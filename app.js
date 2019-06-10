// grab the form
const form = document.getElementById('loan-form');

// Listen for submit
form.addEventListener('submit', calculateResults);

// Math
function calculateResults(event) {
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
  /* console.log(
    `${loanAmt.value}, ${interest.value}, ${pmtYears.value}, ${
      monthlyPmt.value
    }, ${ttlPmt.value}, ${ttlInterest.value}`
  ); */

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
  } else {
    // console.log(`this isn't finite`); // verify else works, then code the showError function
    showError('Please enter all of the values below.');
  }

  event.preventDefault();
}

// Show error

function showError(errorMssg) {
  const card = document.querySelector('.card');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger'; // bootstrap classes
  errorDiv.appendChild(document.createTextNode(errorMssg));
  // Insert error after heading
  card.insertBefore(errorDiv, form);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
