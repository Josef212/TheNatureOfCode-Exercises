let pSs = [];

function setup()
{
	createCanvas(640,360);

	pSs.push(new ParticleSystem(width / 2, 50, 100, 0, 0, 0, 0.05));
}


function draw()
{
	background(51);

	for(let ps of pSs)
		ps.Run();
}

function mousePressed()
{
	pSs.push(new ParticleSystem(mouseX, mouseY, 100, 0, 0, 0, 0.05));
}