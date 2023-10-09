console.log("Show About its working")
const aboutDIV = document.querySelector(".about");
const showAboutDIV = document.querySelector(".show-about");
const arrow = document.getElementById("changeArrow");

aboutDIV.addEventListener("click", toggleAbout);
aboutDIV.addEventListener("mouseover", toggleAbout);

function toggleAbout (){
    if(showAboutDIV.classList.contains('active')){
        arrow.classList.add('fa-angle-down')        
        arrow.classList.remove('fa-angle-up')        
        showAboutDIV.classList.remove('active')
        showAboutDIV.classList.add('inactive')

    }else{        
        arrow.classList.remove('fa-angle-down')        
        arrow.classList.add('fa-angle-up')        
        showAboutDIV.classList.add('active')
        showAboutDIV.classList.remove('inactive')
    }
}