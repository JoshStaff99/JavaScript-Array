// ==========================================================================
// JavaScript
// ==========================================================================

////////
// Global Variables
////////

// Image Generation Variables
const picsumSeed = "https://picsum.photos/seed/";
const imageResolution = "/300/400";

// Email Variables
const $form_EmailAddress = $('#emailAd');
let isValidEmailAddress = ()=> /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($form_EmailAddress.val());


//////////
// Email Vaildator
/////////
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

////////
// Image Generation
////////

$(document).ready(function () {
  const randomImage = document.getElementById('random-image');
  const randomSeed = Math.floor(Math.random() * 1000);

  randomImage.src = `${picsumSeed}${randomSeed}${imageResolution}`;
      $('.generate-image-btn').click(function() {
          const randomSeed = Math.floor(Math.random() * 1000);
          randomImage.src = `${picsumSeed}${randomSeed}${imageResolution}`;
      });
});