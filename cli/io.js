import fs from 'fs';
import logger from '../logger';
import {thePark} from '../logic/park';

/**
 * The Regex for the proper PLACE command
 */
const placeReg = new RegExp('PLACE.[0-9](,)[0-9](,)(NORTH|WEST|EAST|SOUTH)');

/**
 * Return commands read from the file path
 * @param {string} filePath
 */
const runCommands = (filePath)=>{
  /**
   * Read the file line by line
   */
  const commands =  fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);

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
      thePark.place(x,y,facing);
    }else if(thePark.getLatestBus()=== null || thePark.getLatestBus()=== undefined){
      // this will ignore all commands before a proper PLACE
      logger.log('io', command+' is discarded, because valid PLACE command is not run yet.');
    }else if(command.toUpperCase() === 'LEFT'){
      // turn the bus left
      thePark.left();
    }else if(command.toUpperCase() === 'RIGHT'){
      // turn the bus right
      thePark.right();
    }else if(command.toUpperCase() === 'REPORT'){
      // report the bus current position
      logger.log('io', thePark.getLatestBus());
      outputs.push(thePark.getLatestBus().toString());
    }else if(command.toUpperCase() === 'MOVE'){
      // move the bus towards the current facing direction
      logger.log('io', 'Move the bus');
      thePark.move();
    }
  });
  if (outputs.length <= 0){
    logger.log('alert', `In ${filePath} there is no valid commands in it`);
  }
  return [...outputs];
}

/**
 * Read commands from the file
 * @param {string} theFile - A valid file path. In the file, commands are required to be separated by new line
 */
export const readCommands = (theFile)=>{
  /**
   * To check the file existence
   */
  if(fs.existsSync(theFile)){
    return runCommands(theFile);
  }else{
    logger.log('alert', `Error, ${theFile} does not exist`);
    return null;
  }
}