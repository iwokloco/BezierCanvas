var touchDown = 0;

function addEventsListeners(){
	can.addEventListener(	"touchstart", 
							function(event){
								touchDown = 1;
								event.preventDefault();
								if(event.targetTouches.length>=1){
									canX = event.targetTouches[0].pageX - can.offsetLeft;
									canY = event.targetTouches[0].pageY - can.offsetTop;
								}
							}, false);
	can.addEventListener(	"touchmove", 
							function(event){
								event.preventDefault();
								if(event.targetTouches.length>=1){
									canX = event.targetTouches[0].pageX - can.offsetLeft;
									canY = event.targetTouches[0].pageY - can.offsetTop;
								}			
							}, false);
	can.addEventListener(	"touchend",
							function(event){
								touchDown = 0;
								event.preventDefault();
								if(event.targetTouches.length>=1){
									canX = event.targetTouches[0].pageX - can.offsetLeft;
									canY = event.targetTouches[0].pageY - can.offsetTop;
								}								
							}, false);
	can.addEventListener(	"mousedown", 
							function(event){
								touchDown = 1;
								canX = event.pageX - can.offsetLeft;
								canY = event.pageY - can.offsetTop;								
							}, true);
	document.body.addEventListener(	"mouseup",
									function(event){
										touchDown = 0;
										canX = event.pageX - can.offsetLeft;
										canY = event.pageY - can.offsetTop;										
									}, false);
	can.addEventListener(	"mousemove", 
							function(event){
								canX = event.pageX - can.offsetLeft;
								canY = event.pageY - can.offsetTop;								
							}, false);
	
}

function removeEventsListeners(){
	can.removeEventListener("touchstart",touchDown, false);
	can.removeEventListener("touchmove",touchXY, false);
	can.removeEventListener("touchend",touchUp, false);	
}

function isTouchDown(){
	return (touchDown == 1); 	
}