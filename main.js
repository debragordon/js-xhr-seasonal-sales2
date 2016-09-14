//loads the products
var productLoad = new XMLHttpRequest();
productLoad.open("GET", "products.json");
productLoad.send();
productLoad.addEventListener("load", callCategories);
productLoad.addEventListener("error", Discounts.jsonError);

//categorizes products
var categoryLoad = new XMLHttpRequest();
function callCategories() {
  categoryLoad.open("GET", "categories.json");
  categoryLoad.send();
  categoryLoad.addEventListener("load", Discounts.parseProducts);
  categoryLoad.addEventListener("error", Discounts.jsonError);
}

//grabs product div
var productsOnSale = document.getElementById("storefront");

//grabs shoper's selection
var seasonDiscountselector = document.getElementById("season-discount-select");

seasonDiscountselector.addEventListener("change", Discounts.applyDiscount);