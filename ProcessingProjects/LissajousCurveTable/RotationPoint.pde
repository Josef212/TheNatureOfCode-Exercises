class RotationPoint
{
  float cx, cy;
  float radius;
  
  RotationPoint(float _x, float _y, float r)
  {
    cx = _x;
    cy = _y;
    radius = r;
  }
  
  float GetX(float angle)
  {
    return cx + radius * cos(angle - HALF_PI);
  }
  
  float GetY(float angle)
  {
    return cy + radius * sin(angle - HALF_PI);
  }
  
  float Draw(float angle, boolean horizontal)
  {
    stroke(255);
    strokeWeight(1);
    ellipse(cx, cy, radius * 2, radius * 2);
    
    float x = GetX(angle);
    float y = GetY(angle);
    strokeWeight(8);
    point(x, y);
   
    stroke(255, 50);
    strokeWeight(1);
    
    if(horizontal) line(x, 0, x, height);
    else line(0, y, width, y); 
    
    return horizontal ? x : y;
  }
}
