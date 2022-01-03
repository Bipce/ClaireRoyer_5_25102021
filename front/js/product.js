// Get product id.
const loc = window.location.href; // Get URL.
const url = new URL(loc); // Create new instance of class URL.
const id = url.searchParams.get("id"); // Get id.

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => {
    if (response.ok) return response.json();
    throw new Error("Ce produit n'existe pas.");
  })
  .then((product) => {
    document.title = product.name;

    const imgClassElement = document.getElementsByClassName("item__img");

    const productImg = document.createElement("img");
    productImg.src = product.imageUrl;
    imgClassElement[0].appendChild(productImg);

    title.innerHTML = product.name;

    price.innerHTML = product.price;

    description.innerHTML = product.description;

    const productColors = product.colors;

    const quantityInput = document.getElementById("quantity");
    const colorsElement = document.getElementById("colors");

    // Look through array for colors.
    for (let i = 0; i < productColors.length; i++) {
      const optionProduct = document.createElement("option");
      colorsElement.appendChild(optionProduct);
      optionProduct.setAttribute("value", productColors[i]);
      optionProduct.innerHTML = productColors[i];
    }

    const addCart = document.getElementById("addToCart");

    addCart.addEventListener("click", () => {
      if (
        parseInt(quantityInput.value) <= 0 ||
        parseInt(quantityInput.value) > 100 ||
        colorsElement.value === ""
      ) {
        return alert(
          "Veuillez sélectionner une couleur et un nombre entre 0 et 100."
        );
      } else {
        alert("Produit ajouté au panier.");
      }

      const key = "products";
      product.color = colorsElement.value;
      product.quantity = parseInt(quantityInput.value);

      // Get products array in local storage.
      let products = JSON.parse(localStorage.getItem(key));
      // Set products array if not present in local storage.
      if (products === null) products = [];
      let hasProduct = false;

      for (const item of products) {
        if (item._id === product._id && item.color === product.color) {
          item.quantity += product.quantity;
          hasProduct = true;
        }
      }
      if (hasProduct === false) {
        products.push(product);
      }
      // Set products in local storage.
      localStorage.setItem(key, JSON.stringify(products));
    });
  });
