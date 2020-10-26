let cartInfo={};
function showCart(info){
    cartInfo.subtotal = 0;
    cartInfo.precioEnvio = 0;
    cartInfo.precioTotal = 0;
    let htmlContentToAppend = "";
    for(let i=0; i < info.articles.length; i++){
        let totalAmount = info.articles[i].count * info.articles[i].unitCost;
        if(info.articles[i].currency == 'USD'){
            cartInfo.subtotal += totalAmount * 40;
        }else{
            cartInfo.subtotal += totalAmount;
        }
        
        htmlContentToAppend += `
        <div class="item">
        <div class="buttons">
          <span class="delete-btn"></span>
          <span class="like-btn"></span>
        </div>
     
        <div class="image">
          <img src="` + info.articles[i].src + `" alt=""/>
        </div>
       
        <div class="description">
            <span class="articleName">`+ info.articles[i].name + `</span>
        </div>
         
        <div class="quantity">
            <button class="plus-btn minus-plus-btn" type="button" name="button">
                <img src="img/plus.svg" alt="" />
            </button>
            <input type="text" name="name" value=" `+ info.articles[i].count + `">
            <button class="minus-btn minus-plus-btn" type="button" name="button">
                <img src="img/minus.svg" alt="" />
            </button>
        </div>
         
        <div class="total-price"> `+ info.articles[i].currency +  ` 
            <span class="productPrice">`+ totalAmount +`</span> </div>
        </div> 
        `
    }
    document.getElementById("product-list").innerHTML = htmlContentToAppend;

    cartInfo.precioTotal = cartInfo.subtotal;
    let htmlCartTotal = `
    <h3>Costos</h3>
    <ul class="list-group ">
        <li class="list-group-item">Subtotal <div class="showPrice"> UYU <span id="subtotalPrice">`+ cartInfo.subtotal +`</span></div></li>
        <li class="list-group-item">Costo de envío <div class="showPrice"> UYU <span id="precioEnvio">`+ cartInfo.precioEnvio +`</span></div></li>
        <li class="list-group-item">Total ($) <div class="showPrice"> UYU <span id="precioTotal">`+ cartInfo.precioTotal +`</span></div></li>
    </ul>
`;
    document.getElementById("cart-total").innerHTML = htmlCartTotal;
}

