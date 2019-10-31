
var bird = new Image();
bird.src = "img/bird.png";

var bird2 = new Image();
bird2.src = "img/bird2.png";

var bg = new Image();
bg.src = "img/background.jpg";

var obsPict = new Image();
obsPict.src = "img/obs.png";

var die = new Image();
die.src = "img/die.png";

var title = new Image();
title.src = "img/title.png";

var pil1 = new Image();
pil1.src = "img/pil1.png";


function setCanvas(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	canvas.width = canvas.scrollWidth;
	canvas.height = canvas.scrollHeight;

	var cW = canvas.width;
	var cH = canvas.height;


	var bgX=0,start=false,z=260;
	function splash(){
		ctx.clearRect(0,0,cW,cH);
		ctx.drawImage(bg,bgX-=2,0);
		if(bgX==-1598){
			bgX=0;
		}
		ctx.font="Bold 20px Arial";
		ctx.fillText('Click to start',320,420);

		ctx.drawImage(title,60,100);

		ctx.drawImage(bird,340,z+=2);
		if(z>=290){z=260;}
	}
	var inSplash = setInterval(splash,30);

	ctx.canvas.addEventListener('click',function(event){
		if (start==false) {
			start=true;
			clearInterval(inSplash);
			main();
		}
	});

	function main(){

		var changeImage = false;

		function BG(){
			this.x=0;
			this.render=function(){
				ctx.drawImage(bg,this.x--,0);
				if (this.x==-1599) {
					this.x=0;
				}
			}
		}

		var background = new BG();

		function Char(){
			this.x = 100; this.y = 200; this.w = 100; this.h = 90;this.i=0;
			this.render=function(){
				if(changeImage){
					ctx.drawImage(bird2,this.x,this.y+=5);
					this.i++;
					if (this.i==5) {
						changeImage=false;
						this.i=0;
					}
				}else{
					ctx.drawImage(bird,this.x,this.y+=5);
				}
			}
		}
		var char = new Char();

		var obs = [];
		addObs();

		function addObs(){
			var x=800, y=0, w=70,h=300;
			var random = Math.floor(Math.random()*200);
			obs.push(
				{"x":x,"y":y-random,"w":w,"h":h}
			);
		}


		var account = 0;

		function end(){
			clearInterval(interval);
			ctx.clearRect(0,0,cW,cH);
			background.render();
			renderObs();
			ctx.drawImage(die,char.x,char.y);
			ctx.globalAlpha =0.5;
			ctx.fillRect(0,0,cW,cH);
			ctx.globalAlpha =1;

			ctx.fillStyle="red";
			ctx.font="Bold 60px Arial";
			ctx.fillText("GAME OVER", 230,220);

			ctx.fillStyle='white';
			ctx.font="Normal 40px Arial";
			ctx.fillText("Your Score : " + score, 300, 270);

			ctx.fillStyle='black';
			ctx.font="Bold 15px Arial";
			ctx.fillText("Click to Reload", 360, 330);

			ctx.fillStyle='white';
			ctx.font = 'Normal 12px Arial';
			ctx.fillText('Creator : Roman Zidan Ramadhan', 610, 490);

			ctx.canvas.addEventListener('click',function(event){
				window.location.reload();
				// history.go(0);
				// window.location.href = window.location.href;
			})

		}

		var score = 0, addNumber=true;
		function  addScore(){
			score++; 
		}

		function crash(){
			for(var i=0;i<obs.length;i++){
				var o=obs[i];
				if ((char.x+char.w>o.x && char.y<o.y+o.h && char.x<o.x+o.w)	|| (char.x+char.w>o.x && char.y+char.h>o.y+o.h+200 && char.x<o.x+o.w)) {
			 		end();
			 	}else if(o.x+o.w<char.x){
			 		if (addNumber) {
			 			addScore();
			 			addNumber=false;
			 		}
			 	}
			}
			if(char.y<=0){end();}
			if(char.y+char.h>cH){end();}

		}

		function renderObs(){
			for(var i=0;i<obs.length;i++){
				var o=obs[i];
				ctx.drawImage(obsPict,o.x--,o.y);
				ctx.drawImage(obsPict,o.x--,o.y+o.h+200);

				if (o.x+o.w<0) {
					obs.splice(i,1);
					addNumber = true;
				}
			}
			account++;
			if (account==200) {
				addObs();
				account=0;
			}
		}

		function animation(){
			ctx.save();
			ctx.clearRect(0,0,cW,cH);

			background.render();
			char.render();
			renderObs();
			ctx.font="Normal 30px Arial";
			ctx.fillText("Score : " + score, 20, 50);
			crash();


			ctx.restore();
		}

		var interval = setInterval(animation,30);

		ctx.canvas.addEventListener('click', function(event){
			char.y-=50;
			changeImage=true;
		})

	}

}

window.addEventListener('load', function(event){
	setCanvas();
});