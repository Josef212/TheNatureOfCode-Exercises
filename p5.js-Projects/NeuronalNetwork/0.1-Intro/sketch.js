const train_data = 
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

let tf_model, tf_train_inputs, tf_train_expected, tf_inputs;
let fpsp, lossp;

let res = 10;
let cols, rows;

async function train(_epochs = 1)
{
    return await tf_model.fit(
        tf_train_inputs, 
        tf_train_expected,
        {shuffle: true, epochs: _epochs}
    );
}

function setup()
{
    fpsp = createP("Fps: " + 0);
    lossp = createP("Loss: " + 1);
    createCanvas(400, 400);
    //noLoop();

    cols = width / res;
    rows = height / res;

    // --------------------------------------------

    tf_train_inputs = tf.tensor2d(train_data.inputs);
    tf_train_expected = tf.tensor2d(train_data.targets);

    let inp = [];
    for(let i = 0; i < cols; ++i)
    {
        for(let j = 0; j < rows; ++j)
        {
            inp.push([i / cols, j / rows]);
        }
    }

    tf_inputs = tf.tensor2d(inp);

    // ---------------------------------------------
    
    tf_model = tf.sequential();

    tf_model.add(tf.layers.dense({units: 20, inputShape: [2], activation: 'sigmoid'}));
    tf_model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));

    tf_model.compile({optimizer: tf.train.sgd(0.5), loss: 'meanSquaredError'});

    train(1000).then((res) => { console.log('Train completed. Loss: ' + res.history.loss[0]);
                                lossp.html("Loss: " + res.history.loss[0]);
                            tf_model.predict(tf_inputs).print() });
}

function draw()
{
    fpsp.html("Fps: " + Math.floor(getFrameRate()));

    background(0);

    tf.tidy(() => 
    {
        train(5).then((res) => { lossp.html("Loss: " + Number(res.history.loss[0]).toFixed(5)); });

        let ys = tf_model.predict(tf_inputs).dataSync();

        let index = 0;
        for(let i = 0; i < cols; ++i)
        {
            for(let j = 0; j < rows; ++j)
            {
                let val = ys[index];
                //stroke(2);
                noStroke();
                fill(val * 255);
                rect(i * res, j * res, res, res);

                ++index;
            }
        }
    });
}