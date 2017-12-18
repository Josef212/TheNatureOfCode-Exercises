Mover[] movers;

void setup()
{
 size(600, 600);
 
 movers = new Mover[5];
 for(int i = 0; i < 5; ++i)
 {
    Mover m = new Mover(random(0, width), height / 4);
    m.bound = 1;
    m.mass = random (0.5, 3.5);
    movers[i] = m;
  }
 
}

void draw()
{
 background(51);
 
 PVector wind = new PVector(0, 0);
 if(mousePressed)
 {
   wind.set(0.5, 0);
 }
 
 for(Mover m : movers)
 {
   //Gravity
   PVector gravity = new PVector(0, 0.3);
   gravity.mult(m.mass);
   m.AddForce(gravity);
   
   //Wind
   m.AddForce(wind);
   
   m.Update();
   m.Render();
 }
  
}