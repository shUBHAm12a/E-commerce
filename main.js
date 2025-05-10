window.addEventListener("DOMContentLoaded", () => {
  fetch("product.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched Data:", data);
      const wrapper = document.querySelector(".PRODUCT-INNER-WRAPPER");

      if (wrapper) {
        const products = data.product;

        wrapper.innerHTML = products
          .map(
            (product, index) => `
            <div class="PRODUCT">
                <div class="PRODUCT-IMAGE-WRAPPER">
                    <img src="${product.image}" alt="${
              product.title
            }" onerror="this.src='fallback.jpg'">
                </div>
                <h1 class="product-title">${product.title}</h1>
                <p>${
                  product.description.length > 40
                    ? product.description.substring(0, 40) + "..."
                    : product.description
                }</p>
                <div class="product-price-container">
                    <div class="product-price">
                        $${product.price}.00
                        <div class="ICON">
                            <i class="fa-solid fa-cart-arrow-down CART-ICONS"></i>
                            <i class="fa fa-heart Heart" data-product-id="${
                              product.id
                            }" data-index="${index}"></i>
                        </div>
                    </div>
                </div>
            </div>
          `
          )
          .join("");

        document.querySelectorAll(".Heart").forEach((heart) => {
          heart.addEventListener("click", (event) => {
            const index = parseInt(event.target.getAttribute("data-index"));
            const productId = parseInt(
              event.target.getAttribute("data-product-id")
            );

            let savedProducts = (
              JSON.parse(localStorage.getItem("selectedProducts")) || []
            ).filter(Boolean);

            // Safe check
            if (!savedProducts.some((item) => item && item.id === productId)) {
              savedProducts.push(products[index]);
            }

            localStorage.setItem(
              "selectedProducts",
              JSON.stringify(savedProducts)
            );
            console.log("Saved Products:", savedProducts);
            window.location.href = "hellprac.html";
          });
        });
      }

      // Render on hellprac.html
      if (window.location.pathname.includes("hellprac.html")) {
        const savedProducts = (
          JSON.parse(localStorage.getItem("selectedProducts")) || []
        ).filter(Boolean);
        const container = document.querySelector(".SAVED-PRODUCTS");

        if (!container) {
          console.error("❌ ERROR: Container for saved products not found!");
          return;
        }

        if (savedProducts.length === 0) {
          container.innerHTML = "<p>No saved products.</p>";
          return;
        }

        container.innerHTML = savedProducts
          .map(
            (product) => `
            <div class="PRODUCT">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='fallback.jpg'" style="width: 200px;">
                <h2>${product.title}</h2>
                <p>$${product.price}.00</p>
            </div>
          `
          )
          .join("");
      }
    })
    .catch((error) => console.error("Error loading products:", error));
});
