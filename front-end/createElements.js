function createElements(product) {
  const card = document.createElement("div");
  card.className = "card";
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  const h2 = document.createElement("h2");
  h2.textContent = product.name;
  const p = document.createElement("p");
  p.textContent = product.description;

  const buyBtn = document.createElement("btn");
  button.textContent = product.addtocard;

  card.append(img, h2, p, buyBtn);

  document.getElementById("available-item").appendChild(card);
}
