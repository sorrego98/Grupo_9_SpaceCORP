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
const methods = {
    "staff": {button: "btn-staff", method: "staff"},
    "categorías": {button: "btn-cats", method: "categorias"},
    "tipos de precio": {button: "btn-price", method: "precios"},
    "galería": {button: "btn-gallery", method: "galeria"},
    "producciones": {button: "btn-prods", method: "producciones"},
    "roles de usuarios": {button: "btn-type-users", method: "roles"},
    "subcategorías": {button: "btn-subcats", method: "subcats"},
    "productos": {button: "btn-products", method: "productos"},
    "usuarios": {button: "btn-users", method: "users"},
};
const fieldMappings = {
    staff: {
      memberName: "name",
      memberPosition: "jobName",
      memberIG: "instagramName",
      memberIGURL: "instagramUrl",
      memberImage: "image",
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
      userImage: "image",
      userFirstName: "firstName",
      userLastName: "lastName",
      userEmail: "email",
      userRole: "roles.roleName",
      userName: "userName",
      userPassword: "[ENCRYPTED]"
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
    }
    else if (e.target.classList.contains("fa-pencil")){
        showEditableElement()    
        
    }
    else if (e.target.classList.contains("fa-trash")){
        showDeletableElement()    
        
    }else if (e.target.classList.contains("delete")) {     
        e.preventDefault() 
        destroySingleElement();
    }else if (e.target.classList.contains("reject")) {
        closeModal();
    }else if (e.target.classList.contains("update")) {
        e.preventDefault() 
        updateSingleElement();
        // closeModal();
    }
    // else if (e.target.classList.contains("create")) {
    //     console.log("entre")
    //     e.preventDefault() 
    //     createSingleElement()    
    // }
});

async function showEditableElement () {
    let title = selectedTable.innerHTML.toLowerCase()
    let modalName = tables[title];
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
    } catch (error) {
        handleFetchError(error);
    }
    
    switch(modalName){
        case "subcategory":        
            assignSelectors("selectCategory", "category", rowData.catId)
            
        break;
        case "user":
            assignSelectors("selectRole", "roles", rowData.roles.id)

        break;
        case "product":
            assignSelectors("selectSubcategory", "subcategory", rowData.subCatId)
            assignSelectors("selectTypeprice", "precios", rowData.priceId)
        break;
    }
    assignModal(rowData, modalName);
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
// async function createSingleElement() {
//     const forms = document.querySelectorAll('.pass-element');
//     const modalName = selectedTable.innerHTML.toLowerCase();
//     let method = methods[modalName].method;
//     let btn = methods[modalName].button;
//     let listButton = document.getElementById(btn)
//     let contentType;
//     const bodyData = {id: dataTable[rowIndex].id};

//     forms.forEach((form) => {
//         const fieldId = form.id;
//         if (form.type === "file") {
//             // Si es un campo de archivo, agrega el archivo al FormData
//             contentType = "multipart/form-data";
//             const fileInput = document.getElementById(fieldId);
//             if (fileInput.files.length > 0) {
//                 bodyData[fieldId] = fileInput.files[0];
//             }
//         } else {
//             // Si no es un campo de archivo, agrega el valor al cuerpo de la solicitud
//             bodyData[fieldId] = form.value;
//         }
//     });
//     if (contentType === "multipart/form-data") {
//         // Crear un objeto FormData y agregar los campos al FormData
//         const formData = new FormData();
//         for (const field in bodyData) {
//             formData.append(field, bodyData[field]);
//         }

//         // Realizar la solicitud con FormData
//         try {
//             const response = await fetch("/mostrarModal/create/" + method, {
//                 method: "POST",
//                 body: formData,
//             });
//             if (response.ok) {
//                 const jsonResponse = await response.json();
                
//                 if (jsonResponse.length> 0) {
//                   closeModal();
//                   jsonResponse.data.map( message => alert(message.message));  
//                   formatTable(listButton)          
//                   retrieveData(modalName, method);      
//                 } else {
//                     closeModal();
//                     jsonResponse.errors.map( message => alert(message.message));
//                     formatTable(listButton)
//                     retrieveData(modalName, method);
//                 }
//             } else {
//               closeModal();
//               alert ("Error de red: \n\n" + response.statusText + "\n\nPor favor, reintente.");
//             }
//           } catch (error) {
//               closeModal();
//               alert ('Error de red:', error);
//           }
//     } else {
//         // Realizar la solicitud con JSON
//         contentType = "application/json";
//         try {
//             const response = await fetch("/mostrarModal/create/" + method, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": contentType,
//                 },
//                 body: JSON.stringify(bodyData),
//             });

