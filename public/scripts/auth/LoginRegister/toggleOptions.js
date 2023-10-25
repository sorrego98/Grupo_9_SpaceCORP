console.log("login & register scripts are working")
const bgButton = document.getElementById("selected-btn")
const loginForm = document.getElementById("logInMe")
const registerForm = document.getElementById("registerMe")
const titleForm = document.getElementById("title-form")
const registerBtn = document.getElementById("register-btn")
const loginBtn = document.getElementById("login-btn")
const container = document.querySelector(".contain-form")

registerBtn.addEventListener("click", () => toggleBtn())
loginBtn.addEventListener("click", () => toggleBtn())

function toggleBtn (){  
    let title = titleForm.innerHTML
    if (title == "Inicia Sesión"){
        titleForm.innerHTML = "Regístrate"
        container.style.height = "40rem"
        bgButton.style.left = "49%"
        loginForm.style.left = "-150%"
        registerForm.style.left = "0"
    }else if(title == "Regístrate"){
        console.log("entre inicia")
        titleForm.innerHTML = "Inicia Sesión"
        container.style.height = "22rem"
        bgButton.style.left = "1%"
        registerForm.style.left = "150%"
        loginForm.style.left = "0"
    }
}

/* VALIDACIONES DEL FORMULARIO DE INICIO DE SESIÓN */


/* ---- validar login ---- */
const loginMail = document.getElementById("mailOrUN")
const loginPass = document.getElementById("pass")
const formLogin = document.getElementById("logInMe")

const errorLoginMail = document.getElementById("errorLoginName")
const errorLoginPass = document.getElementById("errorLoginPass")

formLogin.addEventListener("submit", e =>{
    // e.preventDefault();

    // validateInputs();
})

const setError = (element, message) => {
    const controller = element.parentElement;


}
const validateInputs = () => {
    const user = loginMail.value.trim();
    const pass = loginPass.value.trim();
}












const registerName = document.getElementById("firstName")
const registerLastName = document.getElementById("lastName")
const registerEmail = document.getElementById("email")
const registerUserName = document.getElementById("userName")
const registerPass = document.getElementById("passRegister")
const registerPassConfirm = document.getElementById("passConfirm")
const avatar = document.getElementById("avatar")

/* ---- error spans ---- */
const errorRegisterName = document.getElementById("errorRegisterName")
const errorRegisterLastName = document.getElementById("errorRegisterLastName")
const errorRegisterEmail = document.getElementById("errorRegisterEmail")
const errorRegisterUserName = document.getElementById("errorRegisterUserName")
const errorRegisterPass = document.getElementById("errorRegisterPass")
const errorRegisterConfirmPass = document.getElementById("errorRegisterConfirmPass")
const errorRegisterAvatar = document.getElementById("errorRegisterAvatar")

loginMail.addEventListener("blur", e => validateEmpty(loginMail,errorLoginMail, true))

loginPass.addEventListener("blur", e => validateEmpty(loginPass,errorLoginPass, false))

registerName.addEventListener("blur", e => validateEmpty(registerName,errorRegisterName, "user"))

registerLastName.addEventListener("blur", e => validateEmpty(registerLastName,errorRegisterLastName, "user"))






function validateEmpty(form, errorForm, validate){
    let caracteres = form.value.length
    // let patternText = new RegExp('^[A-Z]+$', 'i');
    // form.style.border = "0.3rem solid var(--main-red)"
    // switch (validate){
        
    //     case "user":
    //         if (!form.value)
    // }
    if (1 > caracteres) {
        showError (errorForm, "el campo no puede estar vacío.")
    }else if (8 > caracteres && validate){
        showError (errorForm, "el campo no puede tener menos de 8 caracteres.")

    }else if (caracteres > 50 && validate){
        showError (errorForm, "el campo no puede tener más de 50 caracteres.")        
        
    }else {
        showError (errorForm, "")
        form.style.border = "0"
    }
}

function showError( subE, message){
    subE.innerHTML = message
}

function cleanError( subE, data){
    if (subE.value.length > 0){
        subE.innerHTML = ""

    }
}