const selectedTable = document.getElementById("subtitle-table");
let rowIndex
const tables = {
    "staff": "staff",
    "galería": "gallery",
    "producciones": "productions",
    "categorías": "category",
    "subcategorías": "subcategory",
    "productos": "product",
    "tipos de precio": "pricetype",
    "usuarios": "user",
    "roles de usuarios": "role",
};

const fieldMappings = {
    staff: {
      memberName: "name",
      memberPosition: "jobName",
      memberIG: "instagramName",
      memberIGURL: "instagramUrl",
      memberImage: "image",
    },
    gallery: {
      galleryName: "name",
      galleryImage: "image",
    },
    productions: {
      productionTitle: "songTitle",
      productionArtist: "artistName",
      productionYTUrl: "youtubeUrl",
    },
    category: {
      categoryName: "name",
    },
    subcategory: {
      subCategoryName: "name",
      subCategoryDescription: "description",
      subCategoryCategory: "category.name",
    },
    product: {
      productName: "name",
      productDescription: "description",
      productPrice: "price",
      productSubCategory: "subcategories.name",
      productImage: "image",
      productStatus: "status",
      productPriceType: "productprices.name",
    },
    pricetype: {
      priceTypeName: "name",
    },
    user: {
      userImage: "imageProfile",
      userFirstName: "firstName",
      userLastName: "lastName",
      userEmail: "email",
      userRole: "roles.roleName",
      userName: "userName",
    },
    role: {
      roleName: "roleName",
    },
  };

document.body.addEventListener("click", e => {
    tableBody.addEventListener("click", e => {
        rowIndex = e.target.closest("tr").rowIndex - 1;
    })
    if (e.target.classList.contains("fa-eye")) {
        showViewElement()
    }else if (e.target.classList.contains("fa-pencil")){
        showEditableElement()    
        
    }else if (e.target.classList.contains("fa-trash")){
        showDeletableElement()    
        
    }else if (e.target.classList.contains("accept")) {        
        destroySingleElement();
    }else if (e.target.classList.contains("reject")) {
        closeModal();
    }
});

