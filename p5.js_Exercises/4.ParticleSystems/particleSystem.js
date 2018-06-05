class ParticleSystem
{
    constructor(x, y, initial = 100, pIniVelX = 0, pInitVelY = 0, pCAccX = 0, pCAccY = 0)
    {
        this.origin = createVector(x, y);
        this.particles = [];

        this.particlesVelocity = createVector(pIniVelX, pInitVelY);
        this.particlesConstantAcceleration = createVector(pCAccX, pCAccY);

        for(let i = 0; i < initial; ++i)
        {
            this.CreateParticle();
        }
    }

    // -----------------------------------------------------------------

    CreateParticle(x, y)
    {
        let ret;

        // TMP
        this.particlesVelocity.x = random(-1, 1);
        this.particlesVelocity.y = random(-2, 0);
        //------------------------------------------

        if(x !== undefined && y !== undefined)
        {
            this.particles.push(new Particle(x, y, 
                this.particlesVelocity.x, this.particlesVelocity.y, 
                this.particlesConstantAcceleration.x, this.particlesConstantAcceleration.y));
        }
        else
        {
            this.particles.push(new Particle(this.origin.x, this.origin.y, 
                this.particlesVelocity.x, this.particlesVelocity.y, 
                this.particlesConstantAcceleration.x, this.particlesConstantAcceleration.y));
        }

        return ret;
    }

    // -----------------------------------------------------------------

    Run()
    {
        let dead = 0;
        
        for(let p of this.particles)
        {
            p.Run();

            if(p.IsDead())
                ++dead;
        }

        this.particles = this.particles.filter(p => !p.IsDead());

        for(let i = 0; i < dead; ++i) this.CreateParticle();
    }

    // -----------------------------------------------------------------
}