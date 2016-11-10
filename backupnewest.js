/******************************************************************************/
/* Treehouse Full Stack Javascript Tech Degree                                */
/* Project #4: Tic-Tac-Toe + EXTRA CREDIT                                     */
/* Author: lis22                                                              */
/* Date: Nov 8, 2016                                                          */
/******************************************************************************/

(function() {
    "use strict";
    const X = 0;
    const O = 1;

    /**************************************************************************/
    /* gameView Object                                                        */
    /* All methods related to the GUI of the application                      */
    /* Allows display of UI, removal of UI, and updates to UI                 */
    /**************************************************************************/
    var gameView = {
        //Displays first screen of the application
        initStartView: function(){
            document.getElementById("start").classList.add("display");
            document.getElementById("twoPlayer").classList.add("hide");
            document.getElementById("onePlayer").classList.add("hide");
            document.getElementById("board").classList.add("hide");
            document.getElementById("finish").classList.add("hide");
            document.getElementsByClassName("players")[1].classList.add("active");
        },
        //Displays the actual game view of the application
        initGameView: function() {
            document.getElementById("start").classList.remove("display");
            document.getElementById("start").classList.add("hide");
            document.getElementById("board").classList.remove("disabled");
            document.getElementById("board").classList.remove("hide");
            document.getElementById("board").classList.add("display");
            document.getElementById("finish").classList.add("hide");
            document.getElementById("finish").classList.remove("display");
            document.getElementsByClassName("players")[1].classList.add("active");
            document.getElementById("board").classList.remove("fadeOut");

        },
        //Displays the end view, either won, tie and allows to start again
        initEndView: function() {
            document.getElementById("finish").classList.remove("hide");
            document.getElementById("finish").classList.add("display");
            document.getElementById("board").classList.remove("display");
            document.getElementById("board").classList.add("fadeOut");
            document.getElementById("board").classList.add("hide");

        },
        //Displays box to enter name (EXTRA CREDIT), if they want to be X or X, and new game
        showOnePlayer: function() {
            document.getElementById("onePlayer").classList.remove("hide");
            document.getElementById("onePlayer").classList.add("display");
            document.getElementById("playerCount").classList.add("hide");
            document.getElementById("firstP1").focus();
        },
        //Displays two boxes to enter names (EXTRA CREDIT) for both players & new game
        showTwoPlayer: function() {
            document.getElementById("twoPlayer").classList.remove("hide");
            document.getElementById("twoPlayer").classList.add("display");
            document.getElementById("playerCount").classList.add("hide");
            document.getElementById("secondP1").focus();
        },
        //Determines what the human player picked to play as O or X
        singlePlayerChoice: function(choice) {
            if (choice.id === "X") {
                if (choice.nextElementSibling.classList.contains("chosenO"))
                    choice.nextElementSibling.classList.remove("chosenO");

                if(!choice.classList.contains("chosenX"))
                    choice.classList.add("chosenX");
                else
                    choice.classList.remove("chosenX");
            }
            else if (choice.id === "O") {
                if (choice.previousElementSibling.classList.contains("chosenX"))
                    choice.previousElementSibling.classList.remove("chosenX");

                if(!choice.classList.contains("chosenO"))
                    choice.classList.add("chosenO");
                else
                    choice.classList.remove("chosenO");
            }
        },
        //Removes all UI X or O from the board. Needed for new game
        resetBoard: function() {
            var list = document.getElementsByClassName("boxes")[0];
            for(var i=0; i<list.childElementCount; i++) {
                list.children[i].classList.remove("box-filled-1");
                list.children[i].classList.remove("box-filled-2");
            }
        },
        //Adds X or O img to passed in square depending on whose turn
        addHover: function(square, turn) {
            if (turn === X)
                square.style.backgroundImage = "url(img/x.svg)";
            else
                square.style.backgroundImage = "url(img/o.svg)";
        },
        //Removes X or O img
        removeHover: function(square) {
            square.style.backgroundImage = "none";
        },
        //Adds UI X or O that a move has happened to passed in square on a turn
        move: function(square, turn) {
            if (turn === X)
                square.classList.add("box-filled-2");
            else
                square.classList.add("box-filled-1");

            square.classList.add("disabledSpace");
        },
        //Changes whose turn it is in the turn indicator
        turnIndicator: function(turn) {
            var whoseTurn = document.getElementsByClassName("players");
            if(turn === X) {
                whoseTurn[1].classList.add("active");
                whoseTurn[0].classList.remove("active");
            }
            else {
                whoseTurn[0].classList.add("active");
                whoseTurn[1].classList.remove("active");
            }
        },
        //Adds the player names to the turn indicator on the gameboard (EXTRA CREDIT)
        playerName: function(XName, OName) {
            document.getElementById("player1Name").innerHTML = OName + ": ";
            document.getElementById("player2Name").innerHTML = XName + ": ";
        },
        //Shows the tie screen
        tie: function() {
            document.getElementById("finish").classList.add("screen-win-tie");
            document.getElementById("finish").classList.remove("screen-win-one");
            document.getElementById("finish").classList.remove("screen-win-two");

            document.getElementById("board").classList.add("disabled");
            document.getElementsByClassName("message")[0].innerHTML = "It's a Tie!";
            setTimeout(gameView.initEndView, 3000);
        },
        //Shows the won screen along with if X or O won, name, corresponding colors
        won: function(name, turn) {
            if (turn === X) {
                document.getElementById("finish").classList.add("screen-win-two");
                document.getElementById("finish").classList.remove("screen-win-one");
                document.getElementById("finish").classList.remove("screen-win-tie");
            }
            else {
                document.getElementById("finish").classList.add("screen-win-one");
                document.getElementById("finish").classList.remove("screen-win-two");
                document.getElementById("finish").classList.remove("screen-win-tie");
            }
            document.getElementById("board").classList.add("disabled");
            document.getElementsByClassName("message")[0].innerHTML = "Winner! Congrats " + name;
            setTimeout(gameView.initEndView, 3000);
        },
        //Used to show messages to user about not filling in boxes
        showError: function(text) {
            alert(text);
        }
    };
    /**************************************************************************/
    /* playerModel Object                                                     */
    /**************************************************************************/
    var playerModel = {
        initPlayer: function () {
            this.turn = X;
        },
        changeTurn: function () {
            if (this.turn === O)
                this.turn = X;
            else
                this.turn = O;
        },
        getTurn: function () {
            return this.turn;
        },
        setPlayers: function (p1, p2) {
            if (p1 === "Computer") {
                this.computer = X;
                this.human = O;
            }
            else if (p2 === "Computer") {
                this.computer = O;
                this.human = X;
            }
            else
                this.isTwoPlayer = true;

            this.xName = p1;
            this.oName = p2;
        },
        isTwoPlayerGame: function () {
            return this.isTwoPlayer;
        },
        getComputerPlayer: function () {
            return this.computer;
        },
        getHumanPlayer: function () {
            return this.human;
        },
        getName: function (requestedName) {
            if (requestedName === X)
                return this.xName;
            else
                return this.oName;
        }
    };
    /**************************************************************************/
    /* gameModel Object                                                       */
    /**************************************************************************/
    var boardModel = {
        initBoard: function () {
            this.gameBoard = [
                [-1, -1, -1],
                [-1, -1, -1],
                [-1, -1, -1],
            ];
        },
        isValidSquare: function (row, col) {
            return this.gameBoard[row][col] === -1;
        },
        markSquare: function (row, col) {
            this.gameBoard[row][col] = playerModel.getTurn();
        },
        unMarkSquare: function (row, col) {
            this.gameBoard[row][col] = -1;
        },
        isTie: function () {
            for (let i = 0; i < this.gameBoard.length; i++) {
                for (let j = 0; j < this.gameBoard.length; j++) {
                    if (this.gameBoard[i][j] === -1)
                        return false;
                }
            }
            return true;
        },
        isWon: function (row, col, player) {
            var boardLength = this.gameBoard.length;
            var rowCount = 0, colCount = 0, diag = 0, antiDiag = 0;

            if (player === undefined)
                player = playerModel.getTurn();

            //rowCount
            for (let i = 0; i < boardLength; i++) {
                if (this.gameBoard[row][i] === player)
                    rowCount++;
            }

            for (let i = 0; i < boardLength; i++) {
                if (this.gameBoard[i][col] === player)
                    colCount++;
            }

            if (row === col) {
                for (let i = 0; i < boardLength; i++) {
                    if (this.gameBoard[i][i] === player)
                        diag++;
                }
            }

            for (let i = 0; i < boardLength; i++) {
                if (this.gameBoard[i][boardLength - i - 1] === player)
                    antiDiag++;
            }

            return rowCount === boardLength || colCount === boardLength ||
                diag === boardLength || antiDiag === boardLength;
        },

        legalMoves: function () {
            var legalMoves = [];

            for (let i = 0; i < this.gameBoard.length; i++) {
                for (let j = 0; j < this.gameBoard.length; j++) {
                    if (this.gameBoard[i][j] === -1) {
                        legalMoves.push([i, j]);
                    }
                }
            }
            return legalMoves;
        },
        alphaBetaWrapper: function () {
            var availableMoves = this.legalMoves();
            const rowSize = 3;
            var choices = [];
            var bestScore = Number.NEGATIVE_INFINITY;
            var row, col;

            if (availableMoves.length === rowSize * 3) {
                row = Math.floor(Math.random() * rowSize);
                col = Math.floor(Math.random() * rowSize);
                choices.push(row,col);
                return choices;
            }

            else
            {
                for (let i = 0; i < availableMoves.length; i++) {
                    row = availableMoves[i][0];
                    col = availableMoves[i][1];

                    this.markSquare(row, col);
                    var score = this.alphaBeta(false, row, col, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 0);
                    this.unMarkSquare(row, col);

                    if (score > bestScore) {
                        bestScore = score;
                        choices = [];
                        choices.push([row, col, bestScore]);
                    }
                    else if (score === bestScore)
                        choices.push([row, col, bestScore]);
                }

                return choices[Math.floor(Math.random() * choices.length)];
            }
        },
        alphaBeta: function (maxPlayer, row, col, alpha, beta, depth) {
            var availableMoves = this.legalMoves();

            if (row != null && col != null) {
                if (this.isWon(row, col,playerModel.getComputerPlayer())) {
                    return 10 - depth;

                }
                else if (this.isWon(row, col,playerModel.getHumanPlayer())) {
                    return  depth - 10;

                }
                else if(availableMoves.length ===0)
                    return 0;
            }
            depth++;

            //maximizing player
            if (maxPlayer) {
                for (let i = 0; i < availableMoves.length; i++) {
                    row = availableMoves[i][0];
                    col = availableMoves[i][1];

                    playerModel.changeTurn();
                    this.markSquare(row, col);

                    var score = this.alphaBeta(false, row, col, alpha, beta, depth);

                    this.unMarkSquare(row, col);
                    playerModel.changeTurn();

                    if (score > alpha)
                        alpha = score;

                    if (alpha >= beta)
                        break;
                }
                return alpha; //best move
            }
            //minimizing player
            else {
                for (let i = 0; i < availableMoves.length; i++) {
                    row = availableMoves[i][0];
                    col = availableMoves[i][1];

                    playerModel.changeTurn();
                    this.markSquare(row, col);
                    score = this.alphaBeta(true, row, col, alpha, beta, depth);

                    this.unMarkSquare(row, col);
                    playerModel.changeTurn();

                    if (score < beta)
                        beta = score;

                    if (alpha >= beta)
                        break;
                }
                //opponents best move
                return beta;

            }
        }
    };

    /**************************************************************************/
    /* gameController Object                                                  */
    /**************************************************************************/
    var gameController = {
        addHandlers: function() {
            //document.getElementsByClassName("boxes")[0].addEventListener("mouseover", this.highlightRequested);
            //document.getElementsByClassName("boxes")[0].addEventListener("mouseout", this.highlightRemovalRequested);
            document.getElementsByClassName("boxes")[0].addEventListener("click", this.moveRequested);
            document.getElementById("playerCount").addEventListener("click", this.playerRequested);
            document.getElementsByClassName("playerChoice")[0].addEventListener("click",this.playerRequestChoice);
            document.getElementById("onePlayerNewBtn").addEventListener("click", this.onePlayerGameRequest);
            document.getElementById("twoPlayerNewBtn").addEventListener("click", this.twoPlayerGameRequest);
            document.getElementById("btnEnd").addEventListener("click", this.requestAnotherGame);
        },
        highlightRequested: function(event) {
            var hoveredBox = event.target;
            var boxPosition = hoveredBox.id;
            var row = boxPosition.charAt(0);
            var col = boxPosition.charAt(1);

            if (boardModel.isValidSquare(row,col)) {
                gameView.addHover(hoveredBox, playerModel.getTurn());
            }

        },
        highlightRemovalRequested: function(event) {
            var deSelectBox = event.target;
            var boxPosition = deSelectBox.id;
            var row = boxPosition.charAt(0);
            var col = boxPosition.charAt(1);

            if (boardModel.isValidSquare(row,col))
                gameView.removeHover(deSelectBox);
        },
        moveRequested: function(event) {
            var clickedBox = event.target;
            var boxPosition = clickedBox.id;
            var row = boxPosition.charAt(0);
            var col = boxPosition.charAt(1);
            var turn = playerModel.getTurn();


            if (boardModel.isValidSquare(row, col)) {
                boardModel.markSquare(row, col);
                gameView.move(clickedBox, turn);

                if (boardModel.isTie())
                    gameView.tie();

                else if (boardModel.isWon(row, col))
                    gameView.won(playerModel.getName(turn), turn);

                else {

                    playerModel.changeTurn();
                    turn = playerModel.getTurn();
                    gameView.turnIndicator(turn);

                    if (playerModel.getComputerPlayer() === turn)
                        gameController.counterMoveRequested();
                }
            }


        },
        counterMoveRequested: function() {
            var move = boardModel.alphaBetaWrapper();
            var row = move[0];
            var col = move[1];
            var turn = playerModel.getTurn();
            var wantedBox = row + "" +  col;


            boardModel.markSquare(row, col);
            gameView.move(document.getElementById(wantedBox), turn);

            if (boardModel.isWon(row,col)) {
                gameView.won(playerModel.getName(turn),turn);
            }
            else if (boardModel.isTie())
                gameView.tie();
            else {
                playerModel.changeTurn();
                gameView.turnIndicator(playerModel.getTurn());
            }
        },
        playerRequested: function(event) {
            var playerVal = event.target.innerText;

            if (playerVal === "1")
                gameView.showOnePlayer();
            else
                gameView.showTwoPlayer();
        },
        playerRequestChoice: function(event) {
            var playerChoice = event.target;
            gameView.singlePlayerChoice(playerChoice);
        },
        onePlayerGameRequest: function() {
            var playerXName, playerOName, chosen;

            if(document.getElementById("X").classList.contains("chosenX"))
                chosen = X;
            else if(document.getElementById("O").classList.contains("chosenO"))
                chosen = O;
            else
                gameView.showError("You must choose if you want to be X or O!");

            if(document.getElementById("firstP1").value !== "") {
                if (chosen === X) {
                    playerXName = document.getElementById("firstP1").value;
                    playerOName = "Computer";
                }
                else {
                    playerOName = document.getElementById("firstP1").value;
                    playerXName = "Computer";
                }
                playerModel.setPlayers(playerXName, playerOName);
                gameView.playerName(playerXName, playerOName);
                gameView.initGameView();

                if (chosen === O)
                    gameController.counterMoveRequested();
            }
            else
                gameView.showError("You must enter a name!");
        },
        twoPlayerGameRequest: function(){
            var playerXName, playerOName;

            if (document.getElementById("secondP1").value !== "" && document.getElementById("p2").value !== "") {
                playerXName = document.getElementById("secondP1").value;
                playerOName = document.getElementById("p2").value;
                playerModel.setPlayers(playerXName, playerOName);
                gameView.playerName(playerXName, playerOName);
                gameView.initGameView();
            } else
                gameView.showError("You must enter both names!");
        },
        requestAnotherGame: function() {
            var p1 = playerModel.getName(X);
            var p2 = playerModel.getName(O);
            gameView.resetBoard();
            boardModel.initBoard();
            playerModel.setPlayers(p1,p2);
            gameView.initGameView();
        },
    };


    gameController.addHandlers();
    boardModel.initBoard();
    playerModel.initPlayer();
    gameView.initStartView();


}());

