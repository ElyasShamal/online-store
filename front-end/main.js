const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && nav.classList.contains("show")) {
    nav.classList.remove("show");
  }
});

let bars = document.getElementById("bars");
bars.addEventListener("click", () => {
  if (bars.className === "fa fa-bars") {
    bars.className = "fa fa-close";
  } else {
    bars.className = "fa fa-bars";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://online-store-1ip2.onrender.com/inventory")
    .then((res) => res.json())
    .then((products) => products.forEach((product) => createElements(product)));
});

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

  const buyButton = document.createElement("button");
  buyButton.textContent = product.addtocard;
  buyButton.classList.add("buy-btn");

  //   add elements to dom
  card.append(img, h2, p, buyButton);

  document.getElementById("available-item").appendChild(card);
}

function createSlider(containerClass) {
  fetch("https://online-store-1ip2.onrender.com/inventory")
    .then((response) => response.json())
    .then((data) => {
      const images = [];
      data.forEach((inventory) => {
        images.push(inventory.image);
      });

      const sliderText = [];
      data.forEach((inventory) => {
        sliderText.push({
          name: inventory.name,
          description: inventory.description,
          addtocard: inventory.addtocard,
        });
      });

      let sliderIndex = 0;

      function updateSlider(slider) {
        slider.innerHTML = "";

        const img = document.createElement("img");
        img.src = images[sliderIndex];
        slider.appendChild(img);
        // create sliderTextElem
        const sliderTextElem = document.createElement("div");
        sliderTextElem.classList.add("slider-text");
        // create h3
        const h3 = document.createElement("h3");
        h3.textContent = sliderText[sliderIndex].name;
        sliderTextElem.appendChild(h3);
        // create a paragraph
        const p = document.createElement("p");
        p.textContent = sliderText[sliderIndex].description;
        sliderTextElem.appendChild(p);
        // create a button
        const button = document.createElement("button");
        button.textContent = sliderText[sliderIndex].addtocard;
        button.id = "button-card";
        button.classList.add("buy-btn");

        sliderTextElem.appendChild(button);
        slider.appendChild(sliderTextElem);
      }

      // Get all elements with the specified class
      const sliders = document.querySelectorAll(containerClass);

      // Create a slider for each matching element
      sliders.forEach((slider) => {
        updateSlider(slider);

        // create an interval to update the slider every 10 seconds
        setInterval(() => {
          sliderIndex++;
          if (sliderIndex === images.length) {
            sliderIndex = 0;
          }
          updateSlider(slider);
        }, 5000);
      });
    })
    .catch((error) => console.error(error));
}

createSlider(".slider");
