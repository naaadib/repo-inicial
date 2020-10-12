let cartInfo={};
function showCart(info){
    cartInfo.subtotal = 0;
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
            <button class="plus-btn" type="button" name="button">
                <img src="img/plus.svg" alt="" />
            </button>
            <input type="text" name="name" value=" `+ info.articles[i].count + `">
            <button class="minus-btn" type="button" name="button">
                <img src="img/minus.svg" alt="" />
            </button>
        </div>
         
        <div class="total-price"> `+ info.articles[i].currency +  ` 
            <span class="productPrice">`+ totalAmount +`</span> </div>
        </div> 
        `
    }
    document.getElementById("product-list").innerHTML = htmlContentToAppend;

    let htmlCartTotal = `<div class="item">
        <div class="buttons">Subtotal</div>
        <div class="image"></div>
        <div class="description"></div>
        <div class="quantity"></div>
        <div class="total-price"> UYU 
        <span id="subtotalPrice">`+ cartInfo.subtotal +`</span> </div>
        </div> 
    </div> `;
    document.getElementById("cart-total").innerHTML = htmlCartTotal;
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
                $(this).parent().parent().find('.productPrice').html(productPrice);
                $('#subtotalPrice').html(cartInfo.subtotal);
            });
            
        }
    });
    
});