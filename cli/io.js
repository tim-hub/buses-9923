import fs from 'fs';
import path from 'path';
/**
 *
 * @param {string} the_file - The path of the input file(utf8), commands are required to be separated by new line
 */
export const readCommands = (the_file)=>{
  if (!path.isAbsolute(the_file)){
    the_file = path.join(__dirname, the_file);
  }
  fs.readFile(the_file, 'utf8', (err,content)=>{
    if (err) throw err;
    console.log(content);
  });
}