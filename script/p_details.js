document.getElementById("btnCloseSideBar").addEventListener("click", function(){
    document.getElementById("sidebar").classList.toggle("hide-sidebar");
});

document.querySelector(".toggle-sidebar-icon").addEventListener("click", function(){
    document.getElementById("sidebar").classList.toggle("hide-sidebar");    
});

if(localStorage.noProd){
    document.querySelector(".cart-icon-counter").innerHTML = localStorage.length-1;
}
else{
    localStorage.setItem("noProd",0);
    document.querySelector(".cart-icon-counter").innerHTML = 0;
}

document.querySelector(".cart-icon").addEventListener("click",function(){

    if(localStorage.length>1){
        var newWindow = window.open('cart.html', '_self');
        newWindow.focus();
    }else{
        alert("your cart is empty");
    }
})
//-----------------------------------------------------------------------------
// button up arrow
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
//-----------------------------------------------------------------------------
// get prodcut from query url
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);    

    return urlParams.get(name);
}
let productDetails = JSON.parse(getQueryParam("product"));

// -------------------------------
// generate product details

document.querySelector('.explore-header span') .innerHTML= productDetails.category; 

function generateProduct() {

    // Create image element
    let imageElement = document.createElement('img');
    imageElement.src = productDetails.image;

    // Create text details div
    let textDetailsDiv = document.createElement('div');
    textDetailsDiv.classList.add('text-details');

    // Create h2 element for title
    let titleElement = document.createElement('h2');
    titleElement.textContent = productDetails.title;

    // Create figcaption element for description
    let descriptionElement = document.createElement('figcaption');
    descriptionElement.textContent = productDetails.description;

    // Create p element for price
    let priceElement = document.createElement('p');
    priceElement.textContent = 'Price: ' + productDetails.price;
    let spanElement = document.createElement('span');
    spanElement.textContent = '$';
    priceElement.appendChild(spanElement);

    // Create button element
    let buttonElement = document.createElement('button');
    let cartIconElement = document.createElement('i');
    cartIconElement.classList.add('far', 'fa-cart-plus');
    buttonElement.appendChild(cartIconElement);
    buttonElement.innerHTML += ' Add To cart';
    
    buttonElement.addEventListener("click", function(){
        addToCart.call(buttonElement,productDetails);
        // addToCart(product);
    });

    // Append elements to text details div
    textDetailsDiv.appendChild(titleElement);
    textDetailsDiv.appendChild(descriptionElement);
    textDetailsDiv.appendChild(priceElement);
    textDetailsDiv.appendChild(buttonElement);

    if(isProdExistsInCart(productDetails)){
        closeBtnAddTocart(buttonElement);
    }


    document.querySelector(".product-details").append(imageElement, textDetailsDiv);

}

generateProduct();



//-------------------------------------------------
// get products from the same category
async function getProdCategory(){

    let url = `https://fakestoreapi.com/products/category/${productDetails.category}`;
    let promise = await fetch(url);
    let productsData = await promise.json();    
    document.querySelector(".products").innerHTML = "";
    console.log(productsData);
    productsData.forEach(product => {
        if(product.id!= productDetails.id)
            displayProduct(product);
    });
}

function displayProduct(product){
     
    let item = document.createElement("div");
    item.classList.add("item");

    let image = document.createElement("img");
    image.setAttribute("src",product.image);

    let title = document.createElement("h3");
    title.innerText = product.title;

    let price = document.createElement("p");
    price.innerHTML = `price: ${product.price}<span>$</span>`;

    let desc = document.createElement("p");
    desc.innerText = product.description;

    let div = document.createElement("div");
    let addToCartBtn = document.createElement("button");
    addToCartBtn.innerText = "Add To Cart";
    addToCartBtn.addEventListener("click", function(){
        addToCart.call(addToCartBtn,product);
        // addToCart(product);
    });
    let moreDetailsBtn = document.createElement("button");
    moreDetailsBtn.innerText = "More Details";

    moreDetailsBtn.addEventListener("click",function()
    {
        var valueToSend = JSON.stringify(product);
        var nextPageUrl = "product-details.html?product=" + encodeURIComponent(valueToSend);
        window.location.href = nextPageUrl;

        // window.open('product-details.html', '_self');
    })

    div.append(addToCartBtn, moreDetailsBtn);
    item.append(image, title,desc ,price,div);
    document.querySelector(".products").append(item);
    if(isProdExistsInCart(product)){
        closeBtnAddTocart(addToCartBtn);
    }
}

function isProdExistsInCart(product){
    for(let i of Object.keys(localStorage)){
        let prod = JSON.parse(localStorage[i]);
        if(prod.id == product.id){
            return true;
        }
    }
    return false;
}

getProdCategory();


function addToCart(product){
    if(isProdExistsInCart(product)==false){
        let cartProdNum = Number(localStorage.noProd)+1;
        localStorage.setItem("noProd",cartProdNum);
        console.log(localStorage.noProd);
        let prod  = "prod_"+cartProdNum;
        product.quantity = 1;
        localStorage[prod] = JSON.stringify(product);
        document.querySelector(".cart-icon-counter").innerHTML = localStorage.length-1;
        closeBtnAddTocart(this);
        
    }else{
        alert("product is already added to cart ");
    }
   
}

function closeBtnAddTocart(btn){
    btn.style.cssText = "background-color:black; color:red; cursor: not-allowed;";
    btn.innerText="added to cart";
    btn.disabled = true;
}