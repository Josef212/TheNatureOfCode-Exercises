let fpsp;

function setup()
{
    fpsp = createP("Fps: " + 0);
    createCanvas(400, 400);
}

function draw()
{
    fpsp.html("Fps: " + Math.floor(getFrameRate()));

    background(0);

    let res = 10;
    let cols = width / res;
    let rows = height / res;

    for(let i = 0; i < cols; ++i)
    {
        for(let j = 0; j < rows; ++j)
        {
            let val = random(0, 1);

            noStroke();
            fill(val * 255);
            rect(i * res, j * res, res, res);
        }
    }
}
