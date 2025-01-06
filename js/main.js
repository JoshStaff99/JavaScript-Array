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
    event.preventDefault();
    return true;
  }
}
  
// Prevents the page from refreshing when you click on the "Add Image To Collection" button
const $submitBtn = $('.btn-submit');
  
$submitBtn.on('click', function(event){
  if (validateForm() ) {
    alert('Image Added to Collection')
    //$('#contactFormSubmit')[0].reset();
  } else
  event.preventDefault();
});

// Prevents the page from refreshing when you click on the "Add Email" button
const $emailAdd = $('.add-email-btn');
  
$emailAdd.on('click', function(event){
  if (validateForm() ) {
    alert('Email Added')
    //$('#contactFormSubmit')[0].reset();
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


// /// Test
// $('input#emailAd').keyup(function (e) {
//   e.preventDefault();
//              if (e.keyCode == 13) {
//                  //Add this
//                  e.returnValue=false;
//                  e.cancel = true;
 
//                  return false;
//              }
 
//          });