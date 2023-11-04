const mainContain = document.querySelector(".main-container")
const tableData = document.querySelector(".maindata-content")
const noMainData = document.querySelector(".no-maindata")
const subtContain = document.querySelector(".subtitle-maindata")
const subTable = document.getElementById("subtitle-table")
const tableBody = document.getElementById("table-content")
var dataTable

const URLBase = window.location.origin;

const btnStaff = document.getElementById("btn-staff")
btnStaff.addEventListener("click", e =>{
    let table = "Staff"
    showData()
    formatTable(btnStaff)
    retrieveData(e, table, table)    
})

const btnGallery = document.getElementById("btn-gallery")
btnGallery.addEventListener("click", e =>{
    let table = "Galería"
    showData()
    formatTable(btnGallery)
    retrieveData(e, table, "galeria")    
})

const btnProds = document.getElementById("btn-prods")
btnProds.addEventListener("click", e =>{
    let table = "Producciones"
    showData()
    formatTable(btnProds)
    retrieveData(e, table, table)    
})

const btnCats = document.getElementById("btn-cats")
btnCats.addEventListener("click", e =>{
    let table = "Categorías"
    showData()
    formatTable(btnCats)
    retrieveData(e, table, "categorias")
})

const btnSubCats = document.getElementById("btn-subcats")
btnSubCats.addEventListener("click", e =>{
    let table = "Subcategorías"
    showData()
    formatTable(btnSubCats)
    retrieveData(e, table, "subcats")    
})

const btnProducts = document.getElementById("btn-products")
btnProducts.addEventListener("click", e =>{
    let table = "Productos"
    showData()
    formatTable(btnProducts)
    retrieveData(e, table, table)    
})

const btnPrice = document.getElementById("btn-price")
btnPrice.addEventListener("click", e =>{
    let table = "Tipos de Precio"
    showData()
    formatTable(btnPrice)
    retrieveData(e, table, "precios")    
})

const btnUsers = document.getElementById("btn-users")
btnUsers.addEventListener("click", e =>{
    let table = "Usuarios"
    showData()
    formatTable(btnUsers)
    retrieveData(e, table, table)    
})

const btnTypeUsers = document.getElementById("btn-type-users")
btnTypeUsers.addEventListener("click", e =>{
    let table = "Roles de Usuarios"
    showData()
    formatTable(btnTypeUsers)
    retrieveData(e, table, "roles")    
})

function formatTable (obj){
    const allBtns = document.querySelectorAll(".sidedata-list-item")
    allBtns.forEach ( obj => {obj.style.background = "var(--main-blue)"})
    obj.style.background = "var(--main-orange)"
    let countElements = tableBody.childElementCount
    if (countElements > 1){
        tableBody.removeChild(tableBody.lastElementChild)
    }

}

function retrieveData (e, table, method) {
    let url = URLBase + "/api/" + method + "/all"
    fetch(url)
    .then(response => response.json())
    .then(data => {
        dataTable = data.data
        if (typeof(data) !== 'undefined'){
            subTable.innerHTML = table
            noMainData.style.display = "none"
            subtContain.style.display = "flex"
            tableData.style.display = "flex"
            let tableList = document.createElement("tbody")
            let headColumns = document.getElementById("show-columns")
            let countElements = headColumns.childElementCount
            dataTable.forEach( element => {
                let tr = document.createElement("tr")
                
                let td = document.createElement("td")
                td.innerText = element.id
                tr.appendChild(td)
                
                td = document.createElement("td")
                switch(table.toUpperCase()){
                    case "USUARIOS":
                        td.innerText = element.firstName + " " + element.lastName
                    break;
                    case "ROLES DE USUARIOS":
                        td.innerText = element.roleName
                    break;
                    case "PRODUCCIONES":
                        td.innerText = element.songTitle
                    break;
                    default:
                        td.innerText = element.name
                }
                tr.appendChild(td)
                
                td = document.createElement("td")
                let icon = document.createElement("i")
                icon.classList.add("fa-solid")
                icon.classList.add("fa-eye")
                td.appendChild(icon)
                tr.appendChild(td)
                
                td = document.createElement("td")
                icon = document.createElement("i")
                icon.classList.add("fa-solid")
                icon.classList.add("fa-pencil")
                td.appendChild(icon)
                tr.appendChild(td)
                tableList.appendChild(tr)
                if(countElements == 5){
                    td = document.createElement("td")
                    icon = document.createElement("i")
                    icon.classList.add("fa-solid")
                    icon.classList.add("fa-trash")
                    td.appendChild(icon)
                    tr.appendChild(td)
                    tableList.appendChild(tr)
                }
                
            })
            tableBody.appendChild(tableList)
        }
    });
}

function showData(){
    let band = false
 
    const allDivs = document.querySelectorAll(".search")
    const noData = document.querySelector(".no-maindata")
    allDivs.forEach ( div => {
        if (div.classList.contains('maindata'))
        {            
            div.classList.remove('maindata')
            band = true
        }
    })
    if (band){            
        noData.style.display = "none"
        mainContain.style.background = "transparent"
    }    
}

const btnAddElement = document.querySelector(".add-element");
btnAddElement.addEventListener("click", () => {
    
    const selectedTable = subTable.innerHTML;
    const modalName = selectedTable.toLowerCase();
    
    fetch("/mostrarModal/" + modalName)
        .then((response) => response.text())
        .then((modalContent) => {
            const mainElement = document.querySelector('main');
            
            const modalContainer = document.createElement("div");
            modalContainer.classList.add('modal');
            modalContainer.innerHTML = modalContent;

            document.body.insertBefore(modalContainer, mainElement);

            const titleTable = document.getElementById("title-table");
            titleTable.innerHTML = "Agregar " + selectedTable;
        })
        .catch(error => {
            console.error("Error en la solicitud fetch:", error);
        });
});



document.addEventListener('click', (event) => {
    if (event.target.classList.contains('close')) {
        const modal = document.querySelector('.modal');
        if (modal) {
            document.body.removeChild(modal);
        }
    }
});