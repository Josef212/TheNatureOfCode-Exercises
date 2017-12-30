function frictionArea(x, y, w, h)
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.frictionCoefitient = 0.5;

	this.Evaluate = function(mover)
	{
		if(mover.pos.x >= this.x && mover.pos.x <= this.x + this.w 
			&&	mover.pos.y >= this.y && mover.pos.y <= this.y + this.h)
		{
			// Apply friction
			let fric = mover.vel.copy();
			fric.normalize();
			fric.mult(-1 * this.frictionCoefitient);
			mover.AddForce(fric);

			stroke(255, 0, 0);
			fric.mult(50);
			line(mover.pos.x, mover.pos.y, mover.pos.x + fric.x, mover.pos.y + fric.y);
		}
	}

	this.Render = function()
	{
		noStroke();
		fill(255, 100, 100, 50);
		rect(this.x, this.y, this.w, this.h);
	}
}