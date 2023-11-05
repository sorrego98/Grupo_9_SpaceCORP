const mainElement = document.querySelector('main');
const form = document.querySelector('#create-form');
const btnAddElement = document.querySelector(".add-element");

btnAddElement.addEventListener("click", () => {
    
    const modalName = subTable.innerHTML.toLowerCase();
    
    fetch("/mostrarModal/" + modalName)
        .then((response) => response.text())
        .then((modalContent) => {
            const mainElement = document.querySelector('main');            
            const modalContainer = document.createElement("div");

            modalContainer.classList.add('modal');
            
            modalContainer.innerHTML = modalContent;
            document.body.insertBefore(modalContainer, mainElement);

            const titleTable = document.getElementById("title-table");
            titleTable.innerHTML = "Agregar " + modalName;
        })
        .catch(error => {
            console.error("Error en la solicitud fetch:", error);
        });
});

mainElement.addEventListener('submit', async e => {
    if (e.target.id === 'create-form') {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        formData.append('memberName', document.getElementById('memberName').value);
        formData.append('memberPosition', document.getElementById('memberPosition').value);
        formData.append('instagramUsername', document.getElementById('instagramUsername').value);
        formData.append('instagramURL', document.getElementById('instagramURL').value);

        const fileInput = document.getElementById('image');
        formData.append('image', fileInput.files[0]);

        try {
            const response = await fetch('/admin/create/staff', {
                method: 'POST',
                body: formData
            });

            // Manejar la respuesta si es necesario
        } catch (error) {
            window.location.href = '/admin';
            console.error('Error de red:', error);
        }
    }
});