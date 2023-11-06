const mainContain = document.querySelector(".main-container");
const tableData = document.querySelector(".maindata-content");
const noMainData = document.querySelector(".no-maindata");
const subtContain = document.querySelector(".subtitle-maindata");
const subTable = document.getElementById("subtitle-table");
const tableBody = document.getElementById("table-content");
const sideDataItems = document.querySelectorAll(".sidedata-list-item");
const URLBase = window.location.origin;
let dataTable = [];

const tableInfo = {
  "btn-staff": { table: "Staff", method: "staff" },
  "btn-gallery": { table: "Galería", method: "galeria" },
  "btn-prods": { table: "Producciones", method: "Producciones" },
  "btn-cats": { table: "Categorías", method: "categorias" },
  "btn-subcats": { table: "Subcategorías", method: "subcats" },
  "btn-products": { table: "Productos", method: "Productos" },
  "btn-price": { table: "Tipos de Precio", method: "precios" },
  "btn-users": { table: "Usuarios", method: "Usuarios" },
  "btn-type-users": { table: "Roles de Usuarios", method: "roles" },
};

sideDataItems.forEach((item) => {
  item.addEventListener("click", () => {
    const tableInfoKey = item.id;
    const { table, method } = tableInfo[tableInfoKey] || {};
    if (table && method) {
      showData();
      formatTable(item);
      retrieveData(table, method);
    }
  });
});

function formatTable(obj) {
  sideDataItems.forEach((item) => {
    item.style.background = "var(--main-blue)";
  });
  obj.style.background = "var(--main-orange)";
  const countElements = tableBody.childElementCount;
  if (countElements > 1) {
    tableBody.removeChild(tableBody.lastElementChild);
  }
}

async function retrieveData(table, method) {
  const url = URLBase + "/api/" + method + "/all";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error de red (código " + response.status);
    }
    const data = await response.json();

    dataTable = data.data || [];
    if (dataTable.length) {
      subTable.textContent = table;
      noMainData.style.display = "none";
      subtContain.style.display = "flex";
      tableData.style.display = "flex";
      const tableList = document.createElement("tbody");
      const headColumns = document.getElementById("show-columns");
      const countElements = headColumns.childElementCount;

      const createTd = (text) => {
        const td = document.createElement("td");
        td.innerText = text;
        return td;
      };

      const createIconTd = (iconClass) => {
        const td = document.createElement("td");
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", iconClass);
        td.appendChild(icon);
        return td;
      };

      dataTable.forEach((element) => {
        const tr = document.createElement("tr");
        tr.appendChild(createTd(element.id));

        let text = element.name;

        if (table.toUpperCase() === "USUARIOS") {
          text =  element.firstName + " " + element.lastName;
        } else if (table.toUpperCase() === "ROLES DE USUARIOS") {
          text = element.roleName;
        } else if (table.toUpperCase() === "PRODUCCIONES") {
          text = element.songTitle;
        }

        tr.appendChild(createTd(text));
        tr.appendChild(createIconTd("fa-eye"));
        tr.appendChild(createIconTd("fa-pencil"));

        if (countElements === 5) {
          tr.appendChild(createIconTd("fa-trash"));
        }

        tableList.appendChild(tr);
      });

      tableBody.appendChild(tableList);
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}



function showData() {
  const allDivs = document.querySelectorAll(".search");
  allDivs.forEach((div) => {
    if (div.classList.contains("maindata")) {
      div.classList.remove("maindata");
      noData.style.display = "none";
      mainContain.style.background = "transparent";
    }
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    closeModal();
  }
});
