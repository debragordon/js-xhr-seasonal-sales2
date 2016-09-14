var products = [];
var discounts = [];

//loads the products at full price
var productLoad = new XMLHttpRequest();
productLoad.open("GET", "data/products.json");
productLoad.send();
productLoad.addEventListener("load", function () {
  var data = JSON.parse(this.responseText);
  products = data.products;
  var productContainer = document.getElementById("storefront");
  for (var i = 0; i < products.length; i++) {
    productContainer.innerHTML += `<div class='product'><img src="${products[i].jpg}" alt="" class="block"><div class="inline">${products[i].name} <p class="currentPrice">Current Price $${products[i].reg_price}</p></div></div>`;
  }
});

var seasons = [];
var departments = [];
var discountID = [];
//grabs the seasons and departments from the JSON file
var discountGetter = new XMLHttpRequest();
discountGetter.open("GET", "data/categories.json");
discountGetter.send();
discountGetter.addEventListener("load", function () {
  var data = JSON.parse(this.responseText);
  discounts = data.categories;
  for (var i = 0; i < discounts.length; i++) {
    seasons.push(discounts[i].season_discount);
    departments.push(discounts[i].name);
    discountID.push(discounts[i].id);
  }
  console.log(seasons);
  console.log(departments);
  console.log(discountID);
});

//match deals with products and set to the empty variables (arrays) below
var winterDeals = [];
var autumnDeals = [];
var springDeals = [];

///////////////// I am stuck here /////////////////

//click events to dynamically display the correct deals ... including swapping out the price
function listClicker(){
  var e = document.getElementById("discount-selector");
    if (e.selectedIndex === "autumn") {
      //display autumnDeals in the DOM
      alert("you picked autumn");
    }
    if (e.selectedIndex === "winter") {
      //display winterDeals in the DOM
      alert("you picked winter");
    }
    if (e.selectedIndex === "spring") {
      //display springDeals in the DOM
      alert("you picked spring");
    }
  }

document.getElementById("discount-selector").addEventListener("click", listClicker);



