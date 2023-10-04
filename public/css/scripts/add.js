console.log('Script funcionando');
const catID = document.getElementById('catID');
const subcatID = document.getElementById('subcatID');
const priceID = document.getElementById('priceID');
let categorySelected;

catID.addEventListener('change', e =>{    
    //verifico que la lista del dropdown contenga elementos para poder eliminarlos
    while (subcatID.hasChildNodes()) { 
            subcatID.removeChild(subcatID.firstChild);
    }

    selectedValue =e.target.value;
    selectedCategory = categories.find( cat => cat.id == e.target.value);
    selectedCategory.subcategories.forEach(subcat=> {
        let opt = document.createElement('option');
        opt.value = subcat.id;
        opt.textContent += subcat.name;
        subcatID.appendChild(opt);

    });
})

// priceID.addEventListener('change', e =>{    
//     //verifico que la lista del dropdown contenga elementos para poder eliminarlos
//     console.log()
//     while (subcatID.hasChildNodes()) { 
//             subcatID.removeChild(subcatID.firstChild);
//     }

//     selectedValue =e.target.value;
//     selectedCategory = categories.find( cat => cat.id == e.target.value);
//     selectedCategory.subcategories.forEach(subcat=> {
//         let opt = document.createElement('option');
//         opt.value = subcat.id;
//         opt.textContent += subcat.name;
//         subcatID.appendChild(opt);

//     });
// })