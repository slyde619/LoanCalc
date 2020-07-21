// DEFINE UI VARIABLES
const loanForm = document.querySelector('#loan-form')
const amountLoan = document.getElementById('amount')
const interest = document.getElementById('interest')
const years = document.getElementById('years')
const monthlyPayment = document.getElementById('monthly-payment')
const totalPayment = document.getElementById('total-payment')
const totalInterest = document.getElementById('total-interest')

// Calculate Result Function
function calculateResults(){
  // Get Principal
  const principal = parseFloat(amount.value) //Turning it into a decimal form
  // Get calculated interest
  const calculatedInterest = parseFloat(interest.value) / (100) / (12)
  // Get Calculated payments
  const calculatedPayment = parseFloat(years.value) * 12
  // Compute Monthly payment
  const el = Math.pow(1 + calculatedInterest, calculatedPayment)
  const monthly = ((principal * el * calculatedInterest) / (el - 1))
  // To check for finite result from monthly
  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2)
    totalPayment.value = (monthly * calculatedPayment).toFixed(2)
    totalInterest.value = ((monthly * calculatedPayment) - principal)
    .toFixed(2)
    
    // Show Results and Hide Spinner
    const results = document.querySelector('#results').style.display = 'block'
    const loader = document.querySelector('#loader').style.display = 'none'
  } else{
    showError('Please Check Your Inputs!!!')
  }

}

// Listen for submit event
loanForm.addEventListener('submit', function(event){

  // show loader
  const loader = document.querySelector('#loader').style.display = 'block'
  setTimeout(calculateResults, 1000)

  event.preventDefault()
} )

// Function ShowError
function showError(error){
  // Hide results if no inputs is passed
  const results = document.querySelector('#results').style.display = 'none'
  const loader = document.querySelector('#loader').style.display = 'none'
  // Get Elements
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')

  // Create Div Element
  const errorDiv = document.createElement('div')
 
  // Add Class
  errorDiv.className = 'alert alert-danger'

  // Add text and append to Div
  errorDiv.appendChild((document.createTextNode(error)))

  // Insert errorDiv before Heading
  card.insertBefore(errorDiv, heading)

  // clear error message after some time
  window.setTimeout(clearError, 1500)
}

// Clear Error
function clearError(){
  document.querySelector('.alert').remove()
}