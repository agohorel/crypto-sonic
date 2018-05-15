var price = document.querySelector("#price");

checkPrice();

setInterval(function(){
	checkPrice();
}, 60000);

function checkPrice(){
	var url = "https://api.coindesk.com/v1/bpi/currentprice.json";

	fetch(url)
		.then(handleErrors)
		.then(function(response){
			return response.json();
		})
		.then(function(data){
			var currentPrice = data.bpi.USD.rate;
			price.innerHTML = `$${currentPrice} (USD)`;
		})
		.catch(function(error){
			console.log(error);
		});
}

function handleErrors(request){
	if(!request.ok){
		throw Error(request.status);
	}
	return request;
}