async function showEditableElement () {
    
    let modalName = tables[selectedTable.innerHTML.toLowerCase()];
    if (!modalName) {
        console.error("Tabla no reconocida.");
        return;
    }
    const rowData = dataTable[rowIndex];
    const url = "/mostrarModal/edit/" + modalName

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error de red (código " + response.status);
        }
        const viewModal = await response.text();
        createModal(viewModal);
        const titleElement = document.getElementById("title-table");
        titleElement.textContent = "Editando el ID " + rowData.id;
        assignModal(rowData, modalName);
    } catch (error) {
        handleFetchError(error);
    }
}
async function showDeletableElement () {
    const rowData = dataTable[rowIndex];
    try {
        const response = await fetch("/mostrarModal/destroy/");
        if (!response.ok) {
            handleFetchError(response.status);
            return;
        }
        
        const viewModal = await response.text();
        createModal(viewModal);
        createKeyValue(rowData);
    
    } catch (error) {
        handleFetchError(error);
    
    }
}
async function destroySingleElement () {
    const rowData = dataTable[rowIndex];
    let modalName = selectedTable.innerHTML.toLowerCase();
    let objectData = { id: rowData.id, table: modalName };
  
    try {
      const response = await fetch('/admin/destroy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objectData),
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
  
        if (jsonResponse.success) {
            closeModal();
            jsonResponse.data.map( message => alert(message.message));
        } else {
            closeModal();
            jsonResponse.errors.map( message => alert(message.message));
        }
      } else {
        closeModal();
        alert ('Error de red: ' + response.statusText);
      }
    } catch (error) {
        closeModal();
        alert ('Error de red:', error);
    }
}
async function showViewElement () {
    let modalName = tables[selectedTable.innerHTML.toLowerCase()];
    if (!modalName) {
        console.error("Tabla no reconocida.");
        return;
    }
    const rowData = dataTable[rowIndex];
    const url = "/mostrarModal/show/" + modalName
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error de red (código " + response.status);
        }
        const viewModal = await response.text();
        createModal(viewModal);
        const titleElement = document.getElementById("title-table");
        titleElement.textContent = "Mostrando el ID " + rowData.id;
        assignModal(rowData, modalName);

    } catch (error) {
        handleFetchError(error);
    }
}
function createModal (viewModal) {
    const createContainer = document.createElement("div");
    createContainer.classList.add('modal');
    createContainer.innerHTML = viewModal;
    document.body.insertBefore(createContainer, mainElement);
}
function assignModal(selectedItem, type) {
    const fieldMapping = fieldMappings[type];
    if (!fieldMapping) {
        console.error("Tipo no reconocido.");
        return;
    }
    for (const field in fieldMapping) {
        const element = document.getElementById(field);
        if (element) {
          const value = deepValue(selectedItem, fieldMapping[field]);
          element.textContent = value;
          if (field === "userPassword") {
            element.textContent = "[DECRYPTED]"; // Cambia la contraseña en caso de que no esté encriptada
          } else if (field === "userImage") {
            element.src = `/db-images/users/${value}`;
          }
        }
    }
    switch(type){
        case "staff":
            document.getElementById("memberName").textContent = selectedItem.name;
            document.getElementById("memberPosition").textContent = selectedItem.jobName;
            document.getElementById("memberIG").textContent = selectedItem.instagramName;
            document.getElementById("memberIGURL").textContent = selectedItem.instagramUrl;
            document.getElementById("memberImage").src = "/db-images/home/members/" + selectedItem.image;
        break;

        case "gallery":
            document.getElementById("galleryName").textContent = selectedItem.name;
            document.getElementById("galleryImage").src = "/db-images/home/galery/" + selectedItem.image;
        break;
        
        case "productions":
            document.getElementById("productionTitle").textContent = selectedItem.songTitle;
            document.getElementById("productionArtist").textContent = selectedItem.artistName;
            document.getElementById("productionYTUrl").textContent = selectedItem.youtubeUrl;
            document.getElementById("refYT").href = selectedItem.youtubeUrl;
            break;

        case "category":
            document.getElementById("categoryName").textContent = selectedItem.name;
        break;

        case "subcategory":
            document.getElementById("subCategoryName").textContent = selectedItem.name;
            document.getElementById("subCategoryDescription").textContent = selectedItem.description;
            document.getElementById("subCategoryCategory").textContent = selectedItem.category.name;
        break;
        
        case "product":
            document.getElementById("productName").textContent = selectedItem.name;
            document.getElementById("productDescription").textContent = selectedItem.description;
            document.getElementById("productPrice").textContent = selectedItem.price == null ? "" : selectedItem.price + " USD / ";
            document.getElementById("productSubCategory").textContent = selectedItem.subcategories.name;
            document.getElementById("productImage").src = "/db-images/products/" + selectedItem.image;
            document.getElementById("productStatus").textContent = selectedItem.status ? "activo" : "inactivo";
            document.getElementById("productPriceType").textContent = selectedItem.productprices.name;
        break;
        
        case "pricetype":
            document.getElementById("priceTypeName").textContent = selectedItem.name;
        break;
        
        case "user":
            document.getElementById("userImage").src = "/db-images/users/" + selectedItem.imageProfile;
            document.getElementById("userFirstName").textContent = selectedItem.firstName;
            document.getElementById("userLastName").textContent = selectedItem.lastName;
            document.getElementById("userEmail").textContent = selectedItem.email;
            document.getElementById("userRole").textContent = selectedItem.roles.roleName;
            document.getElementById("userName").textContent = selectedItem.userName;
            document.getElementById("userPassword").textContent = "[ENCRYPTED]";
        break;
        
        case "role":
            document.getElementById("roleName").textContent = selectedItem.roleName;
        break;
        
        }
}
function closeModal () {
    const modal = document.querySelector('.modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}
function handleFetchError (error) {
    console.error("Error al cargar el contenido EJS: " + {error});
} 
function createKeyValue (data) {
    const keyvalues = document.getElementById("list-keyvalues");
    keyvalues.innerHTML = '';

    for (const key in data) {
        if (data.hasOwnProperty(key) && key !== "password" && typeof (data[key]) !== "object") {
            const itemKey = document.createElement("strong");
            itemKey.textContent = key + ": " ;
            const itemData = document.createElement("span");
            itemData.textContent = data[key];
            const itemKeyValue = document.createElement("div");
            itemKeyValue.appendChild(itemKey);
            itemKeyValue.appendChild(itemData);
            keyvalues.appendChild(itemKeyValue);
        }
    }
}