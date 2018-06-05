function dragArea(x, y, w, h)
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.dragCoefitient = 0.1;

	this.Evaluate = function(mover)
	{
		if(mover.pos.x >= this.x && mover.pos.x <= this.x + this.w 
			&&	mover.pos.y >= this.y && mover.pos.y <= this.y + this.h)
		{
			return true;
		}

		return false;
	}

	this.GetDrag = function(mover)
	{
		// Apply drag
		let speed = mover.vel.mag();
		let dragMag = this.dragCoefitient * speed * speed;

		let drag = mover.vel.copy();
		drag.mult(-1);
		drag.normalize();
		drag.mult(dragMag);

		//mover.AddForce(drag);


		stroke(255, 255, 0);
		line(mover.pos.x, mover.pos.y, mover.pos.x + drag.x, mover.pos.y + drag.y);

		return drag;
	}

	this.Render = function()
	{
		noStroke();
		fill(255, 150);
		rect(this.x, this.y, this.w, this.h);
	}
}