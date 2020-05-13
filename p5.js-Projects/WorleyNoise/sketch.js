// Examples at: https://github.com/CodingTrain/WorleyNoise

let drawDebug = true, updateZ = false;
const POINTS_COUNT = 20;
let points = new Array(POINTS_COUNT);
let velocities = new Array(POINTS_COUNT);
let z = 0;

function setup()
{
    createCanvas(400, 400);
    
    for(let i = 0; i < POINTS_COUNT; ++i)
    {
        let p = createVector(random(width), random(height), 0);
        let v = createVector(random(10), random(10), 0);
        points[i] = p;
        velocities[i] = v;
    }
}

function draw()
{
    if(updateZ)
    {
        z = frameCount % width;
    }
    
    loadPixels();

    for(let y = 0; y < height; ++y)
    {
        for(let x = 0; x < width; ++x)
        {
            let distances = new Array(POINTS_COUNT);
            for(let i = 0; i < POINTS_COUNT; ++i)
            {
                let p = points[i];

                let d = dist(x, y, z, p.x, p.y, p.z);
                distances[i] = d;
            }

            let sorted = sort(distances);

            let mapping = width * 0.5;
            let r = map(sorted[0], 0, mapping, 0, 255);
            let g = map(sorted[0], 0, mapping, 0, 255);
            let b = map(sorted[0], 0, mapping, 0, 255);

            let index = (x + y * width) * 4;
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = 255;
        }
    }

    updatePixels();

    for(let i = 0; i < POINTS_COUNT; ++i)
    {
        let v = velocities[i];   
        points[i].x += v.x;
        points[i].y += v.y;

        if(drawDebug)
        {
            let p = points[i];
            stroke(40, 255, 100);
            strokeWeight(5);
            point(p.x, p.y);
        }
    }
}