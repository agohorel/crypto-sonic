var btcPrice = document.querySelector("#btcPrice");
var ethPrice = document.querySelector("#ethPrice");
var ltcPrice = document.querySelector("#ltcPrice");

checkPrice();

setInterval(function(){
	checkPrice();
}, 60000);

function checkPrice(){
	var url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD";

	fetch(url)
		.then(handleErrors)
		.then(parseJSON)
		.then(updatePrices)
		.catch(logErrors);
}

function handleErrors(request){
	console.log(request);
	if(!request.ok){
		throw Error(request.status);
	}
	return request;
}

function parseJSON(response){
	return response.json();
}

function updatePrices(data){
	var currentBTCPrice = data.BTC.USD;
	btcPrice.innerHTML = `$${currentBTCPrice} (USD)`;

	var currentETHPrice = data.ETH.USD;
	ethPrice.innerHTML = `$${currentETHPrice} (USD)`;

	var currentLTCPrice = data.LTC.USD;
	ltcPrice.innerHTML = `$${currentLTCPrice} (USD)`;
}

function logErrors(error){
	console.log(error);
	console.dir(error);
}