fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((products) => {
    console.log(products);
    const items = document.getElementById("items");

    for (const product of products) {
      const linkElement = document.createElement("a");
      linkElement.href = `./product.html?id=${product._id}`;
      items.appendChild(linkElement);

      const articleElement = document.createElement("article");
      linkElement.appendChild(articleElement);

      const imgElement = document.createElement("img");
      imgElement.src = `${product.imageUrl}`;
      articleElement.appendChild(imgElement);
      imgElement.alt = `${product.altTxt}`;

      const titleElement = document.createElement("h3");
      articleElement.appendChild(titleElement);
      titleElement.classList.add("productName");
      titleElement.innerHTML = product.name;

      const pElement = document.createElement("p");
      articleElement.appendChild(pElement);
      pElement.classList.add("productDescription");
      pElement.innerHTML = product.description;
    }
  });
