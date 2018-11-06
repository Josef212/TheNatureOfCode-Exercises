class Curve
{
  ArrayList<PVector> path;
  PVector current;
  
  Curve()
  {
    path = new ArrayList<PVector>();
    current = new PVector();
  }
  
  void AddX(float x)
  {
    current.x = x;
  }
  
  void AddY(float y)
  {
    current.y = y;
  }
  
  void AddPoint()
  {
   path.add(current);
  }
  
  void Draw()
  {
    stroke(255);
    strokeWeight(1);
    noFill();
    
    beginShape();
    for(PVector v : path)
    {
     vertex(v.x, v.y); 
    }
    endShape();
    
    strokeWeight(8);
    point(current.x, current.y);
    
    current = new PVector();
  }
  
  void Reset()
  {
    path.clear();
    current = new PVector();
  }
}  
