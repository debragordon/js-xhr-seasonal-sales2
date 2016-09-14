var products = [];
var categories = [];

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

//calls the discounts