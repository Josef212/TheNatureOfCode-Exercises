// Examples at: https://github.com/CodingTrain/WorleyNoise

import interfascia.*;

GUIController c;
IFCheckBox drawDebugCb, updateZCb;

boolean drawDebug = false, updateZ = false;
Particle[] points = new Particle[50];
float z = 0;

static int NORMAL_DIST = 0, MANHATTAN_DIST = 1;
static int distanceMode = NORMAL_DIST;

void setup()
{
    size(500, 500);
    
    for(int i = 0; i < points.length; ++i)
    {
        Particle p = new Particle(random(width), random(height), random(width));
        p.SetVelocity(random(10), random(10), random(10));
        points[i] = p;
    }

    // -----------------------------------------

    c = new GUIController (this);

    drawDebugCb = new IFCheckBox("Draw degug points", 50, 50);
    updateZCb = new IFCheckBox("Update Z", 50, 75);
    
    drawDebugCb.addActionListener(this);
    updateZCb.addActionListener(this);
    
    c.add(drawDebugCb);
    c.add(updateZCb);
}

void draw()
{
    loadPixels();

    for(int y = 0; y < height; ++y)
    {
        for(int x = 0; x < width; ++x)
        {
            float[] sorted = Helper.GetSortedDistancesForPoint(x, y, z, points);

            float mapping = distanceMode == NORMAL_DIST ? width * 0.5 : width * 0.75;
            float d0 = map(sorted[0], 0, mapping, 255, 0);
            float d1 = map(sorted[1], 0, mapping, 255, 0);
            float d2 = map(sorted[2], 0, mapping, 255, 0);

            int index = x + y * width;
            pixels[index] = color(d0, d1, d2);
        }
    }

    updatePixels();

    if(updateZ)
    {
        z = frameCount % width;
    }
    
    for(Particle p : points)
    {
        p.Update();

        if(drawDebug)
        {
            p.DrawDebug(z);
        }
    }
}
 //<>// //<>//
void actionPerformed (GUIEvent e) 
{
    drawDebug = drawDebugCb.isSelected();
    updateZ = updateZCb.isSelected();
}

static class Helper
{
    static float[] GetSortedDistancesForPoint(float x, float y, float z, Particle[] pointsSet)
    {
        float[] distances = new float[pointsSet.length];
        for(int i = 0; i < pointsSet.length; ++i)
        {
            PVector p = pointsSet[i].GetPosition();

            float d = distanceMode == NORMAL_DIST 
                ? Distance(x, y, z, p.x, p.y, p.z) 
                : ManhattanDist(x, y, z, p.x, p.y, p.z);
            distances[i] = d;
        }

        return sort(distances);
    }

    static float Distance(float x0, float y0, float z0, float x1, float y1, float z1)
    {
        return dist(x0, y0, z0, x1, y1, z1);
    }

    static float ManhattanDist(float x0, float y0, float z0, float x1, float y1, float z1)
    {
        float x = abs(x1 - x0);
        float y = abs(y1 - y0);
        float z = abs(z1 - z0);
        return x + y + z;
    }
}
