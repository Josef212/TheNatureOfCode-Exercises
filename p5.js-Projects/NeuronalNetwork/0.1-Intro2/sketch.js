const data = 
{
    "inputs": [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1]
    ],
    "targets": [
        [0],
        [1],
        [1],
        [0]
    ]
};

let statusP;

let res = 10;
let cols, rows;
let batch, results;
let counter = 0;
let training = false;

let nn;

function train()
{
    if(!training)
    {
        training = true;
        nn.train().then(finished);
    }
}

function finished()
{
    ++counter;
    statusP.html('training pass: ' + counter + '<br>framerate: ' + floor(frameRate()));
    training = false;
    nn.predictAsync(batch).then(ys => (results = ys));

    setTimeout(train, 0);
}

function setup()
{
    statusP = createP('0');
    createCanvas(400, 400);
    noStroke();
    textAlign(CENTER, CENTER);
    //noLoop();

    nn = new NeuralNetwork(2, 2, 1);
    nn.setTrainingData(data);

    batch = new batch();

    cols = width / res;
    rows = height / res;

    // --------------------------------------------

    for(let i = 0; i < cols; ++i)
    {
        for(let j = 0; j < rows; ++j)
        {
            batch.add([i / cols, j / rows]);
        }
    }

    batch.toTensor();
    results = nn.predict(batch);
    train();

    // ---------------------------------------------
    
}

function draw()
{
    background(0);

    for(let i = 0; i < cols; ++i)
    {
        for(let j = 0; j < rows; ++j)
        {
            let y = results[i + j * rows];
            fill(y * 255);
            rect(i * res, j * res, res, res);
            fill(255 - y * 255);
            text(nf(y, 0, 2), i * res + res / 2, j * res + res / 2);
        }
    }
}