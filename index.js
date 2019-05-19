import program from 'commander';
import path from 'path';
import {readCommands} from './cli/io';
import logger from './logger';


program.description('this is a CLI tool to read the file then run the bus parking commands');

program
  .command('read-from-file')
  .alias('r')
  .description('Read a file including commands, and give a standard output. (File Path Required)')
  .action(
    (file_path)=>{
      /**
       * Check the input whether it is a relative path or not
       */
      if (!path.isAbsolute(file_path)){
        file_path = path.join(__dirname, file_path);
      }
      const reports= readCommands(file_path);
      if (reports !== null && reports!==undefined && reports.length>=1) {
        console.log('Output: ');
        console.log(reports[reports.length-1]);
      } else {
        logger.log('alert', 'Please check your file '+file_path);
      }
    }
  );

program.parse(process.argv);
