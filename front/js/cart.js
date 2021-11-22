const itemsCart = document.getElementById("cart__items");
const products = JSON.parse(localStorage.getItem("products"));

const setView = () => {
  itemsCart.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    itemsCart.innerHTML += `
  <article class="cart__item" data-id="${products[i]._id}">
                <div class="cart__item__img">
                  <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${products[i].name}</h2>
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
const key = "products";

const deleteItem = (i) => {
  products.splice(i, 1);
  localStorage.setItem(key, JSON.stringify(products));
};

for (let i = 0; i < deleteCarts.length; i++) {
  deleteCarts[i].addEventListener("click", () => {
    deleteItem(i);
    setView();
  });
}
