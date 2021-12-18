const itemsCart = document.getElementById("cart__items");
const products = JSON.parse(localStorage.getItem("products"));

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

const deleteCarts = document.getElementsByClassName("deleteItem");
console.log(deleteCarts);
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

const changeProduct = document.getElementsByClassName("itemQuantity");

for (let i = 0; i < changeProduct.length; i++) {
  changeProduct[i].addEventListener("change", (e) => {
    const quantity = parseInt(changeProduct[i].value);
    const article = e.target.closest("article");
    updateProduct(article.dataset.id, article.dataset.color, quantity);
  });
}

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

// Check first and last name.

const form = document.getElementsByClassName("cart__order__form");

const validName = (inputName) => {
  const nameRegExp = new RegExp("^[A-Z][a-z]*$");
  // let testName = =nameRegExp.test(inputName.value);
};

firstName.addEventListener("change", () => {
  validName(firstName);
});

lastName.addEventListener("change", () => {
  validName(lastName);
});

// Check address.

const validAddress = (inputAddress) => {
  const addressRegExp = new RegExp("^[0-9]* [a-z]");
  let testAddress = addressRegExp.test(inputAddress.value);

  console.log(testAddress);
};

address.addEventListener("change", () => {
  validAddress(address);
});
