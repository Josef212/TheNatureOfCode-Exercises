// Examples at: https://github.com/CodingTrain/WorleyNoise

boolean drawDebug = false, updateZ = true;

Particle[] points = new Particle[50];
float z = 0;

void setup()
{
    size(500, 500);

    for(int i = 0; i < points.length; ++i)
    {
        Particle p = new Particle(random(width), random(height), updateZ ? random(width) : 0);
        p.SetVelocity(random(10), random(10), updateZ ? random(10) : 0);
        points[i] = p;
    }
}

void draw()
{
    for(Particle p : points)
    {
        p.Update();

        if(drawDebug)
        {
            p.DrawDebug();
        }
    }

    loadPixels();

    for(int y = 0; y < height; ++y)
    {
        for(int x = 0; x < width; ++x)
        {
            float[] sorted = Helper.GetSortedDistancesForPoint(x, y, z, points);

            float d0 = map(sorted[0], 0, width * 0.5, 255, 0);
            float d1 = map(sorted[1], 0, width * 0.5, 0, 255);
            float d2 = map(sorted[2], 0, width * 0.5, 255, 0);

            int index = x + y * width;
            pixels[index] = color(d0, d1, d2);
        }
    }

    updatePixels();

    if(updateZ)
    {
        z = frameCount % width;
    }
}

static class Helper
{
    static float[] GetSortedDistancesForPoint(float x, float y, float z, Particle[] pointsSet)
    {
        float[] distances = new float[pointsSet.length];
        for(int i = 0; i < pointsSet.length; ++i)
        {
            PVector p = pointsSet[i].GetPosition();

            float d = dist(x, y, z, p.x, p.y, p.z);
            distances[i] = d;
        }

        return sort(distances);
    }
}
