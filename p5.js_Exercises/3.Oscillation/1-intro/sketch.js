let angle = 0.0;
let aVel = 0.0;
let aAcc = 0.00001;


function setup()
{
	createCanvas(600, 400);
}

function draw()
{
	background(255);

	aAcc = map(mouseX, 0, width, -0.001, 0.001);

	angle += aVel;
	aVel += aAcc;

	rectMode(CENTER);
	stroke(0);
	fill(127);
	translate(width / 2, height / 2);
	rotate(angle);
	rect(0, 0, 64, 36);
}