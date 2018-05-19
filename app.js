var btcPrice = document.querySelector("#btcPrice");
var ethPrice = document.querySelector("#ethPrice");
var ltcPrice = document.querySelector("#ltcPrice");

var btcArrow = document.querySelector("#btcArrow");
var ethArrow = document.querySelector("#ethArrow");
var ltcArrow = document.querySelector("#ltcArrow");

var toggle = document.querySelector("#toggle");

// immediately check price so we have something to display
checkPrice();

toggle.addEventListener("click", function(){
	if (toggle.value === "on") {
		toggle.value = "off";
		toggle.innerText = toggle.value;
	} else {
		toggle.value = "on";
		toggle.innerText = toggle.value;
	}
});

setInterval(function(){
	if (toggle.value === "on") {
		checkPrice();
	}
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
	
	if (currentBTCPrice > lastBTCPrice && updatePricesHasRun){
		btcPrice.style.color = "green";
		btcArrow.classList.remove("fas", "fa-angle-down");
		btcArrow.classList.add("fas", "fa-angle-up");
	} 

	else if (currentBTCPrice < lastBTCPrice && updatePricesHasRun) {
		btcPrice.style.color = "red";
		btcArrow.classList.remove("fas", "fa-angle-up");
		btcArrow.classList.add("fas", "fa-angle-down");
	}

	lastBTCPrice = currentBTCPrice;
}

function updateETH(data){
	var currentETHPrice = data.ETH.USD;

	if (currentETHPrice > lastETHPrice && updatePricesHasRun){
		ethPrice.style.color = "green";
		ethArrow.classList.remove("fas", "fa-angle-down");
		ethArrow.classList.add("fas", "fa-angle-up");
	} 

	else if (currentETHPrice < lastETHPrice && updatePricesHasRun) {
		ethPrice.style.color = "red";
		ethArrow.classList.remove("fas", "fa-angle-up");
		ethArrow.classList.add("fas", "fa-angle-down");
	}

	lastETHPrice = currentETHPrice;
}

function updateLTC(data){
	var currentLTCPrice = data.LTC.USD;

	if (currentLTCPrice > lastLTCPrice && updatePricesHasRun){
		ltcPrice.style.color = "green";
		ltcArrow.classList.remove("fas", "fa-angle-down");
		ltcArrow.classList.add("fas", "fa-angle-up");
	} 

	else if (currentLTCPrice < lastLTCPrice && updatePricesHasRun) {
		ltcPrice.style.color = "red";
		ltcArrow.classList.remove("fas", "fa-angle-up");
		ltcArrow.classList.add("fas", "fa-angle-down");
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

function draw(){
	// resume audio context to satisfy recent chrome policy 
	// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
	if (mouseIsPressed) {
		getAudioContext().resume();
	}
}