import program from 'commander';
import {readCommands} from './io.js';
import logger from '../logger';

program.description('this is a CLI tool to read the file then run the bus parking commands');

program
  .command('read-from-file')
  .alias('r')
  .description('Read a file including commands, and give a standard output. (File Path Required)')
  .action(
    (file_path)=>{
      logger.log(file_path + ' read');
      readCommands(file_path);
    }
  );

program.parse(process.argv);
