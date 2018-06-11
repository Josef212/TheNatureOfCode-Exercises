class Data
{
    constructor(data)
    {
        this.xs = tf.tensor2d(data.inputs);
        this.ys = tf.tensor2d(data.targets);
    }
}

class Batch
{
    constructor()
    {
        this.data = [];
    }

    add(data)
    {
        this.data.push(data);
    }

    toTensor()
    {
        this.data = tf.tensor2d(this.data);
    }
}

class NeuralNetwork
{
    constructor(inp, hid, out, lr)
    {
        this.model = tf.sequential();

        this.model.add(tf.layers.dense({units: hid, inputShape: [inp], activation: 'sigmoid'}));
        this.model.add(tf.layers.dense({units: out, activation: 'sigmoid'}));

        const optimizer = tf.train.sgd(lr || 0.5);

        this.model.compile({optimizer: optimizer, loss: 'meanSquaredError'});

        console.log('Neural network created.');
    }

    predict(inputs)
    {
        return tf.tidy(() =>
            {
                let data;
                if(inputs instanceof Batch)
                    data = inputs.data;
                else
                    data = [inputs];

                const xs = data instanceof tf.Tensor ? data : tf.tensor2d(data);
                return this.model.predict(xs).dataSync();
            });
    }

    async predictAsync(inputs)
    {
        let ys = tf.tidy(() =>
            {
                let data;
                if(inputs instanceof Batch)
                    data = inputs.data;
                else
                    data = [inputs];

                const xs = data instanceof tf.Tensor ? data : tf.tensor2d(data);
                return this.model.predict(xs);
            });

        let ret = await ys.data();
        ys.dispose();
        return ret;
    }

    setTrainingData(data)
    {
        if(data instanceof Data)
            this.trainingData = data;
        else
            this.trainingData = new Data(data);
    }

    async train(epochs, data)
    {
        let xs, ys;
        if(data)
        {
            xs = tf.tensor2d(data.inputs);
            ys = tf.tensor2d(data.targets);
        }
        else if(this.trainingData)
        {
            xs = this.trainingData.xs;
            ys = this.trainingData.ys;
        }
        else
        {
            console.log("No data to train!");
            return;
        }

        await this.model.fit(xs, ys, {epochs: epochs || 1, shuffle: true});
        if(data)
        {
            xs.dispose();
            ys.dispose();
        }
    }
}