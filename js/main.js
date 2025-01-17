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
let isValidEmailAddress = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($form_EmailAddress.val());

// Global Arrays
let emailList = [];
let emailValue = $("#emailAd").val();

// Check if collections exist in localStorage
let collections = JSON.parse(localStorage.getItem('image-Collections')) || {};

///////
// Function to validate email address
//////
function validateForm() {
  let emailaddressForm = document.forms["contactForm"]["emailaddress"].value;

  if (emailaddressForm == "") {
    displayMessage("Email Address must be filled out", "error");
    return false;
  } else if (!isValidEmailAddress()) {
    displayMessage("Not a valid email address", "error");
    return false;
  } else {
    return true;
  }
}

//////
// Prevents the user from submitting the email form by pressing enter
/////
jQuery.each($("#contactFormSubmit").find('input'), function(){
  $(this).bind('keypress keydown keyup', function(e){
     if(e.keyCode == 13) { e.preventDefault();  displayMessage('Please use the "add image to collection button"', "error"); }
  });
});

///////
// Function to display messages in the alert box
///////
function displayMessage(message, type) {
  const alertBox = $('#alert-box');
  alertBox.text(message);  // Set the message text

  // Set the class based on success or error
  if (type === "error") {
    alertBox.removeClass("success").addClass("error");
  } else if (type === "success") {
    alertBox.removeClass("error").addClass("success");
  }

  alertBox.show();  // Show the alert box
  setTimeout(() => {
    alertBox.fadeOut();  // Fade out the alert box after 3 seconds
  }, 3000);
}
//////////
// Submit Image Function 
/////////
const $submitBtn = $('.btn-submit');

$submitBtn.on('click', function(event) {
  const randomImage = document.getElementById('random-image');
  const imageUrl = randomImage.src;

  if (validateForm()) {
    let emailValue = $("#emailAd").val();

    // Check if the image already exists in the collection for this email
    if (collections[emailValue] && collections[emailValue].includes(imageUrl)) {
      displayMessage('This image has already been added to your collection.', "error");
      return;  // Exit the function without adding the image
    }

    // If it's a new image, proceed to add it to the collection
    displayMessage('Image Added to Collection', "success");
    
    // Add the value to the email array
    emailList.push(emailValue);

    // Check if an array for this email exists, if not, create one
    if (!collections[emailValue]) {
      collections[emailValue] = [];
    }
    // Add the image to the collection for that email
    collections[emailValue].push(imageUrl);

    // Store collections in localStorage
    localStorage.setItem('image-Collections', JSON.stringify(collections));

    // Adds the email to the dropdown menu if it doesn't exist already
    if ($('#email-dropdown option[value="' + emailValue + '"]').length === 0) {
      $("#email-dropdown").append(`<option value="${emailValue}">${emailValue}</option>`);
    }

    // Select the email that just had an image added
    $('#email-dropdown').val(emailValue); // Select the email in dropdown
  } else {
    event.preventDefault();
  }
});

///////
// Email Drop Down Function
//////
$(document).ready(function() {
  // Add existing emails to the dropdown from the collections in localStorage
  Object.keys(collections).forEach(function(item) {
    $("#email-dropdown").append(`<option value="${item}">${item}</option>`);
  });

  // When an email is selected in the dropdown, update the email input field
  $('#email-dropdown').on('change', function() {
    const selectedEmail = $(this).val();
    
    // Update the input field with the selected email
    $('#emailAd').val(selectedEmail);
    
    // Displays the image collection for the selected email
    displayImagesForEmail(selectedEmail);
  });
});

/////
// Image Generation
////
$(document).ready(function () {
  const randomImage = document.getElementById('random-image');
  const randomSeed = Math.floor(Math.random() * 1000);
  randomImage.src = `${picsumSeed}${randomSeed}${imageResolution}`;

  $('.generate-image-btn').click(function() {
    const randomSeed = Math.floor(Math.random() * 1000);
    randomImage.src = `${picsumSeed}${randomSeed}${imageResolution}`;
  });
});

////////
// Image Collection
////////

$submitBtn.on('click', function() {
  // Create an array for each email in the emailList, if it doesn't exist already
  emailList.forEach(item => {
    if (!Array.isArray(collections[item])) {
      collections[item] = [];
    }
  });
});

// Display Images for Selected Email
function displayImagesForEmail(email) {
  const allocatedImagesContainer = document.querySelector('.image-collection');

  // Clear existing images
  allocatedImagesContainer.innerHTML = '';

  // If no email is selected, return
  if (!email) return;

  // Retrieve the images for the selected email from collections
  const images = collections[email] || [];

  // Loop through each image and display it
  images.forEach(imageUrl => {
    const container = document.createElement('div');
    container.className = 'sub-picture-container';

    const img = document.createElement('img');
    img.className = 'chosen-image';
    img.src = imageUrl;

    container.appendChild(img);
    allocatedImagesContainer.appendChild(container);
  });
}

// Display images when email is selected from dropdown
$('#email-dropdown').on('change', function() {
  const selectedEmail = $(this).val();
  displayImagesForEmail(selectedEmail);
});
$('#email-dropdown').on('click', function() {
  const selectedEmail = $(this).val();
  displayImagesForEmail(selectedEmail);
});
$('.btn-submit').on('click', function() {
  const selectedEmail = $("#email-dropdown").val();
  displayImagesForEmail(selectedEmail);
});

// Clearing local storage on click 
$('#clear-all-btn').on('click', function() {
  localStorage.clear();
  displayMessage('All collections have been cleared', "success");
  location.reload();
});

//////
// Clear the collection for the selected email
//////
$('#clear-current-email').on('click', function() {
  const selectedEmail = $('#email-dropdown').val();
  
  if (!selectedEmail) {
    displayMessage('Please select an email to clear its collection', "error");
    return;
  }

  delete collections[selectedEmail];
  localStorage.setItem('image-Collections', JSON.stringify(collections));

  $(`#email-dropdown option[value="${selectedEmail}"]`).remove();

  displayImagesForEmail(null);

  displayMessage(`Collection for ${selectedEmail} has been cleared`, "success");
});

/////////
// Mobile View Buttons
////////
$('#clear-all-btn-mobile').on('click', function() {
  localStorage.clear();
  displayMessage('All collections have been cleared', "success");
  location.reload();
});

$('#clear-current-email-mobile').on('click', function() {
  const selectedEmail = $('#email-dropdown').val();
  
  if (!selectedEmail) {
    displayMessage('Please select an email to clear its collection', "error");
    return;
  }

  delete collections[selectedEmail];
  localStorage.setItem('image-Collections', JSON.stringify(collections));

  $(`#email-dropdown option[value="${selectedEmail}"]`).remove();

  displayImagesForEmail(null);

  displayMessage(`Collection for ${selectedEmail} has been cleared`, "success");
});