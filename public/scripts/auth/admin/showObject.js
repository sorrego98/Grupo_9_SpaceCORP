const selectedTable = document.getElementById("subtitle-table");
let rowIndex
document.body.addEventListener("click", e => {
    
    const modal = document.querySelector('.modal');
    tableBody.addEventListener("click", e => {
        rowIndex = e.target.closest("tr").rowIndex - 1;
    })

    if (e.target.classList.contains("fa-eye")) {
        let modalName = selectedTable.innerHTML.toLowerCase();
        const rowData = dataTable[rowIndex];
        switch (modalName.toLowerCase()){
            case "galería":
                modalName = "gallery";
                break;

            case "producciones":
                modalName = "productions";
                break;

            case "categorías":
                modalName = "category";
                break;

            case "subcategorías":
                modalName = "subcategory";
                break;
            
            case "productos":
                modalName = "product";
            break;

            case "tipos de precio":
                modalName = "pricetype";
            break;

            case "usuarios":
                modalName = "user";
            break;

            case "roles de usuarios":
                modalName = "role";
            break;
        }
        fetch("/mostrarModal/show/" + modalName)
            .then( response => response.text())
            .then( viewModal => {
                const createContainer = document.createElement("div");
                createContainer.classList.add('modal');
                createContainer.innerHTML = viewModal;
                document.body.insertBefore(createContainer, mainElement);
                const titleElement = document.getElementById("title-table");
                titleElement.textContent = "Mostrando el ID " + rowData.id
                assignModal (rowData, modalName)
            })      
            .catch((error) => {
                console.log(error)
                console.error("Error al cargar el contenido EJS:", error);
            });
    }else if (e.target.classList.contains("fa-trash")){
            
        const rowData = dataTable[rowIndex];
        fetch("/mostrarModal/destroy/")
        .then( response => response.text())
        .then( viewModal => {
            const createContainer = document.createElement("div");
            createContainer.classList.add('modal');
            createContainer.innerHTML = viewModal;
            document.body.insertBefore(createContainer, mainElement);
            const keyvalues = document.getElementById("list-keyvalues");
            keyvalues.innerHTML = '';

            for (const key in rowData) {
                if (rowData.hasOwnProperty(key)) {
                    const itemKey = document.createElement("strong");
                    const itemData = document.createElement("span");
                    itemKey.textContent = key + ": "
                    itemData.textContent = rowData[key];                    
                    if (key !== "password") {
                        if (typeof(rowData[key]) !== "object") {
                            const itemKeyValue = document.createElement("div");
                            itemKeyValue.appendChild(itemKey);
                            itemKeyValue.appendChild(itemData);
                            keyvalues.appendChild(itemKeyValue);
                        }
                    }
                }
            }
        })      
        .catch((error) => {
                console.log(error)
                console.error("Error al cargar el contenido EJS:", error);
            });
    }else if (e.target.classList.contains("accept")) {        
        fetchResult();
    }else if (e.target.classList.contains("reject")) {
        if (modal) {
            document.body.removeChild(modal);
        }
    }
});
    
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

async function fetchResult() {
    console.log("acá estoy")
    const rowData = dataTable[rowIndex];
    let modalName = selectedTable.innerHTML.toLowerCase();
    let objectData = { id: rowData.id, table: modalName };
    try {
        console.log("ahora acá estoy")
        const response = await fetch('/admin/destroy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objectData)
        });
    } catch (error) {
        window.location.href = '/admin';
        console.error('Error de red:', error);
    }
}
