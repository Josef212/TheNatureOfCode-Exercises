function Mover()
{
	this.pos = createVector(width/2, height/2);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);

	this.maxVel =  3;
	this.maxAcc = 5;

	this.radius = 40;

	this.Update = function()
	{
		this.acc.limit(this.maxAcc);

		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);

		this.vel.limit(this.maxVel);
	}

	this.Render = function()
	{
		stroke(255);
    	let v = this.vel.copy();
    	v.setMag(this.radius + 30);
    	line(this.pos.x, this.pos.y, this.pos.x + v.x, this.pos.y + v.y);
    	noStroke();
    	fill(255);
    	ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
	}

	this.AddForce = function(force)
	{
		this.acc.add(force);
	}
}