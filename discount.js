var Discounts = (function (Discounts) {
  var products = [];
  var categories = [];
  var productDiv = "";

  Discounts.parseCategories = function() {
    categories = JSON.parse(categoriesRequest.responseText).categories;
    Discounts.addProductToGrid(products);
  },

  Discounts.parseProducts = function() {
    products = JSON.parse(productsRequest.responseText).products;
    Discounts.parseCategories();
  },

  Discounts.loadProductDiv = function() {
    var productDiv = document.createElement("div");
    productDiv.className = "product";
    productGrid.appendChild(productDiv);
    return productDiv;
  },

  Discounts.addProductToGrid = function (products) {
    products.forEach (function (product, index) {
      productDiv = Discounts.loadProductDiv()
      productDiv.id = `${product.id}master`;

      var productCategory = "";

      var getProductCategory = function () {
        for (var i = 0; i < categories.length; i++) {
          if (product.category_id === categories[i].id) {
            productCategory = categories[i];
            return productCategory;
          }
        }
      }
      getProductCategory();

      productDiv.innerHTML = `<p>${product.name}</p>
                              <p class="small">category: ${productCategory.name}</p>
                              <h5 id=${product.id} class="productPrices ${productCategory.season_discount}">Price: $${product.price}</h5>`
    });
  }

  Discounts.applyDiscount = function(event) {
    var currentSeason = "";
    var currentDiscount = "";
    var currentPrice;
    Array.from(seasonSelector.options).map(function(season){
      if (season.selected === true) {
        currentSeasonName = season.value;

        for (var i = 0; i < categories.length; i++) {
          if (currentSeasonName === categories[i].season_discount) {
            currentDiscount = categories[i].discount;
          }
        }
      };
    });

    var allProducts = Array.from(document.getElementsByClassName("productPrices"));
    allProducts.map(function(item){
      for (var i = 0; i<products.length; i++) {
        if (products[i].id === parseInt(item.id)) {
          currentPrice = products[i].price;
        }
      }
      var arrayOfClasses = Array.from(item.classList);
      var setSeasonPrice = function () {
      for (var i = 0; i < arrayOfClasses.length; i++) {
        if(arrayOfClasses[i] === currentSeasonName) {
          var discountedPrice = currentPrice * (1 - currentDiscount);
          item.innerHTML = `Discounted price: $${discountedPrice.toFixed(2)}`;
          break;
        } else {
          item.innerHTML = `Price: ${currentPrice}`;
        }
      }
    }
    setSeasonPrice();
  });
  }

return Discounts;
}(Discounts || {}))