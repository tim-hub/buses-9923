import { assert } from 'chai';
import Bus from '../logic/core'

describe('Create a bus', () =>{
  context('initialize with 0,0, NORTH', ()=> {
    it('location should be 0,0 and face NORTH', ()=> {
      let bus = new Bus(0,0, 'NORTH');
      assert.isTrue(bus.x==0 && bus.y == 0, 'Bus at correct position');
      assert.isTrue(bus.face=='NORTH');
    })
  })
});