/*Variables globales del framework para ser empleadas en cualquier punto del juego*/
var can;
var ctx;
var canX;
var canY;
var mouseIsDown = 0;

function GameEngine(idCanvas, width, height, gameloop){
	can 			= document.getElementById(idCanvas);
	ctx 			= can.getContext("2d");
	can.width 		= width; 
	can.height 		= height;	
	this.gameStates = new Array();
	this.runState = 0;
	this.nextState = 1;
	this.currentMode = this.MODE_INIT_GS;
	setInterval(gameloop, 1000/30);
	this.transition = new GameTransition(this);
}

//Optional constants for use in external gameLoop
GameEngine.prototype.MODE_INIT_GS = 0;
GameEngine.prototype.MODE_RUN = 1;
GameEngine.prototype.MODE_TRANSITION = 2;
GameEngine.prototype.MODE_PAUSE = 3;
GameEngine.prototype.MODE_RESUME = 4;
GameEngine.prototype.MODE_FINISH = 5;	

GameEngine.prototype.addGameState = function(gs){
	this.gameStates.push(gs);
}

GameEngine.prototype.run = function(){
	this.gameStates[this.runState].update();
}

GameEngine.prototype.init = function(){
	this.gameStates[this.runState].init();
	this.currentMode = this.MODE_RUN;
}

GameEngine.prototype.changeGameState = function(n_gs){
	this.nextState = n_gs;
	this.gameStates[this.nextState].init();
	this.currentMode = this.MODE_TRANSITION;
	this.transition.init();
}

GameEngine.prototype.runTransition = function(){
	this.transition.update();
}



/***********************************************************************************/
/***********************************************************************************/
/*
	Prefijos y Sufijos del Framework:
	_fa: frameArray
	gs_: gameState
*/