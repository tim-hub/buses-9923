import { expect, assert } from 'chai';
import Bus from '../logic/bus';
import { exec } from 'child_process';

describe('Create a bus', () =>{
  let bus = new Bus(0,0, 'NORTH');
  context('Initialize with 0,0, NORTH', ()=> {
    it('The bus should be 0,0 and face NORTH', ()=> {
      assert.isTrue(bus.x=== 0 && bus.y === 0, 'Bus at correct position, ' + bus.toString());
      assert.equal(bus.facing, 'NORTH'), 'facing the right place';
    });
  });
  context('Turning test.', ()=>{
    it('Turn right then turn left, it should face to NORTH.', ()=>{
      expect(bus.facing).to.eq('NORTH');
      bus.turnRight();
      expect(bus.facing, 'bus: '+bus).to.eq('EAST');
      bus.turnLeft();
      expect(bus.facing, 'bus: '+bus).to.eq('NORTH');
    });
    it('Turn right/left 4 times, it should be facing NORTH.', ()=>{
      expect(bus.facing).to.eq('NORTH');
      bus.turnRight();
      bus.turnRight();
      bus.turnRight();
      bus.turnRight();
      expect(bus.facing, 'bus: '+bus).to.eq('NORTH');
      bus.turnLeft();
      bus.turnLeft();
      bus.turnLeft();
      bus.turnLeft();
      expect(bus.facing, 'bus: '+bus).to.eq('NORTH');
    });
    it('The facing parameter can only be NORTH, EAST, WEST or SOUTH. (upper expected, both upper, lower are OK.)', ()=>{
      try{
        let newBus= new Bus(0,0,12);
      }
      catch(err){
        expect(err.toString()).to.includes('Error');
      }
      try{
        let newBus= new Bus(0,0,'d');
      }
      catch(err){
        expect(err.toString()).to.includes('Error');
      }

      let newBus= new Bus(0,0,'south');
      expect(newBus.facing, newBus.toString()).to.eq('SOUTH');
    });
  });
});