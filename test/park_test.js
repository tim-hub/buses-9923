import { assert, expect } from 'chai';
import logger from '../logger';
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
      expect(logger.latest().msg_type, 'there should be an alert in logs').to.eq('alert');
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
      expect(the_park.buses.length).to.eq(width*length, 'car park is full now');
      expect(logger.latest().msg_type, 'it is just full').to.eq('logging');
      the_park.place(0,0,'NORTH');
      expect(logger.latest().msg_type, 'parking when full will fail and receive alert').to.eq('alert');
    });
  });
});

describe('Turning test', ()=>{
  before('Park 9 cars in the car park', ()=>{
    the_park.clear();
    for(let i=0;i<3;i++ ){
      for (let j=0;j<3; j++){
        // do the parking here
        the_park.place(i,j, 'NORTH');
      }
    }
  });
  context('Turn latest testing', ()=>{
    it('Turn the latest one left', ()=>{
      the_park.left();
      expect(the_park.getLatestBus().facing, 'the bus after turning left '+the_park.getLatestBus()).to.eq('WEST');
    });
    it('Turn the latest one left', ()=>{
      the_park.right();
      expect(the_park.getLatestBus().facing, 'the bus after turning right '+the_park.getLatestBus()).to.eq('NORTH');
    });
  });
  context('Turn the 2nd last one', ()=>{
    it('Turn the latest one left', ()=>{
      the_park.right(the_park.getCountOfBuses()-2);
      const getIt = () => {return the_park.buses[the_park.getCountOfBuses()-2]};
      expect(getIt().facing, 'the bus after turning right '+getIt()).to.eq('EAST');
    });
  });
});

describe('Clearing test', ()=>{
  the_park.clear();
  expect(the_park.buses.length).to.eq(0);
})

describe('Moving test', ()=>{
  before('Park a bus in the car park', ()=>{
    the_park.clear();
    the_park.place(2,2, 'NORTH');
  });
  context('Moving it towards the direction', ()=>{
    it('Move one step', ()=>{
      the_park.move();
      expect(the_park.getLatestBus().y).to.eq(3);
    });
    it('Move to the border of car park', ()=>{
      the_park.move();
      expect(the_park.getLatestBus().y).to.eq(4);
    })
    it('Try move out to the car park, but it still stays at the border', ()=>{
      the_park.move();
      expect(the_park.getLatestBus().y).to.eq(4);
    })
  });
})

