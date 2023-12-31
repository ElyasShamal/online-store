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

// when dom loaded
document.addEventListener("DOMContentLoaded", () => {
  getData();
});

const getData = async () => {
  const response = await fetch(
    "https://online-store-1ip2.onrender.com/inventory"
  );
  const getProducts = await response.json();
  getProducts.forEach((product) => createElements(product));
  if (response) {
    hideLoader();
  }
};

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

function hideLoader() {
  document.getElementById("loading").style.display = "none";
}

// create slider
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
        const sliderTextElem = document.createElement("div");
        sliderTextElem.classList.add("slider-text");
        const h3 = document.createElement("h3");
        h3.textContent = sliderText[sliderIndex].name;
        sliderTextElem.appendChild(h3);
        const p = document.createElement("p");
        p.textContent = sliderText[sliderIndex].description;
        sliderTextElem.appendChild(p);
        const button = document.createElement("button");
        button.textContent = sliderText[sliderIndex].addtocard;
        button.id = "button-card";
        button.classList.add("buy-btn");

        sliderTextElem.appendChild(button);
        slider.appendChild(sliderTextElem);
      }

      const sliders = document.querySelectorAll(containerClass);

      sliders.forEach((slider) => {
        updateSlider(slider);
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

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  searchInput.addEventListener("input", debounce(handleSearch, 300));

  async function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
      searchResults.innerHTML = "";
      return;
    }

    try {
      const response = await fetch(
        `https://online-store-1ip2.onrender.com/inventory`
      );
      const inventory = await response.json();

      const results = inventory.filter((item) =>
        item.name.toLowerCase().includes(query)
      );

      displayResults(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function displayResults(results) {
    searchResults.innerHTML = "";

    if (results.length === 0) {
      searchResults.innerHTML = "No results found.";
      return;
    }

    results.forEach((item) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("result-item");

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.name;

      const title = document.createElement("h3");
      title.textContent = item.name;

      const buyButton = document.createElement("button");
      buyButton.textContent = item.addtocard;

      const description = document.createElement("p");
      description.textContent = item.description;

      resultItem.appendChild(image);

      resultItem.appendChild(title);

      resultItem.appendChild(description);
      resultItem.appendChild(buyButton);

      searchResults.appendChild(resultItem);
    });
  }

  function debounce(func, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }
});
