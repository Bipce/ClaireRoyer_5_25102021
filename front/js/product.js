const loc = window.location.href;
const url = new URL(loc);
const id = url.searchParams.get("id");
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => {
    if (response.ok) return response.json();
    throw new Error("mauvais id");
  })
  .then((product) => {
    console.log(product);

    price.innerHTML = product.price;

    description.innerHTML = product.description;

    const productColors = product.colors;
    console.log(productColors);

    for (let i = 0; i < productColors.length; i++) {
      const optionElement = document.createElement("option");
      colors.appendChild(optionElement);
      optionElement.setAttribute("value", productColors[i]);
      optionElement.innerHTML = productColors[i];
    }
  });
