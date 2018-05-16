var price = document.querySelector("#price");

checkPrice();

setInterval(function(){
	checkPrice();
}, 60000);

function checkPrice(){
	var url = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD";

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
	var currentPrice = data.USD;
	price.innerHTML = `$${currentPrice} (USD)`;
}

function logErrors(error){
	console.log(error);
	console.dir(error);
}