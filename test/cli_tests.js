import { assert, expect } from 'chai';
import logger from '../logger';
import {readCommands} from '../cli/io';

describe('Read and run commands of 1st case', ()=>{
  context('Read all commands and run', ()=>{
    it('The result should be the same with the expected output', ()=>{
      const base_path = '../test/data/';
      const file_name = base_path+'input/case_1.bcmd';
      const output = base_path+'output/case_1.bout';

      readCommands(file_name, (r)=>{
        console.log(r[0]==='0,1,NORTH');
        assert.equal(r[0],'0,1,NORTH')
      });

    });
  });


})