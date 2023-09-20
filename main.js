const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const x_Points = document.querySelector(".xPoints");
const circle_Points = document.querySelector(".circlePoints");

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.querySelector(".winning-message");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
	"[data-winning-message-text]"
);
const menu = document.querySelector(".menu");
const roundOver = document.querySelector(".round-over");
let circleTurn;
let selectedRounds;

// points
let xPoints = 0;
let circlePoints = 0;
let currentRound = 0;

restartButton.addEventListener("click", startGame);

function manageRounds(rounds) {
	selectedRounds = checkRounds(rounds);
	console.log(selectedRounds + "rounds selected");
	menu.style.display = "none";
	board.style.display = "grid";
	startGame();
}

function startGame() {
	circleTurn = false;
	cellElements.forEach((cell) => {
		cell.classList.remove(X_CLASS);
		cell.classList.remove(CIRCLE_CLASS);
		cell.removeEventListener("click", handleClick, { once: true });
		cell.addEventListener("click", handleClick, { once: true });
	});
	setBoardHoverClass();
	winningMessageElement.classList.remove("show");
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
		endGame(false);
		addPoint(currentClass);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}
	// placeMark
	// check for win
	// check for draw
}

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = "Draw";
	} else {
		winningMessageTextElement.innerHTML = `${circleTurn ? "O" : "X"} Wins`;
	}
	winningMessageElement.classList.add("show");
}

function isDraw() {
	return [...cellElements].every((cell) => {
		return (
			cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
		);
	});
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurns() {
	circleTurn = !circleTurn;
}

function setBoardHoverClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(CIRCLE_CLASS);
	if (circleTurn) {
		board.classList.add(CIRCLE_CLASS);
	} else {
		board.classList.add(X_CLASS);
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

function addPoint(currentClass) {
	if (currentClass === X_CLASS) {
		xPoints++;
		x_Points.innerHTML = xPoints;
	} else {
		circlePoints++;
		circle_Points.innerHTML = circlePoints;
	}
	if (xPoints === selectedRounds || circlePoints === selectedRounds) {
		winningMessageElement.classList.remove("show");
		roundOver.style.display = "flex";
	} else {
		console.log(xPoints);
		console.log(circlePoints);
	}
}

// menu
const endButton = document.getElementById("endButton");
const threeRounds = document.getElementById("3");
const fiveRounds = document.getElementById("5");
const costumRound = document.querySelector("#c");

endButton.addEventListener("click", (e) => {
	reload();
});

threeRounds.addEventListener("click", (e) => {
	manageRounds(3);
});

fiveRounds.addEventListener("click", (e) => {
	manageRounds(5);
});

function checkRounds(rounds) {
	if (rounds >= 1) {
		if (rounds >= 20) {
			return (selectedRounds = 20);
		} else {
			return (selectedRounds = rounds);
		}
	} else {
		return (selectedRounds = 1);
	}
}

function reload() {
	location.reload();
}

costumRound.addEventListener("click", (e) => {
	alert("Feature havent been added yet");
	reload();
});
