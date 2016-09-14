var products = [];
var categories = [];

//loads the products
var productLoad = new XMLHttpRequest();
productLoad.open("GET", "data/products.json");
productLoad.send();
productLoad.addEventListener("load", function () {

  var data = JSON.parse(this.responseText);
  // console.log(data);
  products = data.products;
  // console.log(products);
  var productContainer = document.getElementById("storefront");

  for (var i = 0; i < products.length; i++) {
    productContainer.innerHTML += `<div class='product'><img src="${products[i].jpg}" alt="" class="block"><div class="inline">${products[i].name} $${products[i].price}</div></div>`;
  }


});