const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

class Bus{
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
   * @param {string} face_to
   * the direction the bus is facing to
   */
  setFacing(face_to){
    if (typeof face_to === 'string' && directions.includes(face_to.toUpperCase())){
      this._facing = directions.indexOf(face_to.toUpperCase());
    }else{
      throw new TypeError('Error, the direction is not correct, bus cannot be initialised.');
    }
  }

  turnRight(){
    if (this._facing===3){
      this._facing = 0;
    }else{
      this._facing++;
    }
  }
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