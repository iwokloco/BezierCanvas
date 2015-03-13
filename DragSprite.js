function DragSprite(sprite){
	this.sprite = sprite;
	this.drag = false;
}

/*
Check if sprite is touched and if not is touched if drag=true, move sprite to x,y
*/
DragSprite.prototype.doDrag = function(){
	if(this.sprite.isTouchable(canX, canY)) this.drag = true;
	if(this.drag){
		this.sprite.moveX(canX);
		this.sprite.moveY(canY);
	}	
	return this.drag;
}