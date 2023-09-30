console.log('Script funcionando');
const catID = document.querySelector('#catID');
const subcatID = document.querySelector('#subcatID');

let categorySelected;

catID.addEventListener('change', e =>{
    const subAdd = document.querySelector('.subAdd');
    // console.log(e.target.value);
    categorySelected = categories.find(_ => _.id == e.target.value);
    // console.log(categorySelected.subcategories);
    // console.log(categorySelected);
    categorySelected.subcategories.forEach(subcat=> {
        let opt = document.createElement('option');
        opt.value = subcat.id;
        opt.textContent += subcat.name;
        subAdd.appendChild(opt);
    });
})



    
