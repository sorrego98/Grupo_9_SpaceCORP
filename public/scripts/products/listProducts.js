const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
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

const subAccordions = document.querySelectorAll(".sub-accordion");

subAccordions.forEach((subAccordion) => {
    subAccordion.addEventListener("click", (event) => {
        event.stopPropagation();

        subAccordion.classList.toggle("show");
        const subPanel = subAccordion.querySelector(".sub-panel");

        // Alternar la clase "show" en el sub-panel para mostrarlo u ocultarlo
        subPanel.classList.toggle("show");
    });
});

const pElements = document.querySelectorAll(".sub-panel p");
pElements.forEach((p) => {
    p.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});

const products = document.querySelectorAll(".products");
const modal = document.getElementById("productModal");
const modalContent = document.querySelector(".modal-content");

products.forEach((product) => {
    product.addEventListener("click", () => {
        const productTitle = product.textContent;
        const productDescription = "Descripción del producto";
        document.getElementById("productTitle").textContent = productTitle;
        document.getElementById("productDescription").textContent = productDescription;
        modal.style.display = "grid";
        document.body.classList.add('modal-open');
    });
});

modalContent.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove('modal-open');

});