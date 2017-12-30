function Mover()
{
	this.pos = createVector(width / 2, height / 2);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);

	this.mass = 1;

	this.maxVel =  5;
	this.maxAcc = 7;

	this.radius = 20;

	this.bounds = 0; //0: None 1: Bounce 2: Wrap

	this.Update = function()
	{
		//this.acc.limit(this.maxAcc);

		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);

		//this.vel.limit(this.maxVel);

		this.Edges();
	}

	this.Edges = function()
	{
		if(this.bounds == 1)
		{
			if(this.pos.x < 0) { this.pos.x = 0; this.vel.x *= -0.9; }
			else if(this.pos.x > width) { this.pos.x = width; this.vel.x *= -0.9; }

			if(this.pos.y < 0) { this.pos.y = 0; this.vel.y *= -0.9; }
			else if(this.pos.y > height) { this.pos.y = height; this.vel.y *= -0.9; }
		}
		else if(this.bounds == 2)
		{
			if(this.pos.x < 0) this.pos.x = width;
      		if(this.pos.x > width) this.pos.x = 0;
      		if(this.pos.y < 0) this.pos.y = height;
      		if(this.pos.y > height) this.pos.y = 0;
		}
	}

	this.Render = function()
	{
		stroke(255);
    	let v = this.vel.copy();
    	v.setMag(this.radius * this.mass + 10);
    	line(this.pos.x, this.pos.y, this.pos.x + v.x, this.pos.y + v.y);

    	stroke(255);
    	strokeWeight(2);
    	fill(255, 100);
    	ellipse(this.pos.x, this.pos.y, this.radius * this.mass, this.radius * this.mass);
	}

	this.AddForce = function(force)
	{
		this.AddForce(p5.Vector.div(force, this.mass));
	}

	this.AddForce = function(x, y)
	{
		this.acc.add(x / this.mass, y / this.mass);
	}
}