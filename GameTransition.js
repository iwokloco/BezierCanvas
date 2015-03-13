function GameTransition(game){
	this.alpha = 0;
	this.currentEffect = this.fadeOut;
	this.game = game;
}

GameTransition.prototype.update = function(){
	this.game.gameStates[this.game.runState].inTransition();
	this.currentEffect();
}

GameTransition.prototype.init = function(){
	this.alpha = 0;
	this.currentEffect = this.fadeOut;
}

GameTransition.prototype.fadeOut = function(){
	ctx.globalAlpha = this.alpha;
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,can.width,can.height);	
	this.alpha = this.alpha+0.1;
	ctx.globalAlpha = 1;
	if(this.alpha>=1) {
		this.alpha = 1;
		this.game.runState = this.game.nextState;
		this.currentEffect = this.fadeIn;
	}	
				
}

GameTransition.prototype.fadeIn = function(){
	ctx.globalAlpha = this.alpha;
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,can.width,can.height);
	this.alpha = this.alpha-0.1;
	ctx.globalAlpha = 1;
	if(this.alpha<=0){
		this.alpha = 0;
		this.game.currentMode = this.game.MODE_RUN;
	}
}