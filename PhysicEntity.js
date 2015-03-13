var PHYSICS_MRU = 0;
var PHYSICS_MUA = 1;
var PHYSICS_PARABOLIC = 2;

function PhysicEntity(sprite){
	this.sprite = sprite;
	this.motionType = PHYSICS_MRU;
	this.remainingTicks = 0;
	this.goingTo = false;
	this.inMotion =  false;
	this.xo = 0;
	this.yo = 0;
	this.xf = 0;
	this.yf = 0;
	this.vx = 0;
	this.vy = 0;
	this.velocity = 3;
	this.distance = 0;
	this.vmodule = 0;
	this.amodule = 0;
	this.gravity = 0;
	this.newx = 0;
	this.newy = 0;
	this.Ax = 0;
	this.Ay = 0;
	//Collision Area, definition of box
	this.xbcol = 0;	//x box collision
	this.ybcol = 0;	//y box collision
	this.wbcol = this.sprite.width;		//width of box collision
	this.hbcol = this.sprite.height;	//height of box collision
	//Control
	this.pause = false;
	//Parabolic function
	this.vox = 0;
	this.voy = 0;
	this.parabolic_ticks = 0;
}

PhysicEntity.prototype.mruTo = function(x,y){
	this.newx = x;
	this.newy = y;
	this.goingTo = (this.newx != this.sprite.xprint || this.newy != this.sprite.yprint);
	if(this.goingTo){
		//Calculo el desplazamiento para cada eje
		this.Ax = this.newx-this.sprite.xprint;
		this.Ay = this.newy-this.sprite.yprint;				
		//Calculo el módulo del vector de desplazamiento
		this.distance = Math.sqrt(this.Ax*this.Ax+this.Ay*this.Ay);
		//Divido la distancia entre la velocidad a la que quiero que se desplace el objeto.
		//Con esto obtengo el tiempo total en ticks.
		this.remainingTicks = this.distance/this.velocity;
		//Calculo la velocidad (incremento) correspondiente a cada componente.
		this.vx = this.Ax/this.remainingTicks;
		this.vy = this.Ay/this.remainingTicks;
		//Por cada tick debo incrementar en las componentes de las coordenadas, lo que le corresponde de velocidad.			
	}
}

PhysicEntity.prototype.parabolic = function(vo, a){//vo es la velocidad inicial, a es el ángulo
	this.motionType = PHYSICS_PARABOLIC;
	this.xo = this.sprite.xprint;
	this.yo = this.sprite.yprint;
	this.vox = -vo*(Math.cos(a));//Ángulo en radianes
	this.voy = vo*(Math.sin(a));//Ángulo en radianes	
	this.remainingTicks = 200;
}

PhysicEntity.prototype.update = function(){
	if(!this.pause){
		switch(this.motionType){
			case PHYSICS_MRU:
					if(this.remainingTicks>0){
						this.sprite.moveVertex((this.sprite.xprint+this.vx),(this.sprite.yprint+this.vy));
						this.remainingTicks--;
					}
				break;
			case PHYSICS_MUA:
				break;
			case PHYSICS_PARABOLIC:
					if(this.remainingTicks>0){
						this.parabolic_ticks++;
						this.sprite.moveVertex((this.xo+this.vox*this.parabolic_ticks),(this.yo+this.voy*this.parabolic_ticks+0.4*this.parabolic_ticks*this.parabolic_ticks));
						this.remainingTicks--;
					}
				break;
		}
	}
	this.sprite.update();
}

function collision(t,e){	//El parámetro es de tipo PhysicEntity
	var eAx = e.sprite.xprint+e.xbcol;
	var eAy = e.sprite.yprint+e.ybcol;
	var eBx = e.sprite.xprint+e.xbcol+e.wbcol;
	var eBy = eAy;
	var eCx = eAx;
	var eCy = e.sprite.yprint+e.ybcol+e.hbcol;
	var eDx = eBx;
	var eDy = eCy;
	
	var tAx = t.sprite.xprint+t.xbcol;
	var tAy = t.sprite.yprint+t.ybcol;
	var tBx = t.sprite.xprint+t.xbcol+t.wbcol;
	var tBy = tAy;
	var tCx = tAx;
	var tCy = t.sprite.yprint+t.ybcol+t.hbcol;
	var tDx = tBx;
	var tDy = tCy;
	
	
	//TOP COLISIÓN sin tener en cuenta la colisión de que T entra en E.
	//( (tAx < eDx && tAy < eDy && tDx > eDx && tDy > eDy ) ||
	//	(tBx > eCx && tBy < eCy && tCx < eCx && tCy > eCy) )
	return ( (tAx <= eDx && tAy <= eDy && tDx >= eDx && tDy >= eDy ) ||	(tBx >= eCx && tBy <= eCy && tCx <= eCx && tCy >= eCy) );
	/*	
	A_______B
	|		|
	|_______|
	C		D
	*/
}

//The collision areas are defined by relative coords and width and height of every area
/*var collisionAreas = [
                      [0,0,a.sprite.width,a.sprite.height]
                      ];
*/

function newCollision(a, b){
	
	var A1x = a.sprite.xprint;
	var A1y = a.sprite.yprint;
	var A2x = a.sprite.xprint + a.sprite.width;
	var A2y = a.sprite.yprint;
	var A3x = a.sprite.xprint + a.sprite.width;
	var A3y = a.sprite.yprint + a.sprite.height;
	var A4x = a.sprite.xprint;
	var A4y = a.sprite.yprint + a.sprite.height;
	
	var B1x = b.sprite.xprint;
	var B1y = b.sprite.yprint;
	var B2x = b.sprite.xprint + b.sprite.width;
	var B2y = b.sprite.yprint;
	var B3x = b.sprite.xprint + b.sprite.width;
	var B3y = b.sprite.yprint + b.sprite.height;
	var B4x = b.sprite.xprint;
	var B4y = b.sprite.yprint + b.sprite.height;	
	
	//A1 : B1 A1 B3
	var A1 = A1x >= B1x && A1x <= B3x && A1y >= B1y && A1y <= B3y;
	//A2 : B1 A2 B3
	var A2 = A2x >= B1x && A2x <= B3x && A2y >= B1y && A2y <= B3y;
	//A3 : B1 A3 B3
	var A3 = A3x >= B1x && A3x <= B3x && A3y >= B1y && A3y <= B3y;
	//A4 : B1 A4 B3
	var A4 = A4x >= B1x && A4x <= B3x && A4y >= B1y && A4y <= B3y;	
	
	//B1 : A1 B1 A3
	var B1 = B1x >= A1x && B1x <= A3x && B1y >= A1y && B1y <= A3y;
	//B2 : A1 B2 A3
	var B2 = B2x >= A1x && B2x <= A3x && B2y >= A1y && B2y <= A3y;
	//B3 : A1 B3 A3
	var B3 = B3x >= A1x && B3x <= A3x && B3y >= A1y && B3y <= A3y;
	//B4 : A1 B4 A3
	var B4 = B4x >= A1x && B4x <= A3x && B4y >= A1y && B4y <= A3y;	
	
	return A1 || A2 || A3 || A4 || B1 || B2 || B3 || B4;	
	
}