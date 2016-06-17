import { Renderer } from 'soundworks/client';

const colorMap = [
  '#9CC5C7', // Blue
  '#74988A', // Grey/Blue
  '#27092E', // Purple
  '#54797A', // ?
  '#9CC5C7', // Blue
  '#6184ab'  // Muted Grey/Blue
];

export default class BackgroundRenderer extends Renderer {
  constructor() {
    super();
  }

  update(dt) {

  }
	
  render(ctx) {
  	ctx.save();
  	ctx.globalAlpha = this.opacity;
  	ctx.fillStyle = this.color;
  	ctx.rect(0, 0, this.canvasWidth, this.canvasHeight);
  	ctx.fill();
  	ctx.restore();
  }
  
  setOpacity(value) {
	this.opacity = value;
  }
  
  setColor(value) {
	  this.color = colorMap[value];
  }
  
  
}
