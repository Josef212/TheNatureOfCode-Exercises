class Particle
{
    PVector _position, _velocity;
    color _debugColor;

    Particle(float x, float y)
    {
        _position = new PVector(x, y, 0);
        _velocity = new PVector(0, 0, 0);
        _debugColor = color(255, 0, 100);
    }

    Particle(float x, float y, float z)
    {
        _position = new PVector(x, y, z);
        _velocity = new PVector(0, 0, 0);
        _debugColor = color(255, 0, 100);
    }

    void SetPosition(float x, float y)
    {
        _position.set(x, y, 0);
    }

    void SetPosition(float x, float y, float z)
    {
        _position.set(x, y, z);
    }

    PVector GetPosition()
    {
        return _position.copy();
    }

    void SetVelocity(float x, float y)
    {
        _velocity.set(x, y, 0);
    }

    void SetVelocity(float x, float y, float z)
    {
        _velocity.set(x, y, z);
    }

    PVector GetVelocity()
    {
        return _velocity.copy();
    }

    void Update()
    {
        _position.add(_velocity);

        //ClampPosition();
        BounceOnBounds();
    }

    void DrawDebug()
    {
        stroke(0, 255, 0);
        strokeWeight(8);
        point(_position.x, _position.y);
    }

    void ClampPosition()
    {
        if(_position.x > width)
        {
            _position.x = 0;
        }
        else if(_position.y < 0)
        {
            _position.x = width;
        }
        if(_position.y > height)
        {
            _position.y = 0;
        }
        else if(_position.y < 0)
        {
            _position.y = height;
        }
        if(_position.z > width)
        {
            _position.z = 0;
        }
        else if(_position.z < 0)
        {
            _position.z = width;
        }
    }

    void BounceOnBounds()
    {
        if(_position.x < 0 || _position.x > width)
        {
            _velocity.x *= -1;
        }
        if(_position.y < 0 || _position.y > height)
        {
            _velocity.y *= -1;
        }
        if(_position.z < 0 || _position.z > width)
        {
            _velocity.z *= -1;
        }
    }
}
