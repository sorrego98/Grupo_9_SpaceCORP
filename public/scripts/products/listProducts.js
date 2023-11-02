const accordions = document.querySelectorAll(".accordion");
const subAccordions = document.querySelectorAll(".sub-accordion");
const pElements = document.querySelectorAll(".sub-panel p");
const products = document.querySelectorAll(".products");
const modal = document.getElementById("productModal");
const productAll = document.getElementById("product-data");
const modalContent = document.querySelector(".modal-content");

// Variables para almacenar los índices
let categoryIndex = -1;
let subcategoryIndex = -1;
let productIndex = -1;

accordions.forEach((accordion, i) => {
    accordion.addEventListener("click", () => {
        categoryIndex = i;
        accordion.classList.toggle("show");
        const panel = accordion.querySelector(".panel");
        panel.classList.toggle("show");
        const subPanels = panel.querySelectorAll(".sub-panel.show");
        subPanels.forEach((subPanel) => {
            subPanel.classList.remove("show");
            subPanel.previousElementSibling.classList.remove("show");
        });
    });
});

subAccordions.forEach((subAccordion, j) => {
    subAccordion.addEventListener("click", (event) => {
        event.stopPropagation();
        subcategoryIndex = j;
        subAccordion.classList.toggle("show");
        const subPanel = subAccordion.querySelector(".sub-panel");
        // Alternar la clase "show" en el sub-panel para mostrarlo u ocultarlo
        subPanel.classList.toggle("show");
    });
});

pElements.forEach((p, k) => {
    p.addEventListener("click", (event) => {
        event.stopPropagation();
        productIndex = k;
    });
});

products.forEach((product, index) => {
    product.addEventListener("click", () => {
        // Verifica si se hizo clic en algún elemento antes de mostrar el modal
        if (categoryIndex === -1 || subcategoryIndex === -1 || productIndex === -1) {
            console.error("Debes hacer clic en un elemento antes de mostrar el modal.");
            return;
        }

        const productData = JSON.parse(productAll.getAttribute("data-products"));
        const clickedProduct = productData[categoryIndex].subcategories[subcategoryIndex].products[productIndex];
        console.log(clickedProduct)

        const productTitle = document.getElementById("productTitle");
        const productImage = document.getElementById("productImage");
        const productDescription = document.getElementById("productDescription");
        const productPrice = document.getElementById("productPrice");
        const productPriceType = document.getElementById("productPriceType");

        productTitle.textContent = clickedProduct.name;
        productImage.src = "/db-images/products/products/" + clickedProduct.image;
        productDescription.textContent = clickedProduct.description;
        productPrice.textContent = (clickedProduct.price == null ? "a convenir" : clickedProduct.price);
        productPriceType.textContent =  clickedProduct.productprices.name;

        modal.style.display = "grid";
        document.body.classList.add('modal-open');
    });
});

modalContent.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove('modal-open');
});
