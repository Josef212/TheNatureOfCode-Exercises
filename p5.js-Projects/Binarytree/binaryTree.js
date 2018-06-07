let ySeparation = 50;

class BNode
{
    constructor(val)
    {
        this.left = null;
        this.right = null;
        this.value = val;

        this.parent = null;
        this.depth = 0;

        this.pos = {x: 0, y: 0};
    }

    add(n, parent)
    {
        if(n.value < this.value)
        {
            if(this.left == null)
            {
                this.left = n;
                n.parent = this;
                n.depth = this.depth + 1;

                this.setPosition();
            }
            else
            {
                this.left.add(n);
            }
        }
        else
        {
            if(this.right == null)
            {
                this.right = n;
                n.parent = this;
                n.depth = this.depth + 1;

                this.setPosition();
            }
            else
            {
                this.right.add(n);
            }
        }
    }

    visit(func)
    {
        if(this.left != null) this.left.visit(func);

        func(this);

        if(this.right != null) this.right.visit(func);
    }

    search(val)
    {
        if(this.value == val)
        {
            return this;
        }
        else if(val < this.value && this.left != null)
        {
            return this.left.search(val);
        }
        else if(val >= this.value && this.right != null)
        {
            return this.right.search(val);
        }

        return null;
    }

    isOnLeft()
    {
        // TODO: Really only this shit for render???

        if(this.parent != null)
        {
            return this.parent.left === this;
        }

        return false;
    }

    isOnRight()
    {
        // TODO: Really only this shit for render???

        if(this.parent != null)
        {
            return this.parent.right === this;
        }

        return false;
    }

    setPosition()
    {
        this.pos.y = 20 + this.depth * ySeparation;
        this.log();
    }

    log()
    {
        console.log(this.value + ": (" + this.pos.x + " - " + this.pos.y + ") d-" + this.depth);
    }
}


// ########################################################################
// ========================================================================
// ########################################################################

class BinaryTree
{
    constructor(val)
    {
        this.root = null;

        if(val !== undefined) this.add(val);
    }

    add(val)
    {
        if(this.root == null) 
        {
            this.root = new BNode(val);
        }
        else
        {
            this.root.add(new BNode(val));
        }
    }

    traverse(func)
    {
        this.root.visit(func);
    }

    search(val)
    {
        if(this.root != null)
        {
            let ret = this.root.search(val);

            if(ret != null) console.log("Found: " + ret);
            else console.log("Not found!");

            return ret;
        }

        console.log("No root!");
        return null;
    }
}