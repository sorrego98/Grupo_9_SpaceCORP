console.log("Validations in Modal are working")

const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const imageProfile = document.getElementById("imageProfile")
const errFirstName = document.getElementById("firstName-error")
const errLastName = document.getElementById("lastName-error")
const errImageProfile = document.getElementById("imageProfile-error")

firstName.addEventListener("blur", e => {
    let Results = validarDatoVacio(firstName.value);
    if (Results){ 
        errFirstName.innerHTML = Results
    }
        
})

firstName.addEventListener("focus", e => {
    if (errFirstName.innerHTML) {
        firstName.value = ""
        errFirstName.innerHTML = ""
    }

})

lastName.addEventListener("blur", e => {
    let Results = validarDatoVacio(lastName.value);
    if (Results){ 
        errLastName.innerHTML = Results
    }
        
})

lastName.addEventListener("focus", e => {
    if (errLastName.innerHTML) {
        lastName.value = ""
        errLastName.innerHTML = ""
    }

})

imageProfile.addEventListener("change", e => {
    let result = validarImagen (imageProfile.value)

    if (result){
        errImageProfile.innerHTML = result
        imageProfile.value = ""
    }
})

function validarDatoVacio (valor){
    
    let response = undefined;
    if (valor == ""){
        response = "Campo no puede ser blanco."
    }
    if (valor.length > 50){
        response = "El campo no puede exceder los 50 caracteres."
    }

    return response;
    
}

function validarImagen (image){
    
    if (image){
        let ext = image.substr(image.lastIndexOf("."));
        if ( ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".gif") {
            return false;

        }else{
            return "la imagen seleccionada, tenía una extensión de archivo no válida (" + ext +")";

        }
    }
        
}