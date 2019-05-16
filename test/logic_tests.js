import { assert, expect } from 'chai';
import logger from '../logic/logger';
import {the_park, width, length} from '../logic/park';



describe('Parking testing', ()=>{
  before('Place a bus to 0,0', ()=>{
    the_park.place(0,0,'NORTH')
  });
  context('Test the instance is the correct one', ()=>{
    it('Width and length should be constant (5 by default)', ()=>{
      assert.equal(the_park.width, width);
      assert.equal(the_park.length, length);
    });
  });
  context('Parking testing', ()=>{
    it('Not successful if place a bus to 0,0', ()=>{
      the_park.place(0,0,'NORTH');
      expect(logger.logs[logger.logs.length-1].msg_level, 'there should be an alser in logs').to.eq('alert');
    });
    it('Parking to 0,1 is OK', ()=>{
      the_park.place(0,1,'NORTH');
      expect(the_park.buses.length).to.eq(2);
      expect(the_park.buses[1].x, 'should be 0').to.eq(0);
      expect(the_park.buses[1].y, 'should be 1').to.eq(1);
    });
  });
});