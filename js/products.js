const ORDER_ASC_BY_PRICE = "PriceASC";
const ORDER_DESC_BY_PRICE = "PriceDESC";
const ORDER_BY_PROD_RELEVANCE = "Relevance";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_RELEVANCE){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function showProducts(data){
    let textSearch = document.getElementById("textSearch").value;
    let htmlContentToAppend = "";
    for(let i = 0; i < data.length; i++){
        let product = data[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) &&
            ((textSearch == '') || (textSearch != '' && (product.description.toLowerCase().includes(textSearch.toLowerCase()) || product.name.toLowerCase().includes(textSearch.toLowerCase()))))){
            /*htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.currency + ` $` + product.cost + ` </small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `*/
            htmlContentToAppend += `
            <div class="col-md-4">
            <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top"  src="` + product.imgSrc + `"alt="` + product.description + `">
                <h3 class="m-3">`+ product.name +`</h3>
                <div class="card-body">
                  <p class="card-text">` + product.description + `</p>
                  <small class="text-muted">` + product.currency + ` $` + product.cost + ` </small>
                </div>
            </a>
            </div>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProducts(currentProductsArray);
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            //showProducts(resultObj.data);
            sortAndShowProducts(ORDER_BY_PROD_RELEVANCE, resultObj.data);
        }
    });


    document.getElementById("precioAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("precioDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("relevancia").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_RELEVANCE);
    });

    document.getElementById("limpiarFiltro").addEventListener("click", function(){
        document.getElementById("filtrarPorPrecioMin").value = "";
        document.getElementById("filtrarPorPrecioMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProducts(currentProductsArray);
    });

    document.getElementById("filtrarPorPrecio").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("filtrarPorPrecioMin").value;
        maxCount = document.getElementById("filtrarPorPrecioMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }   

        showProducts(currentProductsArray);
    });
    document.getElementById("textSearch").addEventListener("keyup", function(){
        showProducts(currentProductsArray);
    });

});

