let amplitude = 400;
let angle = 0;

function setup()
{
	createCanvas(600, 400);
}

function draw()
{
	background(255);
	translate(width/2,height/2);

 	let x = amplitude * sin(angle);

 	fill(127);
 	stroke(0);
 	line(0, 0, x, 0);

 	ellipse(x, 0, 36, 36);

 	angle += 0.2;
}