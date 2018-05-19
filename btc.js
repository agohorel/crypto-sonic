var btcPrice = document.querySelector("#btcPrice");
var ethPrice = document.querySelector("#ethPrice");
var ltcPrice = document.querySelector("#ltcPrice");
var btcArrow = document.querySelector("#btcArrow");
var ethArrow = document.querySelector("#ethArrow");
var ltcArrow = document.querySelector("#ltcArrow");

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
	btcPrice.innerHTML = `$${currentBTCPrice.toFixed(2)}`;
	
	if (currentBTCPrice > lastBTCPrice && updatePricesHasRun === true){
		btcPrice.style.color = "green";
		btcArrow.classList.remove("fas", "fa-angle-down");
		btcArrow.classList.add("fas", "fa-angle-up");
		console.log("############ BTC TURNED GREEN!!! ############");
		console.log(currentBTCPrice - lastBTCPrice);
	} 

	else if (currentBTCPrice < lastBTCPrice && updatePricesHasRun === true) {
		btcPrice.style.color = "red";
		btcArrow.classList.remove("fas", "fa-angle-up");
		btcArrow.classList.add("fas", "fa-angle-down");
		console.log("############ BTC TURNED RED!!! ############");
		console.log(currentBTCPrice - lastBTCPrice);
	}

	lastBTCPrice = currentBTCPrice;
}

function updateETH(data){
	var currentETHPrice = data.ETH.USD;
	ethPrice.innerHTML = `$${currentETHPrice.toFixed(2)}`;

	if (currentETHPrice > lastETHPrice && updatePricesHasRun === true){
		ethPrice.style.color = "green";
		ethArrow.classList.remove("fas", "fa-angle-down");
		ethArrow.classList.add("fas", "fa-angle-up");
		console.log("############ ETH TURNED GREEN!!! ############");
		console.log(currentETHPrice - lastETHPrice);
	} 

	else if (currentETHPrice < lastETHPrice && updatePricesHasRun === true) {
		ethPrice.style.color = "red";
		ethArrow.classList.remove("fas", "fa-angle-up");
		ethArrow.classList.add("fas", "fa-angle-down");
		console.log("############ ETH TURNED RED!!! ############");
		console.log(currentETHPrice - lastETHPrice);
	}

	lastETHPrice = currentETHPrice;
}

function updateLTC(data){
	var currentLTCPrice = data.LTC.USD;
	ltcPrice.innerHTML = `$${currentLTCPrice.toFixed(2)}`;

	if (currentLTCPrice > lastLTCPrice && updatePricesHasRun === true){
		ltcPrice.style.color = "green";
		ltcArrow.classList.remove("fas", "fa-angle-down");
		ltcArrow.classList.add("fas", "fa-angle-up");
		console.log("############ LTC TURNED GREEN!!! ############");
		console.log(currentLTCPrice - lastLTCPrice);
	} 

	else if (currentLTCPrice < lastLTCPrice && updatePricesHasRun === true) {
		ltcPrice.style.color = "red";
		ltcArrow.classList.remove("fas", "fa-angle-up");
		ltcArrow.classList.add("fas", "fa-angle-down");
		console.log("############ LTC TURNED RED!!! ############");
		console.log(currentLTCPrice - lastLTCPrice);
	}

	lastLTCPrice = currentLTCPrice;
}

function logErrors(error){
	console.log(error);
	console.dir(error);
}

// ######### BEGIN P5 STUFF #########

function setup(){
	canvas = createCanvas(windowWidth, windowHeight);
	centerCanvas();
}

// resize canvas if window is resized
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	centerCanvas();
	background(0);
}

// re-center canvas if the window is resized
function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	canvas.position(x, y);
}