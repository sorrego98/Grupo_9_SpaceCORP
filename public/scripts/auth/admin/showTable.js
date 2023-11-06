const mainContain = document.querySelector(".main-container");
const tableData = document.querySelector(".maindata-content");
const noMainData = document.querySelector(".no-maindata");
const subtContain = document.querySelector(".subtitle-maindata");
const subTable = document.getElementById("subtitle-table");
const tableBody = document.getElementById("table-content");
const sideDataItems = document.querySelectorAll(".sidedata-list-item");
const URLBase = window.location.origin;
var dataTable;

sideDataItems.forEach(item => {
  item.addEventListener("click", e => {
      let table;
      let method;

      switch (item.id) {
        case "btn-staff":
          table = "Staff";
          method = "staff";
          break;

        case "btn-gallery":
          table = "Galería";
          method = "galeria";
          break;
          
        case "btn-prods":
          table = "Producciones";
          method = "Producciones";
          break;
          
        case "btn-cats":
          table = "Categorías";
          method = "categorias";
          break;
          
        case "btn-subcats":
          table = "Subcategorías";
          method = "subcats";
          break;
          
        case "btn-products":
          table = "Productos";
          method = "Productos";
          break;
          
        case "btn-price":
          table = "Tipos de Precio";
          method = "precios";
          break;
          
        case "btn-users":
          table = "Usuarios";
          method = "Usuarios";
          break;
          
        case "btn-type-users":
          table = "Roles de Usuarios";
          method = "roles";
          break;

        default:
            table = null
            method = null
          break;
      }

      if (table && method) {
        showData();
        formatTable(item);
        retrieveData(e, table, method);
      }
  });
});

function formatTable(obj) {
  sideDataItems.forEach((item) => {
    item.style.background = "var(--main-blue)";
  });
  obj.style.background = "var(--main-orange)";
  let countElements = tableBody.childElementCount;
  if (countElements > 1) {
    tableBody.removeChild(tableBody.lastElementChild);
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
                icon.classList.add("fa-solid" , "fa-eye")
                td.appendChild(icon)
                tr.appendChild(td)
                
                td = document.createElement("td")
                icon = document.createElement("i")
                icon.classList.add("fa-solid" , "fa-pencil")
                td.appendChild(icon)
                tr.appendChild(td)
                tableList.appendChild(tr)
                if(countElements == 5){
                    td = document.createElement("td")
                    icon = document.createElement("i")
                    icon.classList.add("fa-solid" , "fa-trash")
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

document.addEventListener('click', e => {
    if (e.target.classList.contains('close')) {
        closeModal()
    }
});