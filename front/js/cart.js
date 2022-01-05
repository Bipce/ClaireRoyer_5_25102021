const itemsCart = document.getElementById("cart__items");
const products = JSON.parse(localStorage.getItem("products"));
products.sort((p1, p2) => p1._id > p2._id);

// Set view of products in cart.
const setView = () => {
  itemsCart.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    itemsCart.innerHTML += `
  <article class="cart__item" data-id="${products[i]._id}" data-color="${products[i].color}">
                <div class="cart__item__img">
                  <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${products[i].name} ${products[i].color}</h2>
                    <p>${products[i].price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${products[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
  `;
  }
};

setView();

// Delete products.
const deleteCarts = document.getElementsByClassName("deleteItem");
const key = "products";

const deleteProduct = (id, color) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i]._id === id && products[i].color === color) {
      products.splice(i, 1);
      break;
    }
  }

  // Other way to do it.
  // const index = products.findIndex((p) => p._id === id && p.color === color);
  // products.splice(index, 1);

  displayTotal();
  localStorage.setItem(key, JSON.stringify(products));
};

for (let i = 0; i < deleteCarts.length; i++) {
  deleteCarts[i].addEventListener("click", (e) => {
    const article = e.target.closest("article");
    deleteProduct(article.dataset.id, article.dataset.color);
    article.remove();
  });
}

// Increase quantity of product already in cart.
const updateProduct = (id, color, quantity) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i]._id === id && products[i].color === color) {
      products[i].quantity = quantity;
      break;
    }
  }

  localStorage.setItem(key, JSON.stringify(products));
  displayTotal();
};

// Change quantity of product.
const changeProduct = document.getElementsByClassName("itemQuantity");

for (let i = 0; i < changeProduct.length; i++) {
  changeProduct[i].addEventListener("change", (e) => {
    let quantity = parseInt(changeProduct[i].value);
    if (quantity <= 0) quantity = 1;
    if (quantity > 100) quantity = 1;
    const article = e.target.closest("article");
    updateProduct(article.dataset.id, article.dataset.color, quantity);
    e.target.value = quantity;
  });
}

// Set view of total Price and Articles.
const displayTotal = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

  for (let i = 0; i < products.length; i++) {
    totalQuantity += products[i].quantity;
    totalPrice += products[i].price * products[i].quantity;
  }
  const price = document.getElementById("totalPrice");
  const quantity = document.getElementById("totalQuantity");

  price.innerHTML = totalPrice;
  quantity.innerHTML = totalQuantity;
};

displayTotal();

// Form validation.
const form = document.getElementsByClassName("cart__order__form");

// Check first, last name and city.
const validNameCity = (inputNameCity) => {
  inputNameCity.value = inputNameCity.value.trim();
  if (!inputNameCity.value) return false;
  //  prettier-ignore
  const nameCityRegExp = new RegExp("^([A-zÀ-ÿ]*)([\\s\'-][A-zÀ-ÿ]*)*$");
  return nameCityRegExp.test(inputNameCity.value);
};

// Check address.
const validAddress = (inputAddress) => {
  inputAddress.value = inputAddress.value.trim();
  if (!inputAddress.value) return false;
  //  prettier-ignore
  const addressRegExp = new RegExp("^[0-9]*[\\s'\\-A-zÀ-ÿ]*$");
  return addressRegExp.test(inputAddress.value);
};

// Check email.
const validEmail = (inputEmail) => {
  inputEmail.value = inputEmail.value.trim();
  if (!inputEmail.value) return false;
  // prettier-ignore
  const emailRegExp = new RegExp("^[a-z0-9-_.]+@[a-z]+\.[a-z]{2,3}$");
  return emailRegExp.test(inputEmail.value);
};

// Order.
order.addEventListener("click", (e) => {
  e.preventDefault();
  firstNameErrorMsg.innerHTML = "";
  lastNameErrorMsg.innerHTML = "";
  cityErrorMsg.innerHTML = "";
  addressErrorMsg.innerHTML = "";
  emailErrorMsg.innerHTML = "";

  let check = true;

  if (!validNameCity(firstName)) {
    check = false;
    firstNameErrorMsg.innerHTML = "Ce n'est pas le bon format.";
  }
  if (!validNameCity(lastName)) {
    check = false;
    lastNameErrorMsg.innerHTML = "Ce n'est pas le bon format.";
  }
  if (!validNameCity(city)) {
    check = false;
    cityErrorMsg.innerHTML = "Ce n'est pas le bon format.";
  }
  if (!validAddress(address)) {
    check = false;
    addressErrorMsg.innerHTML = "Ce n'est pas le bon format.";
  }
  if (!validEmail(email)) {
    check = false;
    emailErrorMsg.innerHTML = "Ce n'est pas le bon format.";
  }
  if (!check) return alert("Vous ne respectez pas un des formats.");

  // Create contact object with all check form.
  const contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  // Create array to get all product id.
  const productsId = [];
  for (let product of products) {
    productsId.push(product._id);
  }

  // Create object for fetch.
  const data = {
    contact,
    products: productsId,
  };

  // Get order id.
  fetch("http://localhost:3000/api/products/order", {
    method: "POST", // Send order.
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json", // Content is JSON type.
    },
  })
    .then((response) => response.json())
    .then((response) => {
      window.location.href = `/front/html/confirmation.html?orderId=${response.orderId}`;
    });
});
