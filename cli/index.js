import program from 'commander';

program.description('this is a CLI tool to read the file then run the bus parking commands');

program
  .command('read-from-file')
  .alias('r')
  .description('Read a file including commands, and give a standard output. (File Path Required)')
  .action(
    (file_path)=>{
      // do some stdard output for the result
      console.log(file_path + ' readed');

    }
  );


program.parse(process.argv);
