console.log("Show About its working")
const showAboutDIV = document.querySelector(".show-about");
const arrow = document.getElementById("changeArrow");
const anchorfoot = document.getElementById("end-html")

arrow.addEventListener("click", e => {showAbout(e)},false);

function showAbout (e){
    if(showAboutDIV.classList.contains('inactive')){
        arrow.classList.remove('fa-angle-down')
        arrow.classList.add('fa-angle-up')
        showAboutDIV.classList.add('active')
        showAboutDIV.classList.remove('inactive')
        anchorfoot.scrollIntoView({behavior:'smooth', block:'center'})

    }else{     
        arrow.classList.add('fa-angle-down')        
        arrow.classList.remove('fa-angle-up')        
        showAboutDIV.classList.remove('active')
        showAboutDIV.classList.add('inactive')

    }
}