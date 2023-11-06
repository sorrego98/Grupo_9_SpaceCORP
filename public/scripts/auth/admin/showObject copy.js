const selectedTable = document.getElementById("subtitle-table");
let customLayoutContent = '';
const tableToRouteMap = {
    "galería": "gallery",
    "producciones": "productions",
    "categorías": "category",
    "subcategorías": "subcategory",
    "productos": "product",
    "tipos de precio": "pricetype",
    "usuarios": "user",
    "roles de usuarios": "role",
  };

let rowIndex
document.body.addEventListener("click", e => {
    
    const modal = document.querySelector('.modal');
    tableBody.addEventListener("click", e => {
        rowIndex = e.target.closest("tr").rowIndex - 1;
    })

    if (e.target.classList.contains("fa-eye")) {        
        showSingleElement()        
    }else if (e.target.classList.contains("fa-trash")) {
        deleteSingleElement();
    }else if (e.target.classList.contains("fa-pencil")) {
        
        
    }else if (e.target.classList.contains("accept")) {        
        fetchResult();
    }else if (e.target.classList.contains("reject")) {
        closeModal();
    }
});

async function deleteSingleElement () {
    const rowData = dataTable[rowIndex];
    const url = "/mostrarModal/destroy/"
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error de red (código " + response.status + ")");
        }
        const viewModal = await response.text();
        createModal(viewModal);            
        const keyvalues = document.getElementById("list-keyvalues");
        keyvalues.innerHTML = '';
        for (const key in rowData) {
            if (key !== "password" && typeof rowData[key] !== "object") {
            const { itemKey, itemData } = createJSON(key, rowData[key]);
            const itemKeyValue = rowJSON(itemKey, itemData);
            keyvalues.appendChild(itemKeyValue);
            }
        }
    } catch (error) {
        console.log(error);
        console.error("Error al cargar el contenido EJS:", error);
    }
}
async function showSingleElement () {
    let modalName = selectedTable.innerHTML.toLowerCase();
    const rowData = dataTable[rowIndex];
    if (modalName in tableToRouteMap) {
        const routeName = tableToRouteMap[modalName];
        const url = "/mostrarModal/show/" + routeName;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error de red (código " + response.status + ")");
            }
            const viewModal = await response.text();
            createModal(viewModal);            
            const titleElement = document.getElementById("title-table");
            titleElement.textContent = "Mostrando el ID " + rowData.id;
            assignModal(rowData, routeName);
        } catch (error) {
            console.log(error);
            console.error("Error al cargar el contenido EJS:", error);
        }
    }
}

async function fetchResult () {
    const alertContainer = document.getElementById("alert-container");
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
          alertContainer.innerHTML = "";
          const jsonResponse = await response.json();
          if (jsonResponse.success) {
            jsonResponse.data.forEach((messageData) => {
                const alertDiv = document.createElement("div");
                alertDiv.classList.add("custom-alert");
                alertDiv.textContent = messageData.message;
                alertContainer.appendChild(alertDiv);
              });

        //   alert(jsonResponse.data);
        } else {
          alert('Error: ' + jsonResponse.errors.join(', '));
        }
      } else {
        alert('Error de red: ' + response.statusText);
      }
    } catch (error) {
      window.location.href = '/admin';
      console.error('Error de red:', error);
    }
    
}

function createModal (viewModal) {
    const createContainer = document.createElement("div");
    createContainer.classList.add('modal');
    createContainer.innerHTML = viewModal;
    document.body.insertBefore(createContainer, mainElement);
}
   
function assignModal(selectedItem, type) {
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
    if (modal) {
        document.body.removeChild(modal);
    }
}

function createJSON(key, value) {
    const itemKey = document.createElement("strong");
    const itemData = document.createElement("span");
    itemKey.textContent = key + ": ";
    itemData.textContent = value;
    return { itemKey, itemData };
}

function rowJSON(itemKey, itemData) {
    const itemKeyValue = document.createElement("div");
    itemKeyValue.appendChild(itemKey);
    itemKeyValue.appendChild(itemData);
    return itemKeyValue;
}