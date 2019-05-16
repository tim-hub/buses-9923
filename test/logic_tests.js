import { assert, expect } from 'chai';
import logger from '../logic/logger';
import {the_park, width, length} from '../logic/park';


describe('Placing testing', ()=>{
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
      expect(logger.latest().msg_level, 'there should be an alser in logs').to.eq('alert');
    });
    it('Parking to 0,1 is OK', ()=>{
      the_park.place(0,1,'NORTH');
      expect(the_park.buses[1].x, 'should be 0').to.eq(0);
      expect(the_park.buses[1].y, 'should be 1').to.eq(1);
      expect(the_park.buses.length).to.eq(2);
    });
    it('Keep parking until full', ()=>{
      for(let i=0;i<width;i++ ){
        for (let j=0;j<length; j++){
          // do the parking here
          the_park.place(i,j, 'NORTH');
        }
      }
      expect(the_park.buses.length).to.eq(width*length, 'carpark is full now');
      expect(logger.latest().msg_level, 'it is just full').to.eq('logging');
      the_park.place(0,0,'NORTH');
      expect(logger.latest().msg_level, 'parking when full will fail and receive alert').to.eq('alert');
    });
  });
});