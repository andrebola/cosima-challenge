import { Renderer } from 'soundworks/client';
import { getScaler } from 'soundworks/utils/math';

const colorMap = [
  '#FFF', '#E4D1A3'
];

class Rain {
  constructor() {
	this.x = Math.random();
    this.y = Math.random();

    this.opacity = 0.75;
    this.color = '#fff';

    this.growthVelocity = 10; // pixels / sec
    this.minVelocity = 50; // if gain is < 0.25 => constant growth
    this.friction = -50; // pixels / sec

    this.setDuration(2);

    this.radius = 0;
    this.coordinates = {};
    this.isDead = false;
  }

  setDuration(time) {
    this.lifeTime = time;
    this.opacityScale = getScaler(this.lifeTime, 0, this.opacity, 0);
  }

  update(dt, w, h) {
    // update coordinates - screen orientation
    this.coordinates.x = this.x * w;
    this.coordinates.y = this.y * h;

    this.lifeTime -= dt;
    this.opacity = this.opacityScale(this.lifeTime);

    if (this.growthVelocity > this.minVelocity)
      this.growthVelocity += (this.friction * dt);

    this.radius += this.growthVelocity * dt;

    if (this.lifeTime < 0)
      this.isDead = true;
  }

  draw(ctx) {
    if (this.isDead)
      return;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.arc(this.coordinates.x, this.coordinates.y, Math.round(this.radius), 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

export default class RainDrops extends Renderer {
  constructor() {
    super();

    this.raindrops = [];
  }

  update(dt) {
    // update and remove dead circles
    for (let i = this.raindrops.length - 1; i >= 0; i--) {
      const rain = this.raindrops[i];
      rain.update(dt, this.canvasWidth, this.canvasHeight);

      if (rain.isDead)
        this.raindrops.splice(i, 1);
    }
  }
  
  trigger() {
	const rain = new Rain();
	this.raindrops.push(rain);
  }

  render(ctx) {
    for (var i = 0; i < this.raindrops.length; i++)
      this.raindrops[i].draw(ctx);
  }

  remove(id) {
    this.rain.forEach((rain) => {
      if (rain.id === id)
        rain.isDead = true;
    });
  }
  
}
