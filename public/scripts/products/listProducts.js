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

accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
        categoryIndex = accordion.getAttribute("data-category-index");
        const panel = accordion.querySelector(".panel");
        
        accordion.classList.toggle("show");
        if (!accordion.classList.contains("show")) {
            // Si el accordion no tiene la clase "show", quito la clase "show" de todos los subAccordions
            panel.classList.remove("show");
            subAccordions.forEach((subAccordion) => {
                subAccordion.classList.remove("show");
                subAccordion.querySelector(".sub-panel").classList.remove("show");
            });
        }else{
            panel.classList.add("show");
        }
    });
});

subAccordions.forEach((subAccordion) => {
    subAccordion.addEventListener("click", e => {
        e.stopPropagation();
        subcategoryIndex = subAccordion.getAttribute("data-subcategory-index");
        subAccordion.classList.toggle("show");
        const subPanel = subAccordion.querySelector(".sub-panel");
        subPanel.classList.toggle("show");
    });
});

pElements.forEach((p) => {
    p.addEventListener("click", e => {
        e.stopPropagation();
        productIndex = p.getAttribute("data-product-index");
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
        const category = productData[categoryIndex];
        const subcategory = category.subcategories[subcategoryIndex];
        const clickedProduct = subcategory.products[productIndex];

        const productTitle = document.getElementById("productTitle");
        const productImage = document.getElementById("productImage");
        const productDescription = document.getElementById("productDescription");
        const productPrice = document.getElementById("productPrice");

        productTitle.textContent = clickedProduct.name;
        productImage.src = "/db-images/products/products/" + clickedProduct.image;
        productDescription.textContent = clickedProduct.description;
        productPrice.textContent = (
            clickedProduct.price == null 
                ? clickedProduct.productprices.name
                : clickedProduct.price + "USD " + clickedProduct.productprices.name);

        modal.style.display = "grid";
        document.body.classList.add('modal-open');
    });
});

modalContent.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove('modal-open');
});
