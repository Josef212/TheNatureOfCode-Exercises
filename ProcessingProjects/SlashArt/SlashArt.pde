float space = 15f;

void setup()
{
  size(1200, 800);
  background(51);
  
  int w = int(width / space);
  int h = int(height / space);
  
  
  for(int y = 0; y < h; ++y)
  {
    for(int x = 0; x < w; ++x)
    {
      stroke(255);
      noFill();
      
      if(random(1.0) < 0.5)
        Slash(x, y);
      else
        Backslash(x, y);
    }
  }
  
}

void Slash(int x, int y)
{
  line(space + x * space, y * space, x * space, y * space + space);
}

void Backslash(int x, int y)
{
  line(x * space, y * space, x * space + space, y * space + space);
}
