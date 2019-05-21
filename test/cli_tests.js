import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import {readCommands} from '../cli/io';
import {thePark} from '../logic/park';


const input_dir = path.join(__dirname, '../test/data/input/');
const output_dir = path.join(__dirname, '../test/data/output/');
/**
 * Read the file line by line
 * @param {string} file_path - The expected results' file path
 */
const getOutput = (file_path)=>{return fs.readFileSync(file_path, 'utf-8').split(/\r?\n/);};

describe('Read commands in the input folder', ()=>{
  beforeEach('Clear the car park', ()=>{
    thePark.clear();
  });
  context('Read and run commands of 1st case', ()=>{
    const input_file = input_dir+ 'case1.bcmd';
    const output_file = output_dir + 'case1.bout';
    it('The result should be the same with the expected output', ()=>{
      readCommands(input_file, (r)=>{
        expect(r).to.eql(getOutput(output_file));
      });
    });

  });
  context('Read all test cases, file by file', ()=>{
    fs.readdir(input_dir, (err, filenames)=>{
      if(err) throw err;
      filenames.forEach((name, i)=>{
        it(`Run commands in file ${i+1} - ${name}, output should be same with expected output file`, ()=>{
          thePark.clear();
          readCommands(input_dir+name, (r)=>{
            expect(r).to.eql(getOutput(output_dir+name.split('.')[0]+'.bout'));
          });
        });
      });
    });
  });
});