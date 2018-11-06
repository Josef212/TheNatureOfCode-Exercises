int ANTS_COUNT = 5;
int STEPS_PER_FRAME = 1000;

PImage image;
int[][] grid;
Ant[] ants;

void setup()
{
  //size(400, 400);
  fullScreen(P2D);
  
  grid = new int[width][height];
  
  image = createImage(width, height, RGB);
  image.loadPixels();
  
  for(int i = 0; i < image.pixels.length; ++i)
  {
    image.pixels[i] = color(255);
  }
  
  image.updatePixels();
  
  ants = new Ant[ANTS_COUNT];
  for(int i = 0; i < ANTS_COUNT; ++i)
  {
    color c;
    do { c = color(random(255), random(255), random(255)); }while(c == color(255));
    ants[i] = new Ant(int(random(width)), int(random(height)), int(random(4)), c);
  }
}

void draw()
{
  image.loadPixels();
  
  for(Ant ant : ants) ant.Steps(image, grid, STEPS_PER_FRAME);
  
  image.updatePixels();
  
  image(image, 0, 0);
}

// ----