//             if (response.ok) {     
//                 const jsonResponse = await response.json();
//                 if (jsonResponse.data.length > 0) {
//                     closeModal();
//                     jsonResponse.data.map( message => alert(message.message));  
//                     formatTable(listButton)          
//                     retrieveData(modalName, method);      
//                 } else {
//                     closeModal();
//                     jsonResponse.errors.map( message => alert(message.message));
//                     formatTable(listButton)
//                     retrieveData(modalName, method);
//                 }
//             } else {
//             //   closeModal();
//             //   alert ("Error de red: \n\n" + response.statusText + "\n\nPor favor, reintente.");
//             }
//           } catch (error) {
//               closeModal();
//               alert ('Error de red:', error);
//           }
//     }
// }
async function updateSingleElement() {
    const forms = document.querySelectorAll('.pass-element');
    const modalName = selectedTable.innerHTML.toLowerCase();
    let method = methods[modalName].method;
    let btn = methods[modalName].button;
    let listButton = document.getElementById(btn)
    let contentType;
    const bodyData = {id: dataTable[rowIndex].id};

    forms.forEach((form) => {
        const fieldId = form.id;
        if (form.type === "file") {
            // Si es un campo de archivo, agrega el archivo al FormData
            contentType = "multipart/form-data";
            const fileInput = document.getElementById(fieldId);
            if (fileInput.files.length > 0) {
                bodyData[fieldId] = fileInput.files[0];
            }
        } else {
            // Si no es un campo de archivo, agrega el valor al cuerpo de la solicitud
            bodyData[fieldId] = form.value;
        }
    });
    if (contentType === "multipart/form-data") {
        // Crear un objeto FormData y agregar los campos al FormData
        const formData = new FormData();
        for (const field in bodyData) {
            formData.append(field, bodyData[field]);
        }

        // Realizar la solicitud con FormData
        try {
            const response = await fetch("/mostrarModal/edition/" + method, {
                method: "PUT",
                body: formData,
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                
                if (jsonResponse.length> 0) {
                  closeModal();
                  jsonResponse.data.map( message => alert(message.message));  
                  formatTable(listButton)          
                  retrieveData(modalName, method);      
                } else {
                    closeModal();
                    jsonResponse.errors.map( message => alert(message.message));
                    formatTable(listButton)
                    retrieveData(modalName, method);
                }
            } else {
              closeModal();
              alert ("Error de red: \n\n" + response.statusText + "\n\nPor favor, reintente.");
            }
          } catch (error) {
              closeModal();
              alert ('Error de red:', error);
          }
    } else {
        // Realizar la solicitud con JSON
        contentType = "application/json";
        try {
            const response = await fetch("/mostrarModal/edition/" + method, {
                method: "PUT",
                headers: {
                    "Content-Type": contentType,
                },
                body: JSON.stringify(bodyData),
            });

            if (response.ok) {     
                const jsonResponse = await response.json();
                if (jsonResponse.data.length > 0) {
                    closeModal();
                    jsonResponse.data.map( message => alert(message.message));  
                    formatTable(listButton)          
                    retrieveData(modalName, method);      
                } else {
                    closeModal();
                    jsonResponse.errors.map( message => alert(message.message));
                    formatTable(listButton)
                    retrieveData(modalName, method);
                }
            } else {
            //   closeModal();
            //   alert ("Error de red: \n\n" + response.statusText + "\n\nPor favor, reintente.");
            }
          } catch (error) {
              closeModal();
              alert ('Error de red:', error);
          }
    }
}
async function destroySingleElement () {
    const rowData = dataTable[rowIndex];
    let modalName = selectedTable.innerHTML.toLowerCase();
    let method = methods[modalName].method;
    let btn = methods[modalName].button;
    let listButton = document.getElementById(btn)
    let objectData = { id: rowData.id, table: modalName };
  
    try {
      const response = await fetch('/mostrarModal/destroy', {
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
            formatTable(listButton)          
            retrieveData(modalName, method);

        } else {
            closeModal();
            jsonResponse.errors.map( message => alert(message.message));
            formatTable(listButton)
            retrieveData(modalName, method);
        }
      } else {
        closeModal();
        alert ("Error de red: \n\n" + response.statusText + "\n\nPor favor, reintente.");
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
        if(modalName == "product"){
                const cost = document.getElementById("productCost");
                const price = document.getElementById("productPrice");
                const type = document.getElementById("productPriceType");
                const newContent = price.textContent !== "" ? price.textContent + " / " + type.textContent : type.textContent;
                cost.value = newContent
                const parentAll = price.parentNode
                parentAll.removeChild(price)
                parentAll.removeChild(type)
        }

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
            const value = internalValue(selectedItem, fieldMapping[field]);
            element.textContent = value;
            switch (field) {
                case "userImage":
                    element.src = "/db-images/users/" + value;
                    element.value = value;
                break;
                case "productImage":
                    element.src = "/db-images/products/" + value;
                    element.value = value;
                break;
                case "memberImage":
                    element.src = "/db-images/home/members/" + value;
                    element.value = value;
                break;
                case "galleryImage":
                    element.src = "/db-images/home/galery/" + value;
                    element.value = value;
                break;
                case "userPassword":
                    element.value = "[ENCRYPTED]";
                    element.style.border = "none";
                break;
                case "productStatus":
                    element.value = value ? "activo" : "inactivo";
                    element.style.border = "none";
                break;
                default:
                    element.value = value;
                    element.style.border = "none";
            }
        }
    }
}
function closeModal () {
    const modal = document.querySelector('.modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}
function handleFetchError (error) {
    console.error("Error al cargar el contenido EJS: " + error);
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
function internalValue(obj, path) {
    const keys = path.split('.');
    let value = obj;
  
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return undefined;
      }
    }
  
    return value;
}
async function assignSelectors (selector, method ,rowData) {
    const parentToAppend = document.getElementById(selector);
    let URL_API = URLBase + "/api/" + method + "/all";
    try{
        const fetchResult = await fetch(URL_API)
        if (!fetchResult.ok) {
            handleFetchError(fetchResult.status);
            return;
        }
        if (fetchResult.ok){
            let response = await fetchResult.json();
            const dataList = response.data
            dataList.forEach((listData) => {
                const optionElement = document.createElement("option");
                optionElement.value = listData.id;
                
                optionElement.textContent = method == "roles" ? listData.roleName :listData.name;
                if (listData.id === rowData) {
                    optionElement.selected = true;
                }
                parentToAppend.appendChild(optionElement);
            });
        }
        else{                    
            closeModal();
            alert("no pudo mostrarse la información solicitada. Reintente más tarde.");
        }
    }
    catch (error) {
        handleFetchError(error);            
    }
}