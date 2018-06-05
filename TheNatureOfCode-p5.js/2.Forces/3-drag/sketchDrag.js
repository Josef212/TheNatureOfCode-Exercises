let movers = [];
let dA;

function setup()
{
  createCanvas(640, 360);
  
  for(let i = 0; i < 5; ++i)
  {
  	let m = new Mover();
  	m.pos.x = random(width);
  	m.pos.y = 0;
  	m.bounds = 1;
  	m.mass = random(0.5, 3.5);
  	movers.push(m);
  }

  dA = new dragArea(0, height / 2, width, height / 2);
}

function draw()
{
	background(51);


	dA.Render();


	for(let i = 0; i < movers.length; ++i)
	{
    let m = movers[i];

    if(dA.Evaluate(m))
    {
      m.AddForce(dA.GetDrag(m));
    }

		m.AddForce(0, 0.1 * m.mass);


		m.Update();
		m.Render();
	}
}