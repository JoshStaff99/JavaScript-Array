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

// Function to validate email address
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

//////////
// Submit Image Function
/////////
const $submitBtn = $('.btn-submit');

$submitBtn.on('click', function(event) {
  const randomImage = document.getElementById('random-image');
  const imageUrl = randomImage.src;
  if (validateForm()) {
    alert('Image Added to Collection');
    // Get the random image URL
    const randomSeed = Math.floor(Math.random() * 1000);
    randomImage.src = `${picsumSeed}${randomSeed}${imageResolution}`;

    // Get the value of the email input field
    let emailValue = $("#emailAd").val();
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

    // Optional: Show the updated array in the console
    console.log(emailList);
  } else {
    event.preventDefault();
  }
});

////////
// Email Drop Down Function
////////
$(document).ready(function() {
  // Add existing emails to the dropdown from the collections in localStorage
  Object.keys(collections).forEach(function(item) {
    $("#email-dropdown").append(`<option value="${item}">${item}</option>`);
  });
});

// Image Generation
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
      console.log(`Created an array for ${item}`);
    }
  });

  // Log the arrays for verification
  console.log(collections);
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