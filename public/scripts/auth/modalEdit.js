console.log("Show Modal its working")
const showModal = document.querySelector(".modal");
const editUser = document.querySelector(".edit-btn");
const buttonCloseModal = document.querySelector(".modal-close")


editUser.addEventListener("click", () => {
    showModal.classList.remove("modal-hidden")
})

buttonCloseModal.addEventListener("click", () => {
    showModal.classList.add("modal-hidden")
})