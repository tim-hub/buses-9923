const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

class Bus{
  /**
   * The constructor of Bus
   * @param {number} [x] - [0 - 4], in x dimension
   * @param {number} [y] - [0 - 4], in y dimension
   * @param {string} [facing] - The facing direction default 'NORTH'
   */
  constructor(x=0,y=0,facing='NORTH'){
    this.x = x;
    this.y = y;
    this.setFacing(facing);
  }
  get facing(){
    return directions[this._facing];
  }
  set facing(face_to){
    this.setFacing(face_to);
  }

  /**
   * Set the bus facing direction
   * @param {string} face_to - the direction the bus is facing to
   */
  setFacing(face_to){
    if (typeof face_to === 'string' && directions.includes(face_to.toUpperCase())){
      this._facing = directions.indexOf(face_to.toUpperCase());
    }else{
      throw new TypeError('Error, the direction is not correct, bus cannot be initialized.');
    }
  }

  /**
   * Turn the bus right
   */
  turnRight(){
    if (this._facing===3){
      this._facing = 0;
    }else{
      this._facing++;
    }
  }

  /**
   * Turn the bus left
   */
  turnLeft(){
    if (this._facing===0){
      this._facing = 3;
    }else{
      this._facing--;
    }
  }

  toString(){
    return `(BUS - ${this.x}, ${this.y}) - ${directions[this._facing]}`
  }
}

export default Bus;