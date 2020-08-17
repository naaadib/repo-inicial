//Validacion de usuario logueado al intentar cargar paginas\
if(localStorage.getItem("logged")!= "true"){
    window.location.href = "login.html";
  }