let score;

let powerAddBought;
let powerMultipliedBought;
let autoclickers;

let clickPowerRaw;
let multiplier;
let clickPower;
let increment;
//
let allTimeScore;
//
let addPrice;
let multPrice;
let autoPrice;

let addPriceScale;
let multPriceScale;
let autoPriceScale;

let autoWait = 100;


const selectPokemon = (choice) => {
    const selectedPokemon = choice;
	console.log(selectedPokemon);
	const popup = document.getElementById("initPopup");
	popup.style.display = "none";

	const finalImg = document.getElementById("poke");
	if(selectedPokemon === "Pikachu") {
		finalImg.style.background = "url(\"assets/images/pikachu_transparent.png\")";
	} else if(selectedPokemon === "Charmander") {
		finalImg.style.background = "url(\"assets/images/charmander_transparent.png\")";
	} else {
		finalImg.style.background = "url(\"assets/images/bulbasaur_transparent.png\")";
	}
	finalImg.style.backgroundSize = "contain";
	finalImg.style.transform = "scale(0.8)";
	finalImg.style.backgroundRepeat = "no-repeat";

	document.getElementById('trick').click();
}

const addScore = () => {
	score += clickPower //Placeholder
	allTimeScore += clickPower;
}

const updateScore = () => {
	document.getElementById("score").textContent = "Score: " + score;
	document.getElementById("alltimeClicks").textContent = allTimeScore;
	// console.log(score);
}

const updatePrice = () => {
	const addPriceIndicator = document.getElementById("addPrice");
	const multPriceIndicator = document.getElementById("multPrice");
	const autoPriceIndicator = document.getElementById("autoPrice");

	addPriceIndicator.textContent = addPrice;
	multPriceIndicator.textContent = multPrice;
	autoPriceIndicator.textContent = autoPrice;

}

const pokeClick = (ev) => {
	addScore();
	updateScore();
	updateAllowed();
}

const updateAllowed = () => {
	const doAdd = document.getElementById("incrementPower");
	const doMult = document.getElementById("multiplyPower");
	const doAuto = document.getElementById("autoclicker");

	if(score >= addPrice) {
		doAdd.classList.add("selectable");
		doAdd.classList.remove("greyedOut");
	} else {
		doAdd.classList.remove("selectable");
		doAdd.classList.add("greyedOut");
	}
	if(score >= multPrice) {
		doMult.classList.add("selectable");
		doMult.classList.remove("greyedOut");
	} else {
		doMult.classList.remove("selectable");
		doMult.classList.add("greyedOut");
	}
	if(score >= autoPrice) {
		doAuto.classList.add("selectable");
		doAuto.classList.remove("greyedOut");
	} else {
		doAuto.classList.remove("selectable");
		doAuto.classList.add("greyedOut");
	}
}

const updatePower = () => {
	clickPower = clickPowerRaw*multiplier;
	document.getElementById("clickPower").textContent = clickPower;
}

const addPower = (ev) => {
	if (score >= addPrice){
		score -= addPrice;
		updateScore();
		addPrice += addPriceScale;
		powerAddBought += 1;
		document.getElementById("addInc").textContent = powerAddBought;
		clickPowerRaw = 1+powerAddBought;

		document.getElementById("clickPowerRaw").textContent = clickPowerRaw;
		updatePower();
		updatePrice();
	}
	else{
		console.log("insufficient funds");
	}
}

const multPower = (ev) => {
	if (score >= multPrice){
		score -= multPrice;
		updateScore();
		multPrice += multPriceScale;
		powerMultipliedBought += 1;
		document.getElementById("multInc").textContent = powerMultipliedBought;
		multiplier = Math.pow(2, powerMultipliedBought);

		document.getElementById("multiplierVal").textContent = multiplier;
		updatePower();
		updatePrice();
	}
	else{
		console.log("insufficient funds");
	}
}

const addClicker = (ev) => {
	if (score >= autoPrice){
		score -= autoPrice;
		updateScore();
		autoPrice += autoPriceScale;
		autoclickers += 1;
		document.getElementById("addClicker").textContent = autoclickers;
		document.getElementById("autoclickers").textContent = autoclickers;

		updatePower();
		updatePrice();
	}
	else{
		console.log("insufficient funds");
	}
}

const doAutoclick = () => {
	for(let i = 0; i < autoclickers; i++) {
		pokeClick();
	}
}

let recieved = function () { };
function waitForChange() {
	return new Promise(resolve => {
		recieved = function () {
			resolve();
		}
	});
}

document.body.onload = async () => {
	await waitForChange();
	console.log("Game ready");

	score = 0;
	allTimeScore = 0;
	clickPowerRaw = 1;
	multiplier = 1;
	clickPower = 1;
	increment = 1;

	powerAddBought = 0;
	powerMultipliedBought = 0;
	autoclickers = 0;

	addPrice = 5;
	multPrice = 1000;
	autoPrice = 10;

	addPriceScale = 10;
	multPriceScale = 1000;
	autoPriceScale = 10000;

	updatePrice();

	autoWait = 100;

	let clickerInverval = window.setInterval(doAutoclick, autoWait);
}