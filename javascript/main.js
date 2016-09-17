var products = [];
var discounts = [];

var discountGetter = new XMLHttpRequest();
discountGetter.open("GET", "data/categories.json");
discountGetter.send();
discountGetter.addEventListener("load", function () {
  var data = JSON.parse(this.responseText);
  discounts = data.categories;
});

//loads the products at full price
var productLoad = new XMLHttpRequest();
productLoad.open("GET", "data/products.json");
productLoad.send();
productLoad.addEventListener("load", function () {
  var data = JSON.parse(this.responseText);
  products = data.products;
  domWriter();
});

var originalPrice = [];

function domWriter (discountedSeason) {
  var output = document.getElementById("storefront");
  var currentlyDiscountedSeason = discounts.filter(function(currentItemDiscount){
    return currentItemDiscount.season_discount === discountedSeason;
  })[0];
  // console.log(currentlyDiscountedSeason);
  var productDetails = "";
    for (var i=0; i<products.length; i++){
      productDetails += `<div class='product'><p class="mainName">${products[i].name}</p>`;
      productDetails += `<img src='${products[i].jpg}' class='block'>`;
        if (currentlyDiscountedSeason && products[i].category_id === currentlyDiscountedSeason.id) {
          var salePriceToShow = products[i].price-(products[i].price*currentlyDiscountedSeason.discount);
          productDetails += `<p class='salePrice'>${currentlyDiscountedSeason.season_discount} Sale $${Math.round(salePriceToShow*100)/100}</p>`;
        } else {
            productDetails += `<p>$${products[i].price}</p>`;
        }
      productDetails += `<p class='info'>Department: ${discounts[products[i].category_id - 1].name}</p></div>`;

    };
    output.innerHTML = productDetails;
}

var selectedSeason = document.getElementById("discount-selector");

selectedSeason.addEventListener("change", function (e) {
  domWriter(e.target.value);
});