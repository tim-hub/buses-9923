import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import {readCommands} from '../cli/io';
import {the_park} from '../logic/park';


const input_dir = path.join(__dirname, '../test/data/input/');
const output_dir = path.join(__dirname, '../test/data/output/');
/**
 * Read the file line by line
 * @param {string} file_path - The expected results' file path
 */
const getOutput = (file_path)=>{return fs.readFileSync(file_path, 'utf-8').split(/\r?\n/);};

describe('Read commands in the input folder', ()=>{
  beforeEach('Clear the car park', ()=>{
    the_park.clear();
  });
  context('Read and run commands of 1st case', ()=>{
    it('The result should be the same with the expected output', ()=>{
      const input_file = input_dir+ 'case_1.bcmd';
      const output_file = output_dir + 'case_1.bout';
      readCommands(input_file, (r)=>{
        console.log(r[0]==='0,1,NORTH');
        expect(r).to.eql(getOutput(output_file));
      });
    });
  });
  context('Read all test cases, file by file', ()=>{
    fs.readdir(input_dir, (err, filenames)=>{
      if(err) throw err;
      filenames.forEach((name, i)=>{
        it(`Run commands in file ${i} - ${name}, output should be same with expected output file`, ()=>{
          readCommands(input_dir+name, (r)=>{
            expect(r).to.eql(getOutput(output_dir+name));
          });
        });
      });
    });
  });
});