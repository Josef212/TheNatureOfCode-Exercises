class Particle
{
    constructor(x, y, vx = 0, vy = 0, cAccx = 0, cAccy = 0)
    {
        this.position = createVector(x, y);
        this.velocity = createVector(vx, vy);
        this.acceleration = createVector();
        this.constantAcceleration = createVector(cAccx, cAccy);

        this.mass = 1.0;

        this.lifespan = 255.0;
        this.degradationRatio = 2.0;

        this.maxAcceleration = 10.0;
        this.maxVelocity = 10.0;

        this.checkBoundaries = true;
    }

    // ---------------------------------------------------------

    Run()
    {
        this.Update();
        if(this.checkBoundaries == true)
            this.Bounds();
        this.Render();
    }

    // ---------------------------------------------------------

    Update()
    {
        this.acceleration.add(this.constantAcceleration);
        this.acceleration.limit(this.maxAcceleration);

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxVelocity);

        this.position.add(this.velocity);

        this.acceleration.set(0, 0);

        this.lifespan -= this.degradationRatio;
    }

    // ---------------------------------------------------------

    Render()
    {
        stroke(0, this.lifespan);
        fill(random(0, 256), this.lifespan, 255 - this.lifespan, this.lifespan);
        //fill(175, this.lifespan);
        ellipse(this.position.x, this.position.y, this.Size(), this.Size());
    }

    // ---------------------------------------------------------

    Bounds()
    {
        if(this.position.x < 0) { this.position.x = 0; this.velocity.x *= -0.9; }
        else if(this.position.x > width) { this.position.x = width; this.velocity.x *= -0.9; }

        if(this.position.y < 0) { this.position.y = 0; this.velocity.y *= -0.9; }
        else if(this.position.y > height) { this.position.y = height; this.velocity.y *= -0.9; }
    }

    // ---------------------------------------------------------

    IsDead()
    {
        return this.lifespan <= 0.0;
    }

    // ---------------------------------------------------------

    ApplyForce(x, y)
    {
        this.acceleration.add(createVector(x, y).div(this.mass));
    }

    // ---------------------------------------------------------

    Size()
    {
        return this.mass * 1.5 + 10;
    }

    // ---------------------------------------------------------
}