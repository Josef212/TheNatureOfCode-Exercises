Mover m;

void setup()
{
  size(600, 600);
  m = new Mover();
}

void draw()
{
 background(51); 
 
 PVector mouse = new PVector(mouseX, mouseY);
 mouse.sub(m.pos);
 //mouse.setMag(0.2);
 m.AddForce(mouse);
 
 m.Update();
 m.Render();
}