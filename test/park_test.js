import { assert, expect } from 'chai';
import logger from '../logger';
import {thePark, width, length} from '../logic/park';

describe('Clearing test', ()=>{
  context('Park a bus then clean all', ()=>{
    it('Car park should be empty after clear', ()=>{
      thePark.place(0,0,'NORTH')
      thePark.clear();
      expect(thePark.buses.length).to.eq(0);
    });
  });
})

describe('Placing testing', ()=>{
  before('Place a bus to 0,0', ()=>{
    thePark.clear();
    thePark.place(0,0,'NORTH')
  });
  context('Test the instance is the correct one', ()=>{
    it('Width and length should be constant (5 by default)', ()=>{
      assert.equal(thePark.width, width);
      assert.equal(thePark.length, length);
    });
  });
  context('Parking testing', ()=>{
    it('Not successful if place a bus to 0,0', ()=>{
      thePark.place(0,0,'NORTH');
      expect(logger.latest().msg_type, 'there should be an alert in logs').to.eq('alert');
    });
    it('Parking to 0,1 is OK', ()=>{
      thePark.place(0,1,'NORTH');
      expect(thePark.buses[1].x, 'should be 0').to.eq(0);
      expect(thePark.buses[1].y, 'should be 1').to.eq(1);
      expect(thePark.buses.length).to.eq(2);
    });
    it('Keep parking until full', ()=>{
      for(let i=0;i<width;i++ ){
        for (let j=0;j<length; j++){
          // do the parking here
          thePark.place(i,j, 'NORTH');
        }
      }
      expect(thePark.buses.length).to.eq(width*length, 'car park is full now');
      expect(logger.latest().msg_type, 'it is just full').to.eq('logging');
      thePark.place(0,0,'NORTH');
      expect(logger.latest().msg_type, 'parking when full will fail and receive alert').to.eq('alert');
    });
  });
});

describe('Turning test', ()=>{
  before('Park 9 cars in the car park', ()=>{
    thePark.clear();
    for(let i=0;i<3;i++ ){
      for (let j=0;j<3; j++){
        // do the parking here
        thePark.place(i,j, 'NORTH');
      }
    }
  });
  context('Turn latest testing', ()=>{
    it('Turn the latest one left', ()=>{
      thePark.left();
      expect(thePark.getLatestBus().facing, 'the bus after turning left '+thePark.getLatestBus()).to.eq('WEST');
    });
    it('Turn the latest one left', ()=>{
      thePark.right();
      expect(thePark.getLatestBus().facing, 'the bus after turning right '+thePark.getLatestBus()).to.eq('NORTH');
    });
  });
  context('Turn the 2nd last one', ()=>{
    it('Turn the latest one left', ()=>{
      thePark.right(thePark.getCountOfBuses()-2);
      const getIt = () => {return thePark.buses[thePark.getCountOfBuses()-2]};
      expect(getIt().facing, 'the bus after turning right '+getIt()).to.eq('EAST');
    });
  });
});



describe('Moving test', ()=>{
  before('Park a bus in the car park', ()=>{
    thePark.clear();
    thePark.place(2,2, 'NORTH');
  });
  context('Moving it towards the direction', ()=>{
    it('Move one step', ()=>{
      thePark.move();
      expect(thePark.getLatestBus().y).to.eq(3);
    });
    it('Move to the border of car park', ()=>{
      thePark.move();
      expect(thePark.getLatestBus().y).to.eq(4);
    })
    it('Try move out to the car park, but it still stays at the border', ()=>{
      thePark.move();
      expect(thePark.getLatestBus().y).to.eq(4);
    })
  });
})

