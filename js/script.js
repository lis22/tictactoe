/******************************************************************************/
/* Treehouse Full Stack Javascript Tech Degree                                */
/* Project #4: Tic-Tac-Toe + EXTRA CREDIT                                     */
/* Author: lis22                                                              */
/* Date: Nov 10, 2016                                                         */
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
            document.getElementsByClassName("players")[0].classList.remove("active");
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
        //Determines what the human player picked to play as O or X and updates view accordingly
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
        //Removes all UI X or O from the board and enables each space
        // Also reset turn indicator. Needed for new game
        resetGame: function() {
            var list = document.getElementsByClassName("boxes")[0];
            for(var i=0; i<list.childElementCount; i++) {
                list.children[i].classList.remove("box-filled-1");
                list.children[i].classList.remove("box-filled-2");
                list.children[i].classList.remove("disabledSpace");
                list.children[i].classList.remove("fadeIn");
                list.children[i].removeAttribute("style");
            }
            this.enableBoard();
            this.turnIndicator(playerModel.getTurn());
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
            if (square.hasAttribute("style"))
                square.removeAttribute("style");
        },
        //Adds UI X or O that a move has happened to passed in square on a turn
        //Disables space so cannot be clicked as well.
        move: function(square, turn) {
            square.classList.add("fadeIn");

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
        //Disables the board, readies the new page, and calls to show the end screen
        tie: function() {
            document.getElementById("finish").classList.add("screen-win-tie");
            document.getElementById("finish").classList.remove("screen-win-one");
            document.getElementById("finish").classList.remove("screen-win-two");
            document.getElementById("board").classList.add("disabled");
            document.getElementsByClassName("message")[0].innerHTML = "It's a Tie!";
            setTimeout(gameView.initEndView, 3000);
        },
        //Disables the board, readies the new page, and calls to show the end screen
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
        },
        //disables board - used during computer player's turn
        disableBoard: function() {
            document.getElementsByClassName("boxes")[0].classList.add("disabledSpace");

        },
        //enables board
        enableBoard: function() {
            document.getElementsByClassName("boxes")[0].classList.remove("disabledSpace");
        }
    };

    /**************************************************************************/
    /* playerModel Object                                                     */
    /* All methods related to the player data                                 */
    /* Keeps track of players and turn information                            */
    /**************************************************************************/
    var playerModel = {
        //Sets default Player to X
        initPlayer: function () {
            this.turn = X;
        },
        //Changes whose turn is active
        changeTurn: function () {
            if (this.turn === O)
                this.turn = X;
            else
                this.turn = O;
        },
        //returns whose turn is active
        getTurn: function () {
            return this.turn;
        },
        //Sets player names & if single player also specifies human and computer players
        setPlayers: function (p1, p2) {
            if (p1 === "Computer") {
                this.computer = X;
                this.human = O;
            }
            else if (p2 === "Computer") {
                this.computer = O;
                this.human = X;
            }
            this.xName = p1;
            this.oName = p2;
        },
        //returns if computer player is X or O
        getComputerPlayer: function () {
            return this.computer;
        },
        //returns if human player is X or O
        getHumanPlayer: function () {
            return this.human;
        },
        //returns name of X or O
        getName: function (requestedName) {
            if (requestedName === X)
                return this.xName;
            else
                return this.oName;
        }
    };
    /**************************************************************************/
    /* boardModel Object                                                      */
    /* All methods related to the game board data                             */
    /* Keeps track of the game board, allows updates to the board and access, */
    /* and keeps track of legal moves.                                        */
    /**************************************************************************/
    var boardModel = {
        //initializes the board to -1 to show empty
        initBoard: function () {
            this.gameBoard = [
                [-1, -1, -1],
                [-1, -1, -1],
                [-1, -1, -1],
            ];
        },
        //Easy way to access board
        getBoard: function() {
            return this.gameBoard;
        },
        //Claims square with the symbol of the player for the row, col specified
        markSquare: function (row, col) {
            this.gameBoard[row][col] = playerModel.getTurn();
        },
        //Resets square back to empty value
        unMarkSquare: function (row, col) {
            this.gameBoard[row][col] = -1;
        },
        //Keeps track of the free moves that are left on the board
        legalMoves: function () {
            var legalMoves = [];
            for (let i = 0; i < this.gameBoard.length; i++) {
                for (let j = 0; j < this.gameBoard.length; j++) {
                    if (this.gameBoard[i][j] === -1)
                        legalMoves.push([i, j]);
                }
            }
            return legalMoves;
        }
    };

    /**************************************************************************/
    /* gameModel Object                                                       */
    /* All methods related to the game data                                   */
    /* Keeps track of game state (if it is tie or won), and determines the    */
    /* best move for the computer to play.                                    */
    /**************************************************************************/
    var gameModel = {
        //Determines if game is in a tie state
        isTie: function () {
            var board = boardModel.getBoard();

            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board.length; j++) {
                    if (board[i][j] === -1)
                        return false;
                }
            }
            return true;
        },
        //Given a row, col and an optional player checks is board is won
        isWon: function (row, col, player) {
            var board = boardModel.getBoard();
            var boardLength = board.length;
            var rowCount = 0, colCount = 0, diag = 0, antiDiag = 0;

            if (player === undefined)
                player = playerModel.getTurn();

            //row check
            for (let i = 0; i < boardLength; i++) {
                if (board[row][i] === player)
                    rowCount++;
            }
            //column check
            for (let i = 0; i < boardLength; i++) {
                if (board[i][col] === player)
                    colCount++;
            }
            //diagonal check
            if (row === col) {
                for (let i = 0; i < boardLength; i++) {
                    if (board[i][i] === player)
                        diag++;
                }
            }
            //anti-diagonal check
            for (let i = 0; i < boardLength; i++) {
                if (board[i][boardLength - i - 1] === player)
                    antiDiag++;
            }
            return rowCount === boardLength || colCount === boardLength ||
                diag === boardLength || antiDiag === boardLength;
        },
        //Used to determine the computer player's move. If the board is empty, picks a random spot,
        //Otherwise calls alphaBeta to recursively calculate scores and returns a score to the wrapper.
        //The returned score is then kept in context with its row & col and the best score is determined.
        //The chosen move is returned. EXTRA CREDIT.
        alphaBetaWrapper: function () {
            var availableMoves = boardModel.legalMoves();
            const rowSize = 3;
            var choices = [];
            var bestScore = Number.NEGATIVE_INFINITY;
            var row, col;

            //Empty board so pick random move
            if (availableMoves.length === rowSize * 3) {
                row = Math.floor(Math.random() * rowSize);
                col = Math.floor(Math.random() * rowSize);
                choices.push(row,col);
                return choices;
            }
            //Must calculate best move
            else
            {
                for (let i = 0; i < availableMoves.length; i++) {
                    row = availableMoves[i][0];
                    col = availableMoves[i][1];

                    boardModel.markSquare(row, col);
                    var score = this.alphaBetaMiniMax(false, row, col, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 0);
                    boardModel.unMarkSquare(row, col);

                    if (score > bestScore) {
                        bestScore = score;
                        choices = [];
                        choices.push([row, col, bestScore]);
                    }
                    //More than 1 best move
                    else if (score === bestScore)
                        choices.push([row, col, bestScore]);
                }
                //returns a random best move
                return choices[Math.floor(Math.random() * choices.length)];
            }
        },
        //Recursively calculates scores for each move. Uses alpha beta pruning to decrease nodes.
        //Used for computer to play intelligently. Computer will tie and not lose. EXTRA CREDIT.
        //Pseudocode: https://www.ocf.berkeley.edu/~yosenl/extras/alphabeta/alphabeta.html
        alphaBetaMiniMax: function (maxPlayer, row, col, alpha, beta, depth) {
            var availableMoves = boardModel.legalMoves();

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
                    boardModel.markSquare(row, col);

                    var score = this.alphaBetaMiniMax(false, row, col, alpha, beta, depth);

                    boardModel.unMarkSquare(row, col);
                    playerModel.changeTurn();

                    if (score > alpha)
                        alpha = score;

                    if (alpha >= beta)
                        break;
                }
                //value of best choice for max
                return alpha;
            }
            //minimizing player
            else {
                for (let i = 0; i < availableMoves.length; i++) {
                    row = availableMoves[i][0];
                    col = availableMoves[i][1];

                    playerModel.changeTurn();
                    boardModel.markSquare(row, col);
                    score = this.alphaBetaMiniMax(true, row, col, alpha, beta, depth);

                    boardModel.unMarkSquare(row, col);
                    playerModel.changeTurn();

                    if (score < beta)
                        beta = score;

                    if (alpha >= beta)
                        break;
                }
                //value of best choice for min
                return beta;

            }
        }
    };

    /**************************************************************************/
    /* gameController Object                                                  */
    /* All methods to control application logic and coordinate between view   */
    /* and models. Controller tells view and models what to do.               */
    /* Sets up event handlers, sets up hover and hover removal, requests move */
    /* for players and counter moves for computer players, determines single  */
    /* player or   two player game is picked, processes single player, two    */
    /* player and new game requests.                                          */
    /**************************************************************************/
    var gameController = {
        //Add event handlers for all interaction
        addHandlers: function() {
            document.getElementsByClassName("boxes")[0].addEventListener("mouseover", this.highlightRequested);
            document.getElementsByClassName("boxes")[0].addEventListener("mouseout", this.highlightRemovalRequested);
            document.getElementsByClassName("boxes")[0].addEventListener("click", this.moveRequested);
            document.getElementById("playerCount").addEventListener("click", this.playerRequested);
            document.getElementsByClassName("playerChoice")[0].addEventListener("click",this.playerRequestChoice);
            document.getElementById("onePlayerNewBtn").addEventListener("click", this.onePlayerGameRequest);
            document.getElementById("twoPlayerNewBtn").addEventListener("click", this.twoPlayerGameRequest);
            document.getElementById("btnEnd").addEventListener("click", this.requestAnotherGame);
        },
        //Calls the view to show highlight indication of X or O on hover
        highlightRequested: function(event) {
            gameView.addHover(event.target, playerModel.getTurn());
        },
        //Calls view to remove highlight indication
        highlightRemovalRequested: function(event) {
            gameView.removeHover(event.target);
        },
        //Called when user clicks a board position and allows the move to be recorded in the board
        //and updated in the view. Checks if the game is tie or won, changes turn, and if single
        //player calls so the computer will take its turn.
        moveRequested: function(event) {
            var clickedBox, boxPosition, row,col,turn;
            clickedBox = event.target;
            boxPosition = clickedBox.id;

            if(boxPosition != "") {
                row = boxPosition.charAt(0);
                col = boxPosition.charAt(1);
                turn = playerModel.getTurn();

                boardModel.markSquare(row, col);
                gameView.move(clickedBox, turn);

                if (gameModel.isWon(row, col)) {
                    gameView.won(playerModel.getName(turn), turn);
                }
                else if (gameModel.isTie()) {
                    gameView.tie();
                }
                else {
                    playerModel.changeTurn();
                    turn = playerModel.getTurn();
                    gameView.turnIndicator(turn);

                    if (playerModel.getComputerPlayer() === turn)
                        gameController.counterMoveRequested();
                }
            }
        },
        //Used for the computer player to make its move. Calls the wrapper to get the move,
        //extracts the move, records it in the board, updates the view, determines if won
        //tie, and changes turn. EXTRA CREDIT.
        counterMoveRequested: function() {
            var move, row, col, turn, wantedBox;

            //disables board so human player can't make move while computer is being slowed down
            gameView.disableBoard();

            move = gameModel.alphaBetaWrapper();
            row = move[0];
            col = move[1];
            turn = playerModel.getTurn();
            wantedBox = row + "" +  col;

            boardModel.markSquare(row,col);

            //slows down computer player so game seems more natural
            setTimeout(function() {
                gameView.move(document.getElementById(wantedBox), turn);

                if (gameModel.isWon(row,col)) {
                    gameView.won(playerModel.getName(turn),turn);
                }
                else if (gameModel.isTie()) {
                    gameView.tie();
                }
                else {
                    playerModel.changeTurn();
                    gameView.turnIndicator(playerModel.getTurn());
                    gameView.enableBoard();
                }
            },3000);

        },
        //Determines what the view should show based on number of players selected
        playerRequested: function(event) {
            var playerVal = event.target.innerText;

            if (playerVal === "1")
                gameView.showOnePlayer();
            else
                gameView.showTwoPlayer();
        },
        //Determines if in single player mode the player picked to be X or O
        playerRequestChoice: function(event) {
            var playerChoice = event.target;
            gameView.singlePlayerChoice(playerChoice);
        },
        //Processes a single player game, gets name, if they are X or O, validates data,
        //Sets players, initializes game, if O is picked by single player, requests computer move
        //since X is always first.
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
        //Processes a two player game request, gets names, validates input, sets view, initializes game
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
        //Used when user clicks new game button to start setup of the new game
        requestAnotherGame: function() {
            var p1 = playerModel.getName(X);
            var p2 = playerModel.getName(O);
            gameView.resetGame();
            boardModel.initBoard();
            playerModel.initPlayer();
            playerModel.setPlayers(p1,p2);
            gameView.initGameView();

            if(playerModel.getComputerPlayer() === X) {
                gameController.counterMoveRequested();

            }
        },
    };

    //Calls to add handlers, initialize the board and players, and show the start view
    gameController.addHandlers();
    boardModel.initBoard();
    playerModel.initPlayer();
    gameView.initStartView();

}());
