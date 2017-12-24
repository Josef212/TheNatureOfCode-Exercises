let m;

function setup()
{
  createCanvas(600, 600);
  m = new Mover();
}

function draw()
{
	background(51);

  let mouse = createVector(mouseX, mouseY);
  mouse.sub(m.pos);
  m.AddForce(mouse);

  m.Update();
  m.Render();
}