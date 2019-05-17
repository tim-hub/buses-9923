import Bus from './bus'
import logger from './logger'
class Park{
  constructor(width, length){
    this.width = width;
    this.length = length;
    this.buses = [];
  }
  place(x,y, facing){
    if (this.buses.length >= width*length){
      // no place to park
      logger.log('alert', 'The park is already full, cannot be parked here.');
    }else if (x>=width || x <0 || y>=length || y<0){
      // outside of park
      logger.log('alert', `You cannot park outside of car park, you will get a ticket!!! - (${x}, ${y}).`);
    }else if (this.buses.find((bus)=>{return bus.x==x && bus.y==y})){
      // already a bus parking here
      logger.log('alert', 'There is a bus already here, cannot be parked here.');
    }else{
      logger.log('logging', `Parked at (${x}, ${y})`)
      let bus = new Bus(x,y,facing,this);
      this.buses = [...this.buses, bus];
    }
  }
  move(){

  }
}

export const width = 5;
export const length = 5;
export const the_park =  new Park(width, length); // force singleton here, make sure park is one and only one.
