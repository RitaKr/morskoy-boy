let model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	
	ships: [
		{ locations: [], hits: [] },
		{ locations: [], hits: [] },
		{ locations: [], hits: [] }
	],

/*
	ships: [
		{ locations: ["06", "16", "26"], hits: ["", "", ""] },
		{ locations: ["24", "34", "44"], hits: ["", "", ""] },
		{ locations: ["10", "11", "12"], hits: ["", "", ""] }
	],
*/

	fire: function(guess) {
		for (let i = 0; i < this.numShips; i++) {
			let ship = this.ships[i];
			let index = ship.locations.indexOf(guess);
			if (ship.hits[index] === "hit") {
					alert("Будьте уважніші, ви вже тут були!");
					return true;
			}
			else if (index >= 0) {
				
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");

				if (this.isSunk(ship)) {
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		console.log(view)
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},

//11.01.2021
	isSunk: function(ship) {
		//console.log(ship.hits, ship.hits.length);
		for (let i = 0; i < ship.hits.length; i++)  {
			//console.log(ship.hits[i]);
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	},
	//13.01.2021
	generateShipLocations: function() {
		let locations;
		for (let i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
			for (l=0; l<locations.length; l++) {
				//console.log(this.ships, this.ships[i], i);
				this.ships[i].hits[l]='';
			}
			//
		}
		console.log("Ships array: ");

		console.log(this.ships);
		//fill();
	},

	generateShip: function() {
		let direction = Math.floor(Math.random() * 2);
		let length = Math.floor(Math.random() * 4)+1;
		
		let row, col;
		this.shipLength = length;
		/*
		if (index>0 && index<(this.numShips-1)) {
			space=1;
		}*/
		
		//function generateLocation() {
			if (direction === 1) { 
				// горизонтальная генерация
				row = Math.floor(Math.random() * this.boardSize);
				col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			} else { 
				// вертикальная генерация
				row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
				col = Math.floor(Math.random() * this.boardSize);
			}	
		//}
		//generateLocation();

		let newShipLocations = [];
		newCol=col;
		newRow=row;
		for (let i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newCol=col+i;

				//newShipLocations.push((row + space)+ "" + ((col+i) + space));
			} else {
				newRow=row+i;
				//newShipLocations.push(((row+i) + space) + "" + (col + space));
			}
			
			newShipLocations.push(newRow+ "" + newCol);
		}
		console.log(this.ships);
		let fits=true;
		this.ships.forEach((ship, ind) => {
			//if(ship.locations.length!=0){ 
				//console.log(index, 'ship is generated');
				//console.log(ship.locations);
				ship.locations.forEach((loc, j) => {
					//if(loc!=null && loc!='') {
						//console.log('current locs',newShipLocations, 'previous locs',ship.locations, `location ${j} in prev locs `, loc);
						newShipLocations.forEach((curLoc, curI) => {

							//console.log(`location in cur locs `, curLoc,`location in prev locs `, loc);
							//console.log('curLoc[0]',+curLoc[0],`loc[0]`, +loc[0], `loc[1]`, +loc[1], `curLoc[1]`, +curLoc[1])
							if( //[0] - row (A, B, C...), [1] - col (0, 1, 2...)
								((+curLoc[0]== +loc[0]) && (+loc[1]== +curLoc[1]+1)) 
								|| ((+curLoc[0]== +loc[0]) && (+loc[1]== +curLoc[1]-1)) 
								|| ((+curLoc[1]== +loc[1]) && (+loc[0]== +curLoc[0]+1))
								|| ((+curLoc[1]== +loc[1]) && (+loc[0]== +curLoc[0]-1))  
								|| ((+loc[0]== +curLoc[0]+1) && (+loc[1]== +curLoc[1]+1))  
								|| ((+loc[0]== +curLoc[0]+1) && (+loc[1]== +curLoc[1]-1))
								|| ((+loc[0]== +curLoc[0]-1) && (+loc[1]== +curLoc[1]+1))  
								|| ((+loc[0]== +curLoc[0]-1) && (+loc[1]== +curLoc[1]-1))  
								) {
									console.log(`!!!!!!!!!!misfit ${curLoc} - ${loc}!!!!!!!!!!!!!!!`);
									fits=false;
									//this.ships[i].locations = this.generateShip()
									//newShipLocations = this.generateShip()
									do {
										newShipLocations = this.generateShip()
									} while (fits);
							} else fits=true;
							
						})
					//}
				})
				
		//}
	})
		console.log('newShipLocations',newShipLocations);

		return newShipLocations;
		
	},
/**/
	collision: function(locations) {
		for (let i = 0; i < this.numShips; i++) {
			let ship = this.ships[i];
			for (let j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
	
};

let view = {
	displayMessage: function(msg) {
		let messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
		if (msg=='You missed.') {
			if (messageArea.classList.remove('hited')) messageArea.classList.remove('hited');
			messageArea.classList.add('missed');
		} else {
			if (messageArea.classList.contains('missed')) messageArea.classList.remove('missed');
			messageArea.classList.add('hited');
		}
	},

	displayHit: function(location) {
		let cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
        let cell = document.getElementById(location);
        //console.log(cell)
		cell.setAttribute("class", "miss");
	}

}; 


//view.displayMiss('01');


//11.01.2021
let controller = {
	guesses: 0,

	processGuess: function(guess) {
		let location = parseGuess(guess);
		let allShips = 0;
		model.ships.forEach(ship => {
			allShips+=ship.locations.length;
		})
		//console.log(allShips);
		if (location) {
			this.guesses++;
			let hit = model.fire(location);
			//console.log(hit)
			//console.log('ship sunk  ',model.shipsSunk, 'num ships ',model.numShips, 'real num ship ', allShips)
			if (hit && model.shipsSunk === model.numShips) {
					view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
			}
		}
	}
}
function parseGuess(guess) {
	let alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		let firstChar = guess.charAt(0);
		let row = alphabet.indexOf(firstChar);
		let column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}

 
//18.01.2021

function handleFireButton() {
	let guessInput = document.getElementById("input");
	let guess = guessInput.value.toUpperCase();

	controller.processGuess(guess);

	guessInput.value = "";
}


function handleKeyPress(e) {
	let fireButton = document.getElementById("btn");
	e = e || window.event;
	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}
/*//20.01.2021
*/

window.onload = init;

function init() {
	let fireButton = document.getElementById("btn");
	fireButton.onclick = handleFireButton;
	let guessInput = document.getElementById("input");
	guessInput.onkeypress = handleKeyPress;
	model.generateShipLocations();
	
}

function fill() {
	for (var fi = 0; fi < 7; fi++)
	  for (var fj = 0; fj < 7; fj++)
		controller.processGuess(String.fromCharCode(fi + 65) + "" + fj);
  }