/* Colors
	Blue - #9CC5C7;
	Muted Green - #74983B;
	Grey / Blue - #74988A; 
	Muted Grey/Blue - #6184ab; 
	Purple - #27092E
	Black - #000;
	
	3 - Rain - #54797A
*/

import { Renderer } from 'soundworks/client';

const colorMap = [
  '#9CC5C7', '#74988A', '#27092E', '#54797A'
];

export default class BackgroundRenderer extends Renderer {
  constructor() {
    super();
    
    this.testValue = 0;
    this.operator = 'asc';
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
