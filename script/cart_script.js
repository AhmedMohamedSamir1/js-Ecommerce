
document.getElementById("btnCloseSideBar").addEventListener("click", function(){
    document.getElementById("sidebar").classList.toggle("hide-sidebar");
});

document.querySelector(".toggle-sidebar-icon").addEventListener("click", function(){
    document.getElementById("sidebar").classList.toggle("hide-sidebar");    
});

// up-arrow part

window.addEventListener("scroll",scrollFunction);
let upBtnArrow = document.querySelector('.up-btn');
upBtnArrow.addEventListener("click",arrowUpClick);
function scrollFunction(){


    if(window.scrollY > 20){

        upBtnArrow.classList.add("up-btn_show");
    }
    else if(window.scrollY < 20){
        upBtnArrow.classList.remove("up-btn_show");
    }
}

function arrowUpClick(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

// -----------------

function getNumOfProdInCart(){
    if(localStorage.noProd){
        document.querySelector(".cart-icon-counter").innerHTML = localStorage.length-1;
    }
    else{
        localStorage.setItem("noProd",0);
        document.querySelector(".cart-icon-counter").innerHTML = 0;
    }
}
getNumOfProdInCart();
// -----

let prodsKeys = Object.keys(localStorage);
console.log(prodsKeys);
prodsKeys.splice(prodsKeys.indexOf("noProd") , 1);
console.log(prodsKeys);

function generateCartProducts() {

    for(let prodKey of prodsKeys){
        let product = JSON.parse(localStorage[prodKey]);
        let cartProduct = document.createElement("div");
        cartProduct.className = "cart-product";

        let image = document.createElement("img");
        image.src = product.image;

        let productDetails = document.createElement("div");
        productDetails.className = "product-details";
        let heading = document.createElement("h2");
        heading.innerText = product.title;

        let descriptionParagraph = document.createElement("p");
        descriptionParagraph.innerText = product.description;
    
        // Create paragraph element for product price
        let priceParagraph = document.createElement("p");
        priceParagraph.innerText = "Price: " + product.price + "$";
    
        // Create the product count div
        let productCount = document.createElement("div");
        productCount.className = "product-count";
    
        // Create divs for quantity, plus icon, actual quantity, and minus icon
        let quantityDiv = document.createElement("div");
        quantityDiv.innerText = "quantity: ";
    
        
        let quantityValueDiv = document.createElement("div");
        quantityValueDiv.textContent = product.quantity;
       
        // Create div for total price
        let totalPriceDiv = document.createElement("div");
        totalPriceDiv.textContent = "total price: " + (product.price * product.quantity) + "$";
        
        let plusIconDiv = document.createElement("div");
        plusIconDiv.innerHTML = '<i class="fas fa-plus-square"></i>';
        plusIconDiv.addEventListener("click", ()=>increaseProdQuantByone(prodKey, product, quantityValueDiv, totalPriceDiv));
        
        let minusIconDiv = document.createElement("div");
        minusIconDiv.innerHTML = '<i class="fas fa-minus-square"></i>';
        minusIconDiv.addEventListener("click", ()=>decreaseProdQuantByone(prodKey, product, quantityValueDiv, totalPriceDiv));
    
    
        // Create button element for removing from cart
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove from Cart";
    
        // Append created elements to the main container
        productCount.append(quantityDiv, plusIconDiv, quantityValueDiv, minusIconDiv);
        productDetails.append(heading, descriptionParagraph, priceParagraph, productCount, totalPriceDiv, removeButton);
        cartProduct.append(image, productDetails);

        removeButton.addEventListener("click", ()=>deleteFromCart(cartProduct,prodKey));
        document.querySelector(".user-products").append(cartProduct);
    }

}

function generateTotalPrice(){

    let total_price = 0;
    for(let prodKey of prodsKeys){
        let product = JSON.parse(localStorage[prodKey]);
        total_price += (product.price* product.quantity);
    }
    document.querySelector(".cart-summary p").innerHTML = `total price: ${total_price.toFixed(2)}$`;
}
generateCartProducts();
generateTotalPrice();


console.log(Object.keys(localStorage).length);

function increaseProdQuantByone(prodKey, product,quantityValueDiv, totalPriceDiv){
        product.quantity = product.quantity+1;
        quantityValueDiv.innerHTML = product.quantity;
        totalPriceDiv.innerHTML = "Total price: "+(product.quantity * product.price).toFixed(2);
        localStorage[prodKey] = JSON.stringify(product);
        generateTotalPrice();
}


function decreaseProdQuantByone(prodKey, product, quantityValueDiv, totalPriceDiv){
        let flag = 0;
        if(product.quantity-1==0){
            flag = confirm("are you sure the product will be removed from card");
            if(flag)
                deleteFromCart(totalPriceDiv.parentElement.parentElement, prodKey)
        }
        else{

            product.quantity = product.quantity-1;
            quantityValueDiv.innerHTML = product.quantity;
            totalPriceDiv.innerHTML = "Total price: "+(product.quantity * product.price).toFixed(2);
            localStorage[prodKey] = JSON.stringify(product);
            generateTotalPrice();
        }
    
}

function deleteFromCart(cartProduct, prod_key){
        cartProduct.remove();
        localStorage.removeItem(prod_key);
        prodsKeys.splice(prodsKeys.indexOf(prod_key) , 1);
        generateTotalPrice();
        getNumOfProdInCart();
}