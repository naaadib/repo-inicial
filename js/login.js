function logIn(){
    event.preventDefault();
    let _usuario = $("#txtUsuarioLogIn").val(); /*lee datos de campos*/
    let _clave = $("#txtClaveLogIn").val();
   _usuario = _usuario.replace(" ","");
   _clave = _clave.replace(" ","");
    if(_usuario != "" && _clave != ""){
        _userIsLogged = true; /*hay usuario logueado*/
        localStorage.setItem("logged",true);
        window.location = "index.html";
    }else{
        alert("Los campos no pueden estar vacios");
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    $("#formLogIn").submit(logIn);
});

