const form = document.querySelector('#create-form');

form.addEventListener('submit', async e => {
    e.preventDefault();
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
    } catch (error) {
        window.location.href = '/admin';
        console.error('Error de red:', error);
    }
});

// Resto del código de la página /admin
