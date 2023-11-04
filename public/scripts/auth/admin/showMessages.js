window.addEventListener('DOMContentLoaded', e => {
    if (checkCookieExistence()) {
        alert('La cookie responseData existe en la web');
        
      }
});
function checkCookieExistence() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('responseData=')) {
        // La cookie 'responseData' existe
        console.log(cookie)
        return true;
      }
    }
    // La cookie 'responseData' no existe
    return false;
  }
