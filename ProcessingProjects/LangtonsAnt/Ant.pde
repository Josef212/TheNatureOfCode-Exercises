int ANT_UP = 0;
int ANT_RIGHT = 1;
int ANT_DOWN = 2;
int ANT_LEFT = 3;

class Ant
{
  int x, y, dir;
  color col;
  
  Ant(int _x, int _y, int _dir, color c)
  {
    x = _x; 
    y = _y;
    dir = _dir;
    col = c;
  }
  
  void Steps(PImage image, int[][] grid, int s)
  {
    for(int i = 0; i < s; ++i)
    {
      Step(image, grid);
    }
  }
  
  void Step(PImage image, int[][] grid)
  {
    int state = grid[x][y];
    if(state == 0)
    {
      TurnRight();
      grid[x][y] = 1;
    }
    else
    {
      TurnLeft();
      grid[x][y] = 0;
    }
  
    image.pixels[x + y * image.width] = grid[x][y] == 0 ? color(255) : col;
  
    MoveForward();
  }

  void TurnRight()
  {
    ++dir;
      if(dir > ANT_LEFT) dir = ANT_UP;
  }

  void TurnLeft()
  {
    --dir;
    if(dir < ANT_UP) dir = ANT_LEFT;
  }

  void MoveForward()
  {
    switch(dir)
    {
      case 0: --y; break;
      case 1: ++x; break;
      case 2: ++y; break;
      case 3: --x; break;
    }
  
    if(x >= width) x = 0;
    if(x < 0) x = width - 1;
    if(y >= height) y = 0;
    if(y < 0) y = height - 1;
  }
}
