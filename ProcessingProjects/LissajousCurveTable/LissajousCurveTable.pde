float boxSize = 80.0f;
float diameter = boxSize - 0.2 * boxSize;
float radius = diameter / 2f;
float angularVelocity = 0.01f;

float angle = 0.0f;

RotationPoint[] hrp;
RotationPoint[] vrp;

Curve[][] curves;

int cellsX, cellsY;

// -------------------------------------------------------
// -------------------------------------------------------

void setup()
{
  //size(800, 600, P2D);
  fullScreen(P2D);
  
  cellsX = int(width / boxSize) - 1;
  cellsY = int(height / boxSize) - 1;
  
  hrp = new RotationPoint[cellsX];
  vrp = new RotationPoint[cellsY];
  
  CreateRotators(cellsX, true);
  CreateRotators(cellsY, false);
  
  curves = new Curve[cellsX][cellsY];
  
  for(int i = 0; i < cellsX; ++i)
  {
    for(int j = 0; j < cellsY; ++j)
    {
      curves[i][j] = new Curve();
    }
  } //<>// //<>//
}
 
  
  
void draw()
{
  background(0);
  
  DrawRotators(hrp);
  DrawRotators(vrp);
  
  for(int i = 0; i < cellsX; ++i)
  {
    for(int j = 0; j < cellsY; ++j)
    {
      curves[i][j].AddPoint();
      curves[i][j].Draw();
    }
  }
  
  angle += angularVelocity;
  
  if(angle > TWO_PI)
  {
    noLoop();
    angle = 0f;
    
    for(int i = 0; i < cellsX; ++i)
    {
      for(int j = 0; j < cellsY; ++j)
      {
        curves[i][j].Reset();
      }
    }
  }
}

// -------------------------------------------------------
// -------------------------------------------------------
// -------------------------------------------------------

void DrawRotators(RotationPoint[] rotators)
{
  noFill();
  
  for(int i = 0; i < rotators.length; ++i)
  {
    RotationPoint rp = rotators[i];
    
    float value = rp.Draw(GetAngle(i), rotators == hrp);
    
    if(rotators == hrp)
    {
      for(int j = 0; j < cellsY; ++j)
      {
        curves[i][j].AddX(value);
      }
    }
    else
    {
      for(int j = 0; j < cellsX; ++j)
      {
        curves[j][i].AddY(value);
      }
    }
  }
}

void CreateRotators(int size, boolean horizontal)
{
 for(int i = 0; i < size; ++i)
 {
   float cx = horizontal ? boxSize + i * boxSize + boxSize / 2 : boxSize / 2;
   float cy = !horizontal ? boxSize + i * boxSize + boxSize / 2 : boxSize / 2;
   
   if(horizontal)
   {
     hrp[i] = new RotationPoint(cx, cy, radius);
   }
   else
   {
     vrp[i] = new RotationPoint(cx, cy, radius);
   }
 }
}



float GetAngle(int i)
{
  //return pow(i + 1, 2) * angle;
  //return (i * 2 + 1) * angle;
  return (i + 1) * angle; // Default
}
