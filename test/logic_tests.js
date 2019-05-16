import { assert } from 'chai';
import Bus from '../logic/bus'
import {the_park, width, length} from '../logic/park';

describe('Create a bus', () =>{
  context('initialize with 0,0, NORTH', ()=> {
    it('location should be 0,0 and face NORTH', ()=> {
      let bus = new Bus(0,0, 'NORTH');
      assert.isTrue(bus.x=== 0 && bus.y === 0, 'Bus at correct position');
      assert.equal(bus.facing, 'NORTH'), 'facing the right place';
    })
  })
});

describe('Get the initialised car park', ()=>{
  context('Get the one and only one park here', ()=>{
    it('width and length should be constant (5 by default)', ()=>{
      assert.equal(the_park.width, width);
      assert.equal(the_park.length, length)
    })
  })
})