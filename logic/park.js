import Bus from './bus'
import logger from './logger'
class Park{
  constructor(width, length){
    this.width = width;
    this.length = length;
    this.buses = [];
  }
  place(x,y, facing){
    if (this.buses.length > 25){
      // no place to park
      logger.log('alert', 'The park is already full, cannot be parked here.')

    }else if (this.buses.find((bus)=>{return bus.x==x && bus.y==y})){
      // already a bus parking here
      logger.log('alert', 'There is a bus already here, cannot be parked here.')
    }else{
      let bus = new Bus(x,y,facing,this);
      this.buses = [...this.buses, bus];
    }
  }
}

export const width = 5;
export const length = 5;
export const the_park =  new Park(width, length); // force singleton here, make sure park is one and only one.
