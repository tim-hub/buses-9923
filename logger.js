class Logger {
  constructor(stdout=true, msg_types=['alert']) {
      this.msg_types = msg_types;
      this._logs = [];
      this._stdout = stdout;
  }
  get logs(){
    const logs = [...this._logs];
    return logs;
  }
  get stdout(){
    return this._stdout;
  }
  set stdout(stdout){
    this._stdout = stdout;
  }

  log(message) {
    this.log('logging', message);
  }
  log(msg_type, message) {
    const timestamp = new Date().toISOString();
    this._logs=[...this._logs, { timestamp, msg_type, message }]
    if (this.stdout && this.msg_types.includes(msg_type)){
      console.log(`${timestamp} - ${msg_type} - ${message}`);
    }
  }
  latest(){
    const last_log = Object.assign({},this._logs[this._logs.length-1]);
    return last_log;
  }
}
export default new Logger();