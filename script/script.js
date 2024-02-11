document.getElementById("btnCloseSideBar").addEventListener("click", function(){
    document.getElementById("sidebar").classList.toggle("hide-sidebar");
});

document.querySelector(".toggle-sidebar-icon").addEventListener("click", function(){
    document.getElementById("sidebar").classList.toggle("hide-sidebar");    
});

//-----------------------------------------------------------------------------------------------


// Slider part

let sliderImges = [
    'e-commerce1.jpg',
    'e-commerce2.jpg',
    'e-commerce3.jpg',
    'e-commerce4.png',
    'e-commerce5.jpg',
    'e-commerce6.jpg',
    'e-commerce7.jpg',
];
let imgCounter =0;
let leftArrowBtn = document.querySelector('.slider-arrow-left');
let rightArrowBtn = document.querySelector('.slider-arrow-right');
let sliderImg = document.querySelector('.slider img');
console.log(slideImg);
leftArrowBtn.addEventListener("click",slideImg);
rightArrowBtn.addEventListener("click",slideImg);

function slideImg(){
    sliderImg.classList.add('hidden');

    // sliderImg.style.opacity = 0;
    if(this.getAttribute("class")=="slider-arrow-left"){
        imgCounter = (imgCounter-1) % sliderImges.length;
        imgCounter = (imgCounter<0)?sliderImges.length-1: imgCounter;
    }
    else
    imgCounter = (imgCounter+1) % sliderImges.length;

    sliderImg.src = `images/${sliderImges[imgCounter]}`; 
   


}

// ----------------------
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

// windowLoad
// window.onload = 

getAllProducts();
async function getAllProducts(){

    let promise = await fetch("https://fakestoreapi.com/products");
    let productsData = await promise.json();
    document.querySelector(".products").innerHTML = "";
    
    productsData.forEach(product => {
        displayProduct(product);
    });
}

document.querySelectorAll(".categories button").forEach(function(element){
    element.addEventListener("click",getProdCategory);
});

async function getProdCategory(){

    let url = this.innerText=="all"?"https://fakestoreapi.com/products":
            `https://fakestoreapi.com/products/category/${this.innerText}`
    let promise = 
        await fetch(url);
    let productsData = await promise.json();    
    document.querySelector(".products").innerHTML = "";
    
    productsData.forEach(product => {
        displayProduct(product);
    });

    document.querySelectorAll(".categories button").forEach(function(element){
        if(element!=this)
            element.classList.remove("categories-btn-active");
    });   
    this.classList.add("categories-btn-active");
}


function displayProduct(product){
    // console.log(product);
     
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

// ---------
document.querySelector(".cart-icon").addEventListener("click",function(){

    if(localStorage.length>1){
        var newWindow = window.open('cart.html', '_self');
        newWindow.focus();
    }else{
        alert("your cart is empty");
    }
})


if(localStorage.noProd){
    document.querySelector(".cart-icon-counter").innerHTML = localStorage.length-1;
}
else{
    localStorage.setItem("noProd",0);
    document.querySelector(".cart-icon-counter").innerHTML = 0;
}

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

function isProdExistsInCart(product){
    for(let i of Object.keys(localStorage)){
        let prod = JSON.parse(localStorage[i]);
        if(prod.id == product.id){
            return true;
        }
    }
    return false;
}

// isProducrExitsInCart();

function closeBtnAddTocart(btn){
    btn.style.cssText = "background-color:black; color:red; cursor: not-allowed;";
    btn.innerText="added to cart";
    btn.disabled = true;

}
