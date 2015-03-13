function GS_Play(){

	this.controlPoints = new Array();
	this.touchPoint = false;
	this.t = 0;
	this.ball = new SpriteAnimated(sprites_img, ball_fa, 0, false, 100, 100);
	
/****************************************
	INIT
****************************************/		
	this.init = function(){
		this.drawBackground();
	}
	
/****************************************
	RESET
****************************************/		
	this.reset = function(){
	
	}
	
/****************************************
	PAUSE
****************************************/		
	this.pause = function(){
	
	}
	
/****************************************
	RESUME
****************************************/		
	this.resume = function(){
	
	}
	
/****************************************
	TRANSITION: Lo que queremos que se muestre durante la transición
****************************************/		
	this.inTransition = function(){
	}	
	
/****************************************
	UPDATE
****************************************/			
	this.update = function(){	
        if(isTouchDown()){
           this.recentTouch = true;
            for(var i=0;i<this.controlPoints.length;i++){
                this.controlPoints[i].doDrag();
            }
        }else{
            if(this.recentTouch){
                if(this.controlPoints.length<4) this.controlPoints.push(new DragSprite( new SpriteAnimated(sprites_img, ball_fa, 0, false, canX, canY) ));
                for(var i=0;i<this.controlPoints.length;i++){
                    this.controlPoints[i].drag = false;
                }
                this.recentTouch = false;
            }
        }
        
		this.drawBackground();
		for(var i=0;i<this.controlPoints.length;i++){
			this.controlPoints[i].sprite.update();
		}
		
		this.drawCurve();
		
		if(this.controlPoints.length == 4){
			path=[
					[this.controlPoints[0].sprite.xprint,this.controlPoints[0].sprite.yprint],
					[this.controlPoints[1].sprite.xprint,this.controlPoints[1].sprite.yprint],
					[this.controlPoints[2].sprite.xprint,this.controlPoints[2].sprite.yprint],
					[this.controlPoints[3].sprite.xprint,this.controlPoints[3].sprite.yprint]
				];
			
			this.t+=0.02;
			if(this.t>1)this.t=0;
			var c = getCoords(this.t);
			this.ball.moveX(c[0]);
			this.ball.moveY(c[1]);
			ctx.save();
			ctx.translate(this.ball.getX(), this.ball.getY());
			var degree = getSlope(this.t);
			ctx.rotate(degree);
			this.ball.updateRotated();
			ctx.restore();
		}
		
		
	}
	
	this.drawBackground = function(){
		ctx.fillStyle = '#0066CC';		
		ctx.beginPath();
		ctx.rect(0, 0, WIDTH, HEIGHT);
		ctx.closePath();
		ctx.fill();			
	}
	
	this.drawLine = function(ax,ay,bx,by){
		ctx.strokeStyle = '#ffffff';
		ctx.beginPath();
		ctx.moveTo(ax,ay);
		ctx.lineTo(bx,by);
		ctx.closePath();
		ctx.stroke();			
	}
	
	this.drawCurve = function(){
		ctx.strokeStyle = '#ffffff';
		ctx.beginPath();
		if(this.controlPoints.length>=4){
			ctx.moveTo(this.controlPoints[0].sprite.xprint, this.controlPoints[0].sprite.yprint);
			ctx.bezierCurveTo(this.controlPoints[1].sprite.xprint, this.controlPoints[1].sprite.yprint,this.controlPoints[2].sprite.xprint,this.controlPoints[2].sprite.yprint,this.controlPoints[3].sprite.xprint,this.controlPoints[3].sprite.yprint);
		}		
		ctx.stroke();		
	}
}	

var path = [[101,285],[229,198],[448.5,310.5],[556,172]];

/*CUBIC BEZIER*/
function getCoords(t){
	if(t<=1){
		var tt = t*t;
		var ttt = tt*t;
		var x = (-path[0][0]*ttt)+3*path[0][0]*tt-3*path[0][0]*t+path[0][0]+3*path[1][0]*ttt-6*path[1][0]*tt+3*path[1][0]*t-3*path[2][0]*ttt+3*path[2][0]*tt+path[3][0]*ttt;
		var y = (-path[0][1]*ttt)+3*path[0][1]*tt-3*path[0][1]*t+path[0][1]+3*path[1][1]*ttt-6*path[1][1]*tt+3*path[1][1]*t-3*path[2][1]*ttt+3*path[2][1]*tt+path[3][1]*ttt;
		return [x,y];
	}
}
/*PENDIENTE DE LA CURVA BEZIER CÚBICA*/
function getSlope(t){
	var tt = t*t;
	var ttt = tt*t;
	var x = (-3)*path[0][0]*tt+6*path[0][0]*t-3*path[0][0]+9*path[1][0]*tt-12*path[1][0]*t+3*path[1][0]-9*path[2][0]*tt+6*path[2][0]*t+3*path[3][0]*tt;
	var y = (-3)*path[0][1]*tt+6*path[0][1]*t-3*path[0][1]+9*path[1][1]*tt-12*path[1][1]*t+3*path[1][1]-9*path[2][1]*tt+6*path[2][1]*t+3*path[3][1]*tt;
	return y/x;
}

function distance(xo, yo, xf, yf){
	var a = xo-xf;
	var b = yo-yf;
	return ((100*Math.sqrt(a*a+b*b))<<0)/100;
}

function angle(xo, yo, xf, yf){
	var a = xo-xf;
	var b = yo-yf;
	theta = Math.atan2(-b, a);
	if (theta < 0) theta += 2 * Math.PI;
	return ((100*theta)<<0)/100;;
}