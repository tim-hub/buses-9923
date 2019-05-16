import { expect, assert } from 'chai';
import Bus from '../logic/bus'
/**
 * dummy is function which always return true.
 */
let dummy = () => {return true};

/**
 * This is a test case to test dummy function
 * Which is for making sure that test framework is well confugured.
 */
describe('#dummy()', () =>{
  context('anytime run it', ()=> {
    it('should always return true', ()=> {
      expect(dummy()).to.equal(true)
    })
  })
});

describe('Create a bus', () =>{
  context('initialize with 0,0, NORTH', ()=> {
    it('location should be 0,0 and face NORTH', ()=> {
      let bus = new Bus(0,0, 'NORTH');
      assert.isTrue(bus.x=== 0 && bus.y === 0, 'Bus at correct position');
      assert.equal(bus.facing, 'NORTH'), 'facing the right place';
    })
  })
});