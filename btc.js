var price = document.querySelector("#price");
var currentPrice = "";

checkPrice();

setInterval(function(){
	checkPrice();
}, 60000);

function checkPrice(){
	var XHR = new XMLHttpRequest();
	
	XHR.onreadystatechange = function() {
		if(XHR.readyState == 4 && XHR.status == 200){
			var data = JSON.parse(XHR.responseText);
			var currentPrice = data.bpi.USD.rate; 
			price.innerHTML = `$${currentPrice} (USD)`;
		}
	}

	XHR.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");
	XHR.send();

	return currentPrice;
}