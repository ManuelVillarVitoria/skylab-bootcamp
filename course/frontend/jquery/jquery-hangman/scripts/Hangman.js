function Hangman(mysteriousWord, attemps){

	this.updateUnderscoreToPrint = function(){
		var lettersAppeared = this.gameStatus.lettersAlreadyAppeared;
		var newUnderscore = "";
		for (var i = 0; i < mysteriousWord.length; i++) {
			if(lettersAppeared.indexOf(mysteriousWord[i]) === -1 ){
				newUnderscore += " _";
			}else{
				newUnderscore +=  " " + mysteriousWord[i].toUpperCase();
			}
		}
		this.gameStatus.underscoreToPrint = newUnderscore;
	};

	this.initGame = function (){
		this.gameStatus = {
			"underscoreToPrint": "",
			"lettersAlreadyAppeared": []
		};

		var underscores = "";
		for (var i = 0; i < mysteriousWord.length; i++) {
			underscores += " _";
		}
		this.gameStatus.underscoreToPrint = underscores;
	};

	this.initGame(); // inicializo el juego (este método es invocado cada vez que se genera una instancia)

	this.try = function(userSayLetter){
		if(attemps === 0){
			return 'GAME OVER.';
		}

		if(userSayLetter.length === 1){
			// el usuario solo introduce una letra
			if(mysteriousWord.indexOf(userSayLetter) === -1){
				attemps--;

				if(attemps === 0){
					return 'GAME OVER.';
				}
			}else{
				this.gameStatus.lettersAlreadyAppeared.push(userSayLetter);

				this.updateUnderscoreToPrint(); // Actualizamos los guiones bajos para mostrarselos al usuario

				/* Comprobamos si el jugador ha acertado la palabra */
				var arrUnderscore = this.gameStatus.underscoreToPrint.split("");
				if( arrUnderscore.indexOf("_") === -1 ){
					attemps = 0;
				}
			}
			return (attemps + this.gameStatus.underscoreToPrint );
		}else{
			// el usuario trata de adivinar la palabra entera

			if(userSayLetter === mysteriousWord){
				attemps = 0;
				return 'You have guessed the word, well done!';
			}
			attemps = 0;
			return 'Sorry, you have not guessed... the correct word is HELLO.';
		}
	};
}