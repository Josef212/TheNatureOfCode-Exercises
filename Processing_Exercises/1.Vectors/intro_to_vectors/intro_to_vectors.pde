PVector pos;
PVector vel;
int size = 10;

void setup()
{
   size(400, 400);
   pos = new PVector(width/2, height/2);
   vel = new PVector(random(-2, 2), random(-2, 2));
}

void draw()
{
  background(51);
  boolean collided = false;
  
  pos.add(vel);
  
  if(pos.x < size/2 || pos.x > width - size/2) {vel.x *= -1; collided = true;}
  if(pos.y < size/2 || pos.y > height - size/2) {vel.y *= -1; collided = true;}
  
  noStroke();
  if(collided == true)
    fill(255, 0, 0);
  else
    fill(255);
  ellipse(pos.x, pos.y, size, size);
  PVector v = vel.copy();
  v.mult(20);
  stroke(255);
  line(pos.x, pos.y, pos.x + v.x, pos.y + v.y);
}