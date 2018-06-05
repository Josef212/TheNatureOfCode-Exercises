let movers = [];

function setup()
{
  createCanvas(600, 600);
  
  for(let i = 0; i < 5; ++i)
  {
  	let m = new Mover();
  	m.pos.x = random(width);
  	m.pos.y = height / 4;
  	m.bounds = 1;
  	m.mass = random(0.5, 3.5);
  	movers.push(m);
  }
}

function draw()
{
	background(51);

	let wind = 0;
	if(mouseIsPressed) wind = 0.5;

	for(let i = 0; i < movers.length; ++i)
	{
		let m = movers[i];
		m.AddForce(0, 0.3 * m.mass);

		m.AddForce(wind, 0);

		m.Update();
		m.Render();
	}
}