function calculateShipping(){
    if(cartInfo.shippingType  == 'envioPremium'){
        cartInfo.precioEnvio = cartInfo.subtotal * 0.15;
    }else if(cartInfo.shippingType  == 'envioExpress'){
        cartInfo.precioEnvio = cartInfo.subtotal * 0.07;
    }else if(cartInfo.shippingType  == 'envioStandard'){
        cartInfo.precioEnvio = cartInfo.subtotal * 0.05;
    }
    cartInfo.precioTotal = cartInfo.subtotal + cartInfo.precioEnvio;
    $('#precioEnvio').html(cartInfo.precioEnvio);
    $('#precioTotal').html(cartInfo.precioTotal);
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL_DOS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cartInfo = resultObj.data;
            
            showCart(cartInfo);
            $('.delete-btn').on('click',function(){
                let name = $(this).parent().parent().find('.articleName').html();
                let oldProductPrice = 0;
                for(let i=0; i < cartInfo.articles.length; i++){
                    if(name == cartInfo.articles[i].name){
                        oldProductPrice = cartInfo.articles[i].count * parseInt(cartInfo.articles[i].unitCost);
                        if(cartInfo.articles[i].currency == 'USD'){
                            cartInfo.subtotal -= oldProductPrice * 40;
                        }else{
                            cartInfo.subtotal -= oldProductPrice;
                        }
                    }
                }
                calculateShipping();
                $('#subtotalPrice').html(cartInfo.subtotal);
                $(this).parent().parent().remove();
            });
            
            $('.like-btn').on('click', function() {
               $(this).toggleClass('is-active');
            });
            
            $('.minus-btn').on('click', function(e) {
                e.preventDefault();
                let $this = $(this);
                let name = $(this).parent().parent().find('.articleName').html();
                let $input = $this.closest('div').find('input');
                let value = parseInt($input.val());
             
                if (value > 1) {
                    value = value - 1;
                } else {
                    value = 0;
                }
             
              $input.val(value);
              let productPrice = 0;
              let oldProductPrice = 0;
              for(let i=0; i < cartInfo.articles.length; i++){
                if(name == cartInfo.articles[i].name){
                    oldProductPrice = cartInfo.articles[i].count * parseInt(cartInfo.articles[i].unitCost);
                    productPrice = value * parseInt(cartInfo.articles[i].unitCost);
                    cartInfo.articles[i].count = value;
                    if(cartInfo.articles[i].currency == 'USD'){
                        cartInfo.subtotal -= oldProductPrice * 40;
                        cartInfo.subtotal += productPrice * 40;
                    }else{
                        cartInfo.subtotal -= oldProductPrice;
                        cartInfo.subtotal += productPrice;
                    }
                }
              }
              calculateShipping();
              $(this).parent().parent().find('.productPrice').html(productPrice);
              $('#subtotalPrice').html(cartInfo.subtotal);
             
            });
             
            $('.plus-btn').on('click', function(e) {
                e.preventDefault();
                let $this = $(this);
                let name = $(this).parent().parent().find('.articleName').html();
                let $input = $this.closest('div').find('input');
                let value = parseInt($input.val());
             
                if (value < 100) {
                    value = value + 1;
                } else {
                    value =100;
                }
             
                $input.val(value);
                let productPrice = 0;
                let oldProductPrice = 0;
                for(let i=0; i < cartInfo.articles.length; i++){
                    if(name == cartInfo.articles[i].name){
                        oldProductPrice = cartInfo.articles[i].count * parseInt(cartInfo.articles[i].unitCost);
                        productPrice = value * parseInt(cartInfo.articles[i].unitCost);
                        cartInfo.articles[i].count = value;
                        
                        if(cartInfo.articles[i].currency == 'USD'){
                            cartInfo.subtotal -= oldProductPrice * 40;
                            cartInfo.subtotal += productPrice * 40;
                        }else{
                            cartInfo.subtotal -= oldProductPrice;
                            cartInfo.subtotal += productPrice;
                        }
                    }
                }
                calculateShipping();
                $(this).parent().parent().find('.productPrice').html(productPrice);
                $('#subtotalPrice').html(cartInfo.subtotal);
            });
            
        }
    });
    
    $("#modalPago input[type=radio]").on('click', function(e) {
        let paymentType = $("#modalPago input[type=radio]:checked").val();
        if(paymentType  == 'credito'){
            cartInfo.paymentType  = 'credito';
            $("#mostrarFormaPago").hide();
            $("#mostrarPagoTransf").hide();
            $("#mostrarPagoCredito").show();
            $("#formTransferencia").hide();
            $("#formCredito").show();
        }else if(paymentType  == 'transferencia'){
            cartInfo.paymentType  = 'transferencia';
            $("#mostrarFormaPago").hide();
            $("#mostrarPagoTransf").show();
            $("#mostrarPagoCredito").hide();
            $("#formTransferencia").show();
            $("#formCredito").hide();
        }
    });

    $("#seleccionEnvio input[type=radio]").on('click', function(e) {
        let shippingType = $("#seleccionEnvio input[type=radio]:checked").val();
        if(shippingType  == 'envioPremium'){
            cartInfo.shippingType  = 'envioPremium';
        }else if(shippingType  == 'envioExpress'){
            cartInfo.shippingType  = 'envioExpress';
        }else if(shippingType  == 'envioStandard'){
            cartInfo.shippingType  = 'envioStandard';
        }
        calculateShipping();
    });  

    $("#finishPurchase").on('click', function(e) {
        let paymentType = $("#modalPago input[type=radio]:checked").val();
        let shippingType = $("#seleccionEnvio input[type=radio]:checked").val();
        let addressNumber = $("#direccionNumero").val();
        let addressStreet = $("#direccionCalle").val();
        let addressCorner = $("#direccionEsquina").val();

        if(undefined == shippingType){
            swal("Ups...", "Por favor seleccione un método de envío", "error");
            return false;
        }
        if(undefined == addressStreet || '' == addressStreet){
            swal("Ups...", "Por favor especifique la calle", "error");
            return false;
        }
        if(undefined == addressNumber || '' == addressNumber){
            swal("Ups...", "Por favor especifique número de puerta", "error");
            return false;
        }
        if(undefined == addressCorner || '' == addressCorner){
            swal("Ups...", "Por favor especifique la esquina", "error");
            return false;
        }
        if(undefined == paymentType){
            swal("Ups...", "Por favor seleccione un método de pago", "error");
            return false;
        }
        swal("Compra existosa!", "Gracias por confiar en nosotros", "success");

    }); 
});

