"use strict";

// Object to store delivery information
var delivInfo = {};

// Element to display delivery summary
var delivSummary = document.getElementById("deliverTo");

// Object to store food information
var foodInfo = {};

// Element to display food order summary
var foodSummary = document.getElementById("order");

// Function to process the pizza choices
function processFood() {
  var prop;
  var crustOpt = document.getElementsByName("crust"); // Get crust options
  var toppings = 0; // Initialize toppings count
  var toppingBoxes = document.getElementsByName("toppings"); // Get topping checkboxes
  var instr = document.getElementById("instructions"); // Get special instructions textarea

  // Determine selected crust
  if (crustOpt[0].checked) {
    foodInfo.crust = crustOpt[0].value;
  } else {
    foodInfo.crust = crustOpt[1].value;
  }

  // Get selected size
  foodInfo.size = document.getElementById("size").value;

  // Loop through topping checkboxes
  for (var i = 0; i < toppingBoxes.length; i++) {
    if (toppingBoxes[i].checked) {
      toppings++;
      foodInfo["topping" + toppings] = toppingBoxes[i].value; // Store selected toppings
    }
  }

  // Store special instructions
  foodInfo.instructions = instr.value !== "" ? instr.value : "";

  // Display food order summary
  foodSummary.innerHTML += "<p><span>Crust</span>: " + foodInfo.crust + "</p>";
  foodSummary.innerHTML += "<p><span>Size</span>: " + foodInfo.size + "</p>";
  foodSummary.innerHTML += "<p><span>Topping(s)</span>: " + "</p>";
  foodSummary.innerHTML += "<ul>";

  // Loop through selected toppings and display them
  for (var i = 1; i < 6; i++) {
    if (foodInfo["topping" + i]) {
      foodSummary.innerHTML += "<li>" + foodInfo["topping" + i] + "</li>";
    }
  }

  foodSummary.innerHTML += "<ul>";
  foodSummary.innerHTML += "<p><span>Instructions</span>: " + foodInfo.instructions;
  document.getElementById("order").style.display = "block"; // Display food order summary
}

// Function to process delivery information from the form
function processDeliveryInfo() {
  var prop;

  // Get delivery information from form inputs
  delivInfo.name = document.getElementById("nameinput").value;
  delivInfo.addr = document.getElementById("addrinput").value;
  delivInfo.city = document.getElementById("cityinput").value;
  delivInfo.email = document.getElementById("emailinput").value;
  delivInfo.phone = document.getElementById("phoneinput").value;

  // Display delivery information
  for (prop in delivInfo) {
    delivSummary.innerHTML += "<p>" + delivInfo[prop] + "</p>";
  }
  document.getElementById("deliverTo").style.display = "block"; // Display delivery information
}

// Function to preview the order by displaying both delivery and food information
function previewOrder() {
  processDeliveryInfo(); // Process delivery information
  processFood(); // Process food information
  document.getElementsByTagName("section")[0].style.display = "block"; // Display order summary section
}

// Event listener for the preview order button
function createEventListener() {
  var submitButton = document.getElementById("previewBtn");
  if (submitButton.addEventListener) {
    submitButton.addEventListener("click", previewOrder, false);
  } else if (submitButton.attachEventListener) {
    submitButton.attachEventListener("onclick", previewOrder);
  }
}

// Event listener for page load to set up the button listener
if (window.addEventListener) {
  window.addEventListener("load", createEventListener, false);
} else if (window.attachEventListener) {
  window.attachEventListener("onload", createEventListener);
}
