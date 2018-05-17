var btcPrice = document.querySelector("#btcPrice");
var ethPrice = document.querySelector("#ethPrice");
var ltcPrice = document.querySelector("#ltcPrice");

checkPrice();

setInterval(function(){
	checkPrice();
}, 5000);

function checkPrice(){
	var url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD";

	fetch(url)
		.then(handleErrors)
		.then(parseJSON)
		.then(updatePrices)
		.catch(logErrors);
}

function handleErrors(request){
	if(!request.ok){
		throw Error(request.status);
	}
	return request;
}

function parseJSON(response){
	return response.json();
}

var updatePricesHasRun = false;
var lastBTCPrice = "";
var lastETHPrice = "";
var lastLTCPrice = "";

function updatePrices(data){
	updateBTC(data);
	updateETH(data);
	updateLTC(data);

	updatePricesHasRun = true;
}

function updateBTC(data){
	var currentBTCPrice = data.BTC.USD;
	btcPrice.innerHTML = `$${currentBTCPrice} (USD)`;
	
	if (currentBTCPrice > lastBTCPrice && updatePricesHasRun === true){
		btcPrice.style.color = "green";
		console.log("############ BTC TURNED GREEN!!! ############");
		console.log(currentBTCPrice - lastBTCPrice);
	} 

	else if (currentBTCPrice < lastBTCPrice && updatePricesHasRun === true) {
		btcPrice.style.color = "red";
		console.log("############ BTC TURNED RED!!! ############");
		console.log(currentBTCPrice - lastBTCPrice);
	}

	lastBTCPrice = currentBTCPrice;
}

function updateETH(data){
	var currentETHPrice = data.ETH.USD;
	ethPrice.innerHTML = `$${currentETHPrice} (USD)`;

	if (currentETHPrice > lastETHPrice && updatePricesHasRun === true){
		ethPrice.style.color = "green";
		console.log("############ ETH TURNED GREEN!!! ############");
		console.log(currentETHPrice - lastETHPrice);
	} 

	else if (currentETHPrice < lastETHPrice && updatePricesHasRun === true) {
		ethPrice.style.color = "red";
		console.log("############ ETH TURNED RED!!! ############");
		console.log(currentETHPrice - lastETHPrice);
	}

	lastETHPrice = currentETHPrice;
}

function updateLTC(data){
	var currentLTCPrice = data.LTC.USD;
	ltcPrice.innerHTML = `$${currentLTCPrice} (USD)`;

	if (currentLTCPrice > lastLTCPrice && updatePricesHasRun === true){
		ltcPrice.style.color = "green";
		console.log("############ LTC TURNED GREEN!!! ############");
		console.log(currentLTCPrice - lastLTCPrice);
	} 

	else if (currentLTCPrice < lastLTCPrice && updatePricesHasRun === true) {
		ltcPrice.style.color = "red";
		console.log("############ LTC TURNED RED!!! ############");
		console.log(currentLTCPrice - lastLTCPrice);
	}

	lastLTCPrice = currentLTCPrice;
}

function logErrors(error){
	console.log(error);
	console.dir(error);
}