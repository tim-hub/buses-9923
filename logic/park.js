import Bus from './bus'
import logger from '../logger'

class Park{
  /**
   * The constructor of the car park
   * @param {number} width - The width of the car park
   * @param {number} length - The length of the car park
   */
  constructor(width, length){
    this.width = width;
    this.length = length;
    this._buses = [];
  }

  get buses(){
    return Object.assign([], this._buses);
  }
  set buses(buses){
    this._buses = buses;
  }

  /**
   * @return {number} Return the count of all buses
   */
  getCountOfBuses(){
    return this.buses.length;
  }
  /**
   *
   * @param {number} index - The index of the bus in the array
   * @return {Bus} Return a copy of last bus in the array
   */
  getBus(index){
    if (index<0){
      return null;
    }else{
      return this.buses[index];
    }
  }
  getLatestBus(){
    return this.getBus(this.getCountOfBuses()-1);
  }

  /**
   * Place a bus to a position (x,y)
   * @param {number} x - [0 - 4], in x dimension
   * @param {number} y - [0 - 4], in y dimension
   * @param {string} facing - The direction, where the bus will face
   */
  place(x,y, facing, index=this.getCountOfBuses()){
    if (this.getCountOfBuses() >= width*length){
      // no place to park
      logger.log('alert', `The park is already full, cannot be parked here - (${x}, ${y})`);
    }else if (x>=width || x <0 || y>=length || y<0){
      // outside of park
      logger.log('alert', `You cannot park to (${x}, ${y}) - outside of car park, you will get a ticket!!!`);
    }else if (this.buses.find((bus)=>{return bus.x==x && bus.y==y})){
      // already a bus parking here
      logger.log('alert', `There is a bus already here - (${x}, ${y}), cannot be parked here.`);
    }else{
      logger.log('logging', `Parked at (${x}, ${y})`)
      let bus = new Bus(x,y,facing);
      this.buses = Object.assign([], this.buses, { [index]: bus});
    }
  }
  /**
   * Turn a bus to right or left
   * @param {Bus} bus - The bus required to be turned
   * @param {number} index - The bus index in the list
   * @param {boolean} [right] - Turn right?
   */
  turn(index, right){
    const bus=this.getBus(index);
    if(right === true){
      bus.turnRight();
    }else{
      bus.turnLeft();
    }
    // set the buses list to new cloned one
    this.buses = Object.assign([], this.buses, { [index]: bus});
  }
  left(index=this.getCountOfBuses()-1){
    this.turn(index, false);
  }
  right(index=this.getCountOfBuses()-1){
    this.turn(index, true)
  }
/**
 * Move the bus (by default is the last bus)
 * @param {number} index - The index of the bus in buses array
 */
  move(index=this.getCountOfBuses()-1){
    const bus=this.getBus(index);
    let x = bus.x;
    let y = bus.y;
    const facing = bus.facing;
    if (facing === 'NORTH') y++;
    if (facing === 'SOUTH') y--;
    if (facing === 'EAST') x++;
    if (facing === 'WEST') x--;

    this.place(x,y,facing,index);

  }

  /**
   * Clear the whole car park.
   */
  clear(){
    this._buses = [];
  }

  toString(){
    return `Car Park ${this.width}x${this.length}: \n ${this.buses}`;
  }
}

export const width = 5;
export const length = 5;
export const the_park =  new Park(width, length); // force singleton here, make sure park is one and only one.
