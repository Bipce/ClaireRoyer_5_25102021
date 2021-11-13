const product = JSON.parse(localStorage.getItem("products"));
console.log(product[0]);

const itemsCart = document.getElementById("cart__items");

for (let i = 0; i < product.length; i++) {
  // Create article tag.
  const cartArticleElement = document.createElement("article");
  cartArticleElement.classList.add("cart__item");
  cartArticleElement.setAttribute("data-id", product[i]._id);
  itemsCart.appendChild(cartArticleElement);

  // Create img div.
  const cartDivImg = document.createElement("div");
  cartDivImg.classList.add("cart__item__img");
  cartArticleElement.appendChild(cartDivImg);
  // Create img element.
  const cartImgElement = document.createElement("img");
  cartImgElement.src = product[i].imageUrl;
  cartImgElement.alt = product[i].altTxt;
  cartDivImg.appendChild(cartImgElement);

  // Create content div.
  const cartDivContent = document.createElement("div");
  cartDivContent.classList.add("cart__item__content");
  cartArticleElement.appendChild(cartDivContent);
  // Create title and price div inside other div.
  const cartTitlePriceDiv = document.createElement("div");
  cartTitlePriceDiv.classList.add("cart__item__content__titlePrice");
  cartDivContent.appendChild(cartTitlePriceDiv);
  // Create title tag.
  const cartNameElement = document.createElement("h2");
  cartNameElement.innerHTML = product[i].name;
  cartTitlePriceDiv.appendChild(cartNameElement);
  // Create price tag.
  const cartPriceElement = document.createElement("p");
  cartPriceElement.innerHTML = `${product[i].price} €`;
  cartTitlePriceDiv.appendChild(cartPriceElement);

  // Create settings div.
  const cartSettingsDiv = document.createElement("div");
  cartSettingsDiv.classList.add("cart__item__content__settings");
  cartDivContent.appendChild(cartSettingsDiv);
  // Create quantity div in first settings div.
  const cartQuantityDiv = document.createElement("div");
  cartQuantityDiv.classList.add("cart__item__content__settings__quantity");
  cartSettingsDiv.appendChild(cartQuantityDiv);
  // Create p tag for quantity.
  const cartQuantityElement = document.createElement("p");
  cartQuantityElement.innerHTML = "Qté :"; // Add quantity once it's done.
  cartQuantityDiv.appendChild(cartQuantityElement);
  // Create input
  const cartInputElement = document.createElement("input");
  (cartInputElement.type = "number"),
    (cartInputElement.min = 1),
    (cartInputElement.max = 100),
    (cartInputElement.name = "itemQuantity"),
    (cartInputElement.value = ""); // Add value once it's done.
  cartInputElement.classList.add("itemQuantity");
  cartQuantityDiv.appendChild(cartInputElement);

  // Create settings delete div.
  const cartSettingsDeleteDiv = document.createElement("div");
  cartSettingsDeleteDiv.classList.add("cart__item__content__settings__delete");
  cartSettingsDiv.appendChild(cartSettingsDeleteDiv);
  // Create p tag.
  const cartDeleteElement = document.createElement("p");
  cartDeleteElement.classList.add("deleteItem");
  cartDeleteElement.innerHTML = "Supprimer";
  cartSettingsDeleteDiv.appendChild(cartDeleteElement);
}
