
let len = 180;
let angle = Math.PI/4;
let aVel = 0;
let aAcc = 0;

let origin;
let bob;


function setup()
{
	createCanvas(600, 400);

	origin = createVector(width / 2, 0);
	bob = createVector(width / 2, len);
}

function draw()
{
	background(51);

	bob.x = origin.x + len * sin(angle);
	bob.y = origin.y + len * cos(angle);

	line(origin.x, origin.y, bob.x, bob.y);
	ellipse(bob.x, bob.y, 32, 32);

	aAcc = -0.01 * sin(angle);

	angle += aVel;
	aVel += aAcc;

	aVel *= 0.99;
}