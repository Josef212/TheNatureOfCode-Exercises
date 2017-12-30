let movers = [];
let fA;

function setup()
{
  createCanvas(1000, 400);
  
  for(let i = 0; i < 1; ++i)
  {
  	let m = new Mover();
  	m.pos.x = 20;
  	m.pos.y = height / 2;
  	m.bounds = 1;
  	m.mass = random(0.5, 3.5);
  	movers.push(m);
  }

  fA = new frictionArea(width / 2, height / 4, 400, height / 2);
}

function draw()
{
	background(51);


	fA.Render();


	for(let i = 0; i < movers.length; ++i)
	{
		let m = movers[i];
		m.AddForce(0.3 * m.mass, 0);

		fA.Evaluate(m);

		m.Update();
		m.Render();
	}
}