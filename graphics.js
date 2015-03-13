var clear = function(){  
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
  /*ctx.fillStyle = '#000000';		
  ctx.beginPath();
  ctx.rect(0, 0, WIDTH, HEIGHT);
  ctx.closePath();
  ctx.fill();*/
}

////////////////////CLASSES////////////////////
		//CLASS SpriteAnimated
		function SpriteAnimated(img, frameArray, currentAnimation, loop, xprint, yprint){
			this.img = img;
			this.frameArray = frameArray;
			this.xprint = xprint;
			this.yprint = yprint;
			this.currentAnimation = currentAnimation; 	//índice dentro del frame array que indica qué animación estamos mostrando
			this.currentFrame = 0;						//frame actual dentro de la animación que se está mostrando
			this.loop = loop;							//si queremos que la currentAnimation se repita
			this.frameDelay = 2;
			this.drawNewFrame = 0;
			this.width = this.frameArray[this.currentAnimation][this.currentFrame][2];
			this.height = this.frameArray[this.currentAnimation][this.currentFrame][3];	
			this.xcenter = this.width/2;
			this.ycenter = this.height/2;
			this.inAnimation = true;					//If sprite is currently executing animation
			this.pause = false;
		}
		SpriteAnimated.prototype.update = function(){			
			ctx.drawImage(	this.img, 
							this.frameArray[this.currentAnimation][this.currentFrame][0], this.frameArray[this.currentAnimation][this.currentFrame][1],
							this.frameArray[this.currentAnimation][this.currentFrame][2], this.frameArray[this.currentAnimation][this.currentFrame][3],
							this.xprint, this.yprint, this.width, this.height);

							
			if(!this.pause){
				//Depending on whether loop=true or loop=false return to currentFrame = 0
				//Depending on frameDelay the animations are more fast or more slow
				if(this.drawNewFrame<this.frameDelay){
					this.drawNewFrame++;
				}else{
					this.drawNewFrame = 0;
					if(this.currentFrame == (this.frameArray[this.currentAnimation].length-1)){
						if(this.loop){ 
							this.currentFrame = 0;						
						}else{
							this.inAnimation = false;	//Animation is finished
						}
					}else{
						this.currentFrame++;
					}					
				}
			}
		}
		
		SpriteAnimated.prototype.updateRotated = function(){
			ctx.drawImage(	this.img, 
							this.frameArray[this.currentAnimation][this.currentFrame][0], this.frameArray[this.currentAnimation][this.currentFrame][1],
							this.frameArray[this.currentAnimation][this.currentFrame][2], this.frameArray[this.currentAnimation][this.currentFrame][3],
							0, 0, this.width, this.height);
		
		}
		
		//Play specific animation and indicate if loop the animation
		SpriteAnimated.prototype.play = function(animation, loop){
			this.currentAnimation = animation;
			this.loop = loop;
			this.inAnimation = true;
			this.currentFrame = 0;
		}
		
		SpriteAnimated.prototype.isTouchable = function(xt, yt){
			return (xt >= this.xprint && xt <= (this.xprint+this.width) && yt >= this.yprint && yt <= (this.yprint+this.height) );
		}			
		
		SpriteAnimated.prototype.move = function(xf, yf){
			this.xprint =(0.5 + (xf-this.xcenter)) << 0;
			this.yprint =(0.5 + (yf-this.ycenter)) << 0;
		}
		
		SpriteAnimated.prototype.moveX = function(xf){
			this.xprint = xf-this.xcenter;
		}
		
		SpriteAnimated.prototype.moveY = function(yf){
			this.yprint = yf-this.ycenter;
		}
		
		SpriteAnimated.prototype.moveVertex = function(xf, yf){
			this.xprint = xf;
			this.yprint = yf;
		}
		
		SpriteAnimated.prototype.getX = function(){
			return this.xprint+this.width/2;
		}
		
		SpriteAnimated.prototype.getY = function(){
			return this.yprint+this.height/2;
		}
		
		//Depende de las variables globales WIDTH y HEIGHT que contienen el ancho y alto del canvas
		//Esta dependencia no me gusta y no debería estar aquí!!
		SpriteAnimated.prototype.movePercent = function(xpc, ypc){
			this.xprint =(0.5 + (WIDTH*xpc)) << 0;
			this.yprint =(0.5 + (HEIGHT*ypc)) << 0;	
		}		
		
		SpriteAnimated.prototype.normalizeSize = function(px, py){
			this.width = this.width*px;
			this.height = this.height*py;
			this.xcenter = this.width/2;
			this.ycenter = this.height/2;				
		}