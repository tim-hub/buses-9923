import { expect} from 'chai';
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
