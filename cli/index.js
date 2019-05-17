import program from 'commander';
import {readCommands} from './io.js';

program.description('this is a CLI tool to read the file then run the bus parking commands');

program
  .command('read-from-file')
  .alias('r')
  .description('Read a file including commands, and give a standard output. (File Path Required)')
  .action(
    (file_path)=>{
      // do some slandered output for the result
      console.log(file_path + ' read');
      readCommands(file_path);
    }
  );


program.parse(process.argv);
