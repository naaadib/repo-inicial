var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImg").innerHTML = htmlContentToAppend;
    }
}

var comments = {};

function showComments(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comment = array[i];

        let starRate = '';
        for(let j = 1; j <= 5; j++){
            if(j <= comment.score){
                starRate += `
                    <span class="fa fa-star checked"></span>
                `;
            }else{
                starRate += `
                    <span class="fa fa-star"></span>
                `;
            }
            
        }
        
        htmlContentToAppend += `
        <div class="col-lg-6 col-md-6 col-12">
            <dt>` + comment.user + ` - ` + starRate + `</dt>
            <dd>
                <p>` + comment.description + `</p>
                <p class="text-muted">
                    <small>`+ comment.dateTime.replace(/-/g,'/').substr(0,16) + `</small>
                </p>
            </dd>
        </div>
        <hr class="my-3">
        `;
    }
    document.getElementById("divComentariosInfoProd").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("userNewComment").value = localStorage.getItem("userName");

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML= document.getElementById("productCurrency");
            let productCategoryHTML = document.getElementById("productCategory");
            let productSoldCountHTML = document.getElementById("soldCountProducts");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;
            productCategoryHTML.innerHTML = product.category;
            productSoldCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comments = resultObj.data;
            //Muestro las imagenes en forma de galería
            showComments(comments);
        }
    });
});

document.getElementById("btnComment").addEventListener("click", function(e){
    //let userCommentHTML  = document.getElementById("userNewComment").value;
    let textCommentHTML = document.getElementById("message").value;
    let rateCommentHTML = $("input[name=stars]:checked").val();

    let comentario = {
        "score": rateCommentHTML,
        "description": textCommentHTML,
        "user": localStorage.getItem("userName"), //userCommentHTML,
        "dateTime": new Date().toLocaleString().replace(/\//g,'-'),
    }
    document.getElementById('mostrarMsjComentario').style.display = 'block';
    if(rateCommentHTML == "" ||  rateCommentHTML == undefined){
        document.getElementById('mostrarMsjComentario').innerHTML = 'El puntaje no debe estar vacio';
    }else if(textCommentHTML == "" ||  textCommentHTML == undefined){
        document.getElementById('mostrarMsjComentario').innerHTML = 'El texto del comentario no debe estar vacio';
        
    }else{
        document.getElementById('mostrarMsjComentario').innerHTML = 'Comentario agregado';
        comments.push(comentario);
        showComments(comments);
    }
    

});


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});