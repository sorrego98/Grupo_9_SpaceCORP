const URLBase = window.location.origin;
const mainElement = document.querySelector('main');
const editProfileBtn = document.getElementById("edit-profile");
const editPasswordBtn = document.getElementById("edit-password");

document.addEventListener('click', (e) => {
  const iconClick = e.target.closest('.icon-click');

  if (iconClick) {
    const iconId = iconClick.id;
    if (iconId === 'pass-clicked') {
      toggleInputType("userPass", "pass-icon");
    } else if (iconId === 'confirm-clicked') {
      toggleInputType("userPassConfirm", "confirm-icon");
    }
  }

  if (e.target.classList.contains('close')) {
    const modal = document.querySelector('.modal');
    if (modal) {
      document.body.removeChild(modal);
    }
  }
});

editProfileBtn.addEventListener("click", () => {
  loadModalContent("/mostrarModal/user/userEdit");
});

editPasswordBtn.addEventListener("click", () => {
  loadModalContent("/mostrarModal/user/passEdit");
});

async function loadModalContent(url) {
  const existingModal = mainElement.querySelector('.modal');

  if (existingModal) {
    return; // No hace nada si ya existe un modal
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error de red (código " + response.status +")");
    }

    const viewModal = await response.text();
    const createContainer = document.createElement("div");
    createContainer.classList.add('modal');
    createContainer.innerHTML = viewModal;
    document.body.insertBefore(createContainer, mainElement);
  } catch (error) {
    console.error("Error al cargar el contenido EJS:", error);
  }
}

function toggleInputType(inputId, iconClass) {
  const input = document.getElementById(inputId);
  const icon = document.querySelector(`.${iconClass}`);
  
  if (input && icon) {
    input.type = input.type === "password" ? "text" : "password";
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  }
}
