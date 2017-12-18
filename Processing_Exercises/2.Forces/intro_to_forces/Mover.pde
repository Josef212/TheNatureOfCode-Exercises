class Mover
{
   PVector pos;
   PVector vel;
   PVector acc;
   
   float mass = 1;
   
   float maxVel = 5;
   float maxAcc = 7;

   int radius = 20;
  
  int bound = 0; //0: None 1: Bounce 2: Wrap
  
  Mover()
  {
    pos = new PVector(width / 2, height / 2);
    vel = new PVector(0, 0);
    acc = new PVector(0, 0);
  }
  
  Mover(float x, float y)
  {
    pos = new PVector(x, y);
    vel = new PVector(0, 0);
    acc = new PVector(0, 0);
  }
  
  Mover(float x, float y, float velX, float velY)
  {
    pos = new PVector(x, y);
    vel = new PVector(velX, velY);
    acc = new PVector(0, 0);
  }
  
  Mover(float x, float y, float velX, float velY, float accX, float accY)
  {
    pos = new PVector(x, y);
    vel = new PVector(velX, velY);
    acc = new PVector(accX, accY);
  }
  
  void Update()
  {
    //acc.limit(maxAcc);
    
    vel.add(acc);
    pos.add(vel);
    acc.mult(0);
    
    //vel.limit(maxVel);
    
    Edges();
  }
  
  void Edges()
  {
    if(bound == 1)
    {
      if(pos.x < 0) 
      {
        pos.x = 0;
        vel.x *= -1;
      }
      else if(pos.x > width)
      {
        pos.x = width;
        vel.x *= -1;
      }
      
      if(pos.y < 0) 
      {
        pos.y = 0;
        vel.y *= -1;
      }
      else if(pos.y > height)
      {
        pos.y = height;
        vel.y *= -1;
      }
    }
    else if(bound == 2)
    {
      if(pos.x < 0) pos.x = width;
      if(pos.x > width) pos.x = 0;
      if(pos.y < 0) pos.y = height;
      if(pos.y > height) pos.y = 0;
    }
  }
  
  void Render()
  {
    stroke(255);
    PVector v = vel.copy();
    v.setMag(radius * mass + 10);
    line(pos.x, pos.y, pos.x + v.x, pos.y + v.y);
    
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(pos.x, pos.y, (radius) * mass, (radius) * mass);
  }
  
  void AddForce(float x, float y)
  {
   acc.add(x / mass, y / mass); 
  }
  
  void AddForce(PVector f)
  {
    AddForce(f.x, f.y);
  }
  
}