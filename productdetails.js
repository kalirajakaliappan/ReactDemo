import {loadproducts} from '/loadproducts.js';


class ProductDetails {
	
	ProdObj={};
	cart=[];
	
	product={
	start:0,
	end: 2
	};
	
	constructor(){
		
		console.log(loadproducts);
		setTimeout(()=>{
	   document.getElementById("first").addEventListener("click", (e)=>{
         this.navigatetoFirst();
      })

      document.getElementById("last").addEventListener("click", (e)=>{
         this.navigatetoLast();
      });


     document.getElementById("next").addEventListener("click", (e)=>{		 
         this.navigatetoNext();
      });
	  
	  document.getElementById("prev").addEventListener("click", (e)=>{
         this.navigatetoPrev();
      });
	  
	  
		}, 3000);
			  
	}
	
	addToCart=(e)=>{		
		let index = Number(e.target.dataset.index);
		let Product={...this.ProdObj.productList[index].productInfo};
		let prodId=Product.prodId;
		let productName=Product.productName;
		let cartProduct={
			"productId": prodId,
			"productName": productName
		}
		
		
		
if(sessionStorage.getItem("cart") !== null){
let cartObj = sessionStorage.getItem("cart");
this.cart = JSON.parse( cartObj );	
}else{
 this.cart = [];
}		
this.cart.push(cartProduct);

var strCart = JSON.stringify( this.cart );
sessionStorage.setItem( "cart", strCart );
this.displayCart(index);

		

   		
	}
	
	hideAddtoCart = (index) => {
		setTimeout(()=>{
		document.getElementById(`addtocart${index}`).setAttribute("disabled", true);	
		}, 100);
		
	}
	
displayCart = (index) => {
let cartObj = sessionStorage.getItem("cart");
cartObj = JSON.parse( cartObj );	
document.getElementById("model-body").innerHTML=
cartObj.map((product, index)=>{
	return `<div class="row">
<div class="col-md-1">
${index+1}
</div>
<div class="col-md-8">
${product.productName}
</div>
<div class="col-md-3">
<button type="button" id="deleteItem${index}" data-deleteindex="${index}" class="btn btn-success deleteItem">Delete</button>
</div>
</div>`;
}).join(` `);
	
	let deleteProduct=document.getElementsByClassName("deleteItem");

for(let i=0; i<deleteProduct.length; i++){
deleteProduct[i].addEventListener('click', (e)=>{
	this.deleteCart(e);
});
}
this.hideAddtoCart(index);
}

deleteCart = (e) => {
	 let index = Number(e.target.dataset.deleteindex);
	 let cartObj = sessionStorage.getItem("cart");
     cartObj = JSON.parse( cartObj );
	 console.log(cartObj);
	 cartObj=cartObj.slice(0,index).concat(cartObj.slice(index + 1));
	 let strCart = JSON.stringify( cartObj );
	 sessionStorage.setItem( "cart", strCart );
	 this.displayCart();
}
	
