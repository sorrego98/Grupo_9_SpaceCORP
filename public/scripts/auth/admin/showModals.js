console.log("Show Modals its working")
const showModal = document.querySelector(".modal");
const addElement = document.querySelector(".add-element");
const buttonCloseModal = document.querySelector(".modal-close")


addElement.addEventListener("click", () => {
    showModal.classList.remove("modal-hidden")
})

buttonCloseModal.addEventListener("click", () => {
    showModal.classList.add("modal-hidden")
})