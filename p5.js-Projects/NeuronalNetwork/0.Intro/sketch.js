const train_data = 
{
    "inputs": [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1]
    ],
    "expect": [
        [0],
        [1],
        [1],
        [0]
    ]
};

let tf_model;
let fpsp;

async function train(iterations = 1)
{
    for(let i = 0; i < iterations; ++i)
    {
        const response = await tf_model.fit(
            tf.tensor2d(train_data.inputs), 
            tf.tensor2d(train_data.expect),
            {shuffle: true, epochs: 10}
        );
        //console.log('Loss[' + i + ']: ' + response.history.loss[0]);
    }
}

/*let nn = new NeuralNetwork(
    2, 
    {units: 20, activation: 'sigmoid'},
    {units: 1, activation: 'sigmoid'}
);

nn.create({
    optimizer: tf.train.sgd(0.1),
    learningRate: 0.1,
    loss: 'meanSquaredError'
});

nn.train(
    tf.tensor2d(train_data.inputs), 
    tf.tensor2d(train_data.expect),
    {shuffle: true, epochs: 10},
    200
)
.then(() => nn.predict(tf.tensor2d(train_data.inputs)).print());*/

function setup()
{
    fpsp = createP("Fps: " + 0);
    createCanvas(400, 400);
    //noLoop();

    // --------------------------------------------
    
    tf_model = tf.sequential();

    tf_model.add(tf.layers.dense({units: 20, inputShape: [2], activation: 'sigmoid'}));
    tf_model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));

    tf_model.compile({optimizer: tf.train.sgd(0.1), loss: 'meanSquaredError'});

    train(1000).then(() => 
    {
        console.log('Training complete!')
        tf_model.predict(tf.tensor2d(train_data.inputs)).print();
        //renderFrame();
    });
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
            let val = random(0, 1); // tf_model.predict(tf.tensor2d([[i / cols, j / rows]])).dataSync()[0];
            //console.log(val);
            noStroke();
            fill(val * 255);
            rect(i * res, j * res, res, res);
        }
    }
}

/*tf_model.fit(
    tf.tensor2d(train_data.inputs),
    tf.tensor2d(train_data.expect)
)
.then((res) => console.log(res.history.loss[0]));*/