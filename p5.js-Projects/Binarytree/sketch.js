let bt;

let ySeparation = 50;

function setup()
{
    createCanvas(600, 400);
    background(51);

    bt = new BinaryTree();
    
    for(let i = 0; i < 10; ++i)
    {
        bt.add(floor(random(0, 100)));
    }

    bt.add(5);
    bt.add(3);
    bt.add(7);
    bt.add(2);

    console.log(bt);
    bt.traverse((x) => console.log(x.value));

    //render();
}

/*function renderNode(n)
{
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);

    // Root position and origin of the tree
    let d = n.node.depth;

    let x = width / 2;
    let y = 20 + d * ySeparation;

    if(d > 0)
    {
        x = 1 * width / n.b; //Math.pow((d + 1), 2);
    }

    //console.log("V: " + n.value + ": " + x + " - " + y);

    if(n.node.isOnLeft())
    {
        // Move the x to the left
    }
    else if(n.node.isOnRight())
    {
        // Move the x to the right
    }
    // Else the node is the root so let it be


    text(n.node.value, n.x, n.y);
}*/

/*function render()
{
    let nodes = [];

    bt.traverse((n) => 
    {
        let b = Math.pow((n.depth + 1), 2);

        let getParentObj = () => 
        {
            for(let t of nodes)
            {
                if(t.key === n.parent)
                {
                    return t.value;
                }
            }
            return null;
        };

        let pObj = getParentObj();

        let x = width / 2;
        //if(n.depth > 0) x = 1 * width / b;
        
        if(pObj !== null && pObj !== undefined)
        {
            console.log(n.value + ": " + pObj);
            if(n.isOnLeft())
            {
                x = pObj.x - (width / b);
                console.log("Val: " + n.value + " - pObj.x - (width / b): " + pObj.x + " - " + "(" + width + " / " + " " + b +") = " + x);
            }
            if(n.isOnRight())
            {
                x = pObj.x + (width / b);
                console.log("Val: " + n.value + " - pObj.x - (width / b): " + pObj.x + " + " + "(" + width + " / " + " " + b +") = " + x);
            }
        }
        else
            console.log("Val: " + n.value + " - x: " + x);

        

        let obj = 
        {
            node: n,
            b: b,

            x: x,
            y: 20 + n.depth * ySeparation
        };

        nodes.push({"key": n, "value": obj});
    
    });

    for(let n of nodes)
        renderNode(n.value);
}*/

function mousePressed()
{
    bt.add(floor(random(0, 100)));
    //render();
}