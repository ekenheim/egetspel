var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var test=0;
var test2=0;
var dir=true;
var bgReady = false;
var bgImage = new Image();
var one = new Audio("sound/FirstBlood.mp3");
var two = new Audio("sound/DoubleKill.mp3");
var three = new Audio("sound/Triplekill.mp3");
var four = new Audio("sound/HolyShit.mp3");
var five = new Audio("sound/default.mp3");
var mcount=0;
var count=0;
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "background.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "hero.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "monster.png";

var counter=0;
var hero = 
{
	speed: 150 
};
var monster = 
{ 	
	speed: 100 
};
	
var monstersCaught = 15;
var keysDown = {};
addEventListener("keydown", function (e) 
{
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) 
{
	delete keysDown[e.keyCode];
}, false);


var resetm = function () 
{
	test++;
		if(test % 2==0)
		{
			monster.x =0;
			monster.y = 0 + (Math.random() * (canvas.height - 64));
			test2--;
		}
		else
		{
			monster.y = 0;
			monster.x = 0 + (Math.random() * (canvas.height - 64));
			test2++;
		}	
};

var reset = function () 
{
	hero.x = canvas.width / 3;
	hero.y = canvas.height / 3;
	monster.x = 0;
	monster.y = 250;
};



function monstermove(modifier)
{
	if(test2==1)
	{
	monster.y += monster.speed * modifier;	
	}
	else
	{
		monster.x += monster.speed * modifier;
	}	
}

function heromove(modifier)
{
	hero.y +=hero.speed * modifier;
}

var update = function (modifier) {
	
	for(i=0;i<=1;i++){ 
		setTimeout("monstermove('"+modifier+"')",0);
	}
		
	if (38 in keysDown) 
	{
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) 
	{
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) 
	{
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) 
	{
		hero.x += hero.speed * modifier;
	}

	if(monster.y >= canvas.height){ 
		resetm();
	}
	if(monster.x >=canvas.width)
	{
		resetm();
	}

	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	)
	{
		mcount+=1;
		if(mcount==1)
		{
			one.play();
		}
		if(mcount==2)
		{
			two.play();
		}
		if(mcount==3)
		{
			three.play();
		}
		if(mcount==4)
		{
			four.play();
		}
		if(mcount>=5)
		{
			five.play();
		}
		--monstersCaught;
		resetm();

	}
};

var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins remaining: " + monstersCaught + " Time: " + count, 32, 32);

	if(count>=50)
	{//Väl medveten om att jag kan ha timern räkna ned från 20, men valde detta för att visa jag kan sätta upp events beroende på tiden.
		{alert("Forgot to tell you, only got 50 seconds to complete the."  )}
		clearInterval(interval);
	}
};



var counter=setInterval(timer, 1000);
function timer()
{
  count++;
}

var main = function () 
{
	var gameover = false;
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then=now;
	if(monstersCaught<=0)
	{
		{alert("You caught all 15  monsters in: " + count + " seconds.")}
		gameover=true;	
	}
	if(gameover==true)
	{
	clearInterval(interval);
	}
};

reset();
var then = Date.now();
var interval = setInterval(main, 1);