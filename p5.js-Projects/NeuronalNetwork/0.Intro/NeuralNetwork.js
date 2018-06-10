class NeuralNetwork
{
    constructor(inp, hid, out)
    {
        this.inputs_size = inp;
        this.hidden_config = hid;
        this.output_config = out;

        this.model = tf.sequential();

        this.model.add(tf.layers.dense(
            {
                units: hid.units,
                inputShape: [inp],
                activation: hid.activation
            }
        ));
        this.model.add(tf.layers.dense(
            {
                units: out.units,
                activation: out.activation
            }
        ));

        console.log('Neural network created.');
    }

    create(config)
    {
        this.optimizer = config.optimizer;
        this.learningRate = config.learningRate;
        this.loss = config.loss;

        this.model.compile({
            optimizer: this.optimizer,
            loss: this.loss
        });

        console.log('Neural network compiled.');
    }

    setLearningRate(lr)
    {
        this.learningRate = lr;
        this.optimizer.learningRate(lr);
    }

    async train(inp_data, train_data, config = {shuffle: true, epochs: 10}, iterations = 1)
    {
        for(let i = 0; i < iterations; ++i)
        {
            await this.model.fit(inp_data, train_data, config);
        }

        console.log('Training completed.');
    }

    predict(inp_data)
    {
        return this.model.predict(inp_data);
    }
}