// ==========================================================================
// JavaScript
// ==========================================================================

// Email Vaildator
// Variables
const $form_EmailAddress = $('#emailAd');
let isValidEmailAddress = ()=> /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($form_EmailAddress.val());

// Checks if the email field is empty or invalid. Show's error alerts when needed
function validateForm() {
    let emailaddressForm = document.forms["contactForm"]["emailaddress"].value;
  
    if (emailaddressForm == "") {
      alert("Email Address must be filled out");
     return false; 
    } else if (!isValidEmailAddress()) {
      alert("Not a valid email address");
      return false;
    } else {
      return true;
    }
  }
  
  // Prevents the page from refreshing when you click on the submit button
  const $submitBtn = $('.btn-submit');
  
  $submitBtn.on('click', function(event){
    if (validateForm() ) {
      alert('Form Submitted')
      $('#contactFormSubmit')[0].reset();
    } else
    event.preventDefault();
  });