  stringToHTML(str){
	var dom = document.createElement('div');
	dom.classList.add("col-md-6");
	dom.innerHTML = str;
	return dom;
}

navigatetoPrev=()=>{	
	this.product.start=this.product.start-2;
	this.product.end=this.product.end-2;
	this.responseProduct();
}

navigatetoFirst=()=>{	
	this.product.start=0;
	this.product.end=2;
	this.responseProduct();
}
navigatetoNext=()=>{	
	this.product.start=this.product.start+2;
	this.product.end=this.product.end+2;	
	this.responseProduct();
}

navigatetoLast=()=>{
if(this.ProdObj.productList.length%2 === 0){
	this.product.start=this.ProdObj.productList.length-2;
	this.product.end=this.ProdObj.productList.length;
	this.responseProduct();
}else{
	this.product.start=this.ProdObj.productList.length-1;
	this.product.end=this.ProdObj.productList.length+1;
	this.responseProduct();
}	
	
}

checkProductId = (prodId) =>  {	
let cartObj = sessionStorage.getItem("cart");
cartObj = JSON.parse( cartObj );
if(cartObj !== null && cartObj.length > 0){
	for(let cart of cartObj){
if(Number(cart.productId)===Number(prodId)){
	console.log(cart.productId+ "test log"+ prodId);
	return true;
}
}
}
return false;	
}


responseProduct=()=>{
	let outofstock, addtocart, addtocartmsg, productInfo;
	//console.log(this.product.start + " test " +this.product.end)



document.getElementById("first").removeAttribute("disabled");
document.getElementById("prev").removeAttribute("disabled");
document.getElementById("next").removeAttribute("disabled");
document.getElementById("last").removeAttribute("disabled");

    if(this.product.start === 0){		
	document.getElementById("first").setAttribute("disabled", true);	
	document.getElementById("prev").setAttribute("disabled", true);	
	}
	
	if(this.product.end >= this.ProdObj.productList.length){
		
	document.getElementById("next").setAttribute("disabled", true);	
	document.getElementById("last").setAttribute("disabled", true);	
	}

    
	
	let productList=this.ProdObj.productList.slice(this.product.start, this.product.end);
	if(productList.length===1){
        productList=this.ProdObj.productList.slice(this.ProdObj.productList.length-2, this.ProdObj.productList.length);	
	}
    	
document.getElementById("product-details").innerHTML="";

for(let i=0; i < productList.length; i++){
	
	productInfo = productList[i].productInfo; 
	let prodId = productList[i].productInfo.prodId;
	
	let productIndex=this.ProdObj.productList.findIndex(item=>item.productInfo.prodId===prodId);
	
	if(productInfo.channelAvailabilityPrdCard.outOfStockOnline === true){
outofstock="block";
}else{
	outofstock="none";
}

	addtocart="disabled";
	addtocartmsg="none";
	
if(Number(productInfo.stock) > 0){
	addtocart="";
	addtocartmsg="none";
} 
	
if(productInfo.backorder === "true"){	
	addtocart="";
	addtocartmsg="block";
}

console.log(this.checkProductId(prodId));
if(this.checkProductId(prodId)){
	addtocart="disabled";
}
	
	let DOM = this.stringToHTML(`<div class="row">
   <div class="col-md-6">
       <img src="images/tonic.jpg" alt="Kodak Brownie Flash B Camera" class="image-responsive">   
   </div>
   <div class="col-md-6">

<div class="row">
<div class="col-md-12">     
    <h4 class="productname" id="product-name-html">${productInfo.productName}</h4>
</div>    
</div>
   <div class="row">
 <div class="col-md-12 mb-3 pr-0" id="review">
  <span class="sr-only">Four out of Five Stars</span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star notchecked"></span>
<a class="monospaced" href="#">4.3 (34)</a>
 </div>
 
</div>

<div class="row">
 <div class="col-md-12 ">
<p class="price m-0" id="product-price-html">${productInfo.priceInfo.regularPriceHtml}</p>
</div>
</div>
<div class="row">
<div class="col-md-12">
<p class="price m-0 mb-2" id="unit-price-h
tml">${productInfo.priceInfo.unitPrice}/${productInfo.priceInfo.unitPriceSize}</p>
</div>
</div>


<div class="row">
   <div class="col-md-12 description" id="description">

<ul class="m-0 pl-3 mb-2">
<li> Buy 1, Get 1 Free <a href="#">Mix &amp; Match</a></li>
<li> Shipping may be delayed</li>
<li> Vitamin Agencies will receive a donation with every purshase <a href="#">Details</a></li>
</ul>

  </div>
</div>  
 
 
<div class="row">
<div class="col-md-12 mb-3">
<button type="button" class="btn btn-light outofstock" id="outofstock-html" disabled="" style="display: ${outofstock};">Out of stock online</button>
  </div>
</div>

<div class="row">
<div class="col-md-12 mb-3">
<button data-index="${productIndex}" id="addtocart${productIndex}" type="button" class="btn btn-primary addtocart" data-toggle="modal" 
data-target="#myModal" ${addtocart}>Add to Cart</button>
  </div>
</div>

 </div>    
   </div>   
  </div>
  <div class="row">
<div class="col-md-12" id="addtocartmsg">
<div class="alert alert-info" style="display: ${addtocartmsg};" >
    <strong>Info!</strong> This item is currently out of stock. It will ship on the earliest possible date.
  </div>
</div>
  `);
	document.getElementById("product-details").append(DOM);	
	
document.getElementById(`addtocart${productIndex}`).addEventListener("click", (e)=>{
this.addToCart(e);		 
});  

	
}		  
}

fetchApi=()=>{
let url = 'https://raw.githubusercontent.com/kalirajakaliappan/ReactDemo/master/productdetails.json';
fetch(url, {
    method: 'GET',
    headers: {}
  })
  .then((response) => {
response.json().then((data) => {
this.ProdObj=data;
this.responseProduct();
      }); 


  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
}
}




const ProductDetailsObj = new ProductDetails();
ProductDetailsObj.fetchApi();
