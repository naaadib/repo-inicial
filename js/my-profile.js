let userInfo = {};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    if(localStorage.getItem("userInfo")!='' && localStorage.getItem("userInfo")!= null){
        userInfo = JSON.parse(localStorage.getItem("userInfo"));
        $("#nombresUsuario").val(userInfo.nombres);
        $("#apellidosUsuario").val(userInfo.apellidos);
        $("#edadUsuario").val(userInfo.edad);
        $("#telefonoUsuario").val(userInfo.telefono);
        $("#emailUsuario").val(userInfo.email);
    }
    
    $('#guardarUsuario').on('click', function() {
        userInfo={};
        userInfo.nombres = $("#nombresUsuario").val();
        userInfo.apellidos = $("#apellidosUsuario").val();
        userInfo.edad = $("#edadUsuario").val();
        userInfo.telefono = $("#telefonoUsuario").val();
        userInfo.email = $("#emailUsuario").val();
        
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
        swal("Datos guardados", "Sus datos han sido guardados con éxito", "success");
    });


});