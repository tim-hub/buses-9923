import fs from 'fs';
import path from 'path';
import logger from '../logger';
import {the_park} from '../logic/park';

/**
 * The Regex for the proper PLACE command
 */
const placeReg = new RegExp('PLACE.[0-9](,)[0-9](,)(NORTH|WEST|EAST|SOUTH)');

/**
 * Return commands read from the file path
 * @param {string} file_path
 */
const runCommands = (file_path)=>{
  /**
   * Read the file line by line
   */
  const commands =  fs.readFileSync(file_path, 'utf-8').split(/\r?\n/);

  const outputs = [];

  commands
  .filter(cmd=>cmd!=='')
  .map((command)=>{
    if(command.toUpperCase().search(placeReg)===0){
      // A valid PLACE command
      let [x,y,facing]= ((cmd)=>{
        return cmd.split(/[ ,]+/).filter(v=> v!=='PLACE');
      })(command.toUpperCase());
      logger.log('io', `${command} - Place to (${x},${y}) facing to ${facing}`)
      the_park.place(x,y,facing);
    }else if(the_park.getLatestBus()=== null || the_park.getLatestBus()=== undefined){
      // this will ignore all commands before a proper PLACE
      logger.log('io', command+' is discarded, because valid PLACE command is not run yet.');
    }else if(command.toUpperCase() === 'LEFT'){
      // turn the bus left
      the_park.left();
    }else if(command.toUpperCase() === 'RIGHT'){
      // turn the bus right
      the_park.right();
    }else if(command.toUpperCase() === 'REPORT'){
      // report the bus current position
      logger.log('io', the_park.getLatestBus());
      outputs.push(the_park.getLatestBus().toString());
      console.log(outputs[outputs.length-1]);
    }else if(command.toUpperCase() === 'MOVE'){
      // move the bus towards the current facing direction
      logger.log('io', 'Move the bus');
      the_park.move();
    }
  });
  return [...outputs];
}

/**
 * Read commands from the file
 * @param {string} the_file - The path of the file(utf8), commands are required to be separated by new line
 */
export const readCommands = (the_file)=>{
  /**
   * Check the input whether it is a relative path or not
   */
  if (!path.isAbsolute(the_file)){
    the_file = path.join(__dirname, the_file);
  }
  /**
   * To check the file existence
   */
  fs.access(the_file, fs.F_OK, (err) => {
    if (err) throw err;
    return runCommands(the_file);
  })
}