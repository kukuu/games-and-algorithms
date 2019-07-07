//Author: Alexander Adu-Sarkodie
//Vanilla JavaScript orchestrated: Rock, Paper , Scissors game

//Caching DOM ELEMENTS -  to enhance Performance: 
//re-usable core features/interactive elements:: 
//DRY/SOLID

//setting defaults - Initialisation
let userScore = 0;
let computerScore = 0;

//Scores
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result > p');

//domain features (ROCK, PAPER, SCISSORS)
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');


//Computer Choice
function getComputerChoice(){
		const choices = ['r', 'p', 's'];
		//Ensuring ATOMICITY with floor()
		const randomNumber = Math.floor(Math.random() * 3);
		return choices[randomNumber];
}


//Helper function: Converting  Array list [r,p,s] to words.
function convertToWord(letter){
	if(letter === "r") return "Rock";
	if(letter === "p") return "Paper";
	else{return "Scissors"};
	
}


//WIN
function win(userChoice, computerChoice){
	userScore++;
	const smallUserWord = "user".fontsize(3).sup();
	const smallCompWord = "comp".fontsize(3).sup();
	const userChoice_div = document.getElementById(userChoice);
	userScore_span.innerHTML = userScore;
	computerScore_span.innerHTML = computerScore;
//Refactored to use template strings from es6
	result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats   ${convertToWord(computerChoice)}${smallCompWord}.  You win (==)`;
//Enhancing user experience with glow effect: refactored
	//document.getElementById(userChoice).classList.add('green-glow');
	userChoice_div.classList.add('green-glow');
	//Adding set timeout to remove the glow border. Avoid persistence
	setTimeout(() => userChoice_div.classList.remove('green-glow'), 300);
}


//LOSE
function lose(userChoice, computerChoice){
	computerScore++;
	const smallUserWord = "user".fontsize(3).sup();
	const smallCompWord = "comp".fontsize(3).sup();
	const userChoice_div = document.getElementById(userChoice);
	userScore_span.innerHTML = userScore;
	computerScore_span.innerHTML = computerScore;
	result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} loses to   ${convertToWord(computerChoice)}${smallCompWord}. You lost...==)`;
	userChoice_div.classList.add('red-glow');
	setTimeout(() => userChoice_div.classList.remove('red-glow'), 300);
}


//DRAW
function draw(userChoice, computerChoice){
	userScore++;
	const smallUserWord = "user".fontsize(3).sup();
	const smallCompWord = "comp".fontsize(3).sup();
	const userChoice_div = document.getElementById(userChoice);
	result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} equals  ${convertToWord(computerChoice)}${smallCompWord}. Its a draw!!`;
	userChoice_div.classList.add('gray-glow');
	setTimeout(() => userChoice_div.classList.remove('gray-glow'), 300);
}



//HIGHER ORDER FUNCTION:: game() => Encapsulates and serves as Interface []
//getComputerChoice(), win(), draw() and lose()
function game(userChoice){

	const computerChoice = getComputerChoice();

	switch(userChoice + computerChoice){
		//  ALGORITHM MATRIX - combinations of user  WINS
		case "rs":
		case "pr":
		case "sp":
		win(userChoice, computerChoice);
		break;

		//USER LOSES(computer wins) - note opposites of USER combinations
		//ALGORITHM MATRIX
		case "rp":
		case "ps":
		case "sr":
		lose(userChoice, computerChoice);
		break;

		//Draws - ALGORITHM MATRIX
		case "rr":
		case "pp":
		case "ss":
		draw(userChoice, computerChoice);
		break;
	}
}

//Firing event listeners
function main(){

	rock_div.addEventListener('click', () => game("r"));

	paper_div.addEventListener('click', () => game("p"));

	scissors_div.addEventListener('click', () => game("s"))
}

//Run parent function
main();