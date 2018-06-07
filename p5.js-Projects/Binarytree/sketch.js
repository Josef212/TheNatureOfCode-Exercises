let bt;

function setup()
{
    createCanvas(600, 400);
    background(51);

    bt = new BinaryTree();
    
    for(let i = 0; i < 10; ++i)
    {
        bt.add(floor(random(0, 100)));
    }

    /*bt.add(5);
    bt.add(3);
    bt.add(7);
    bt.add(2);*/

    console.log(bt);
    bt.traverse((x) => console.log(x.value));

    render();
}

function renderNode(n)
{
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);

    text(n.value, n.pos.x, n.pos.y);

    n.log();
}

function render()
{
    let nodes = [];

    bt.traverse((n) => nodes.push(n));

    for(let n of nodes)
        renderNode(n);
}

function mousePressed()
{
    bt.add(floor(random(0, 100)));
    render();
}