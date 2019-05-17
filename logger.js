class Logger {
  constructor() {
      this._logs = [];
  }
  get logs(){
    const logs = [...this._logs];
    return logs;
  }
  log(message) {
    this.log('logging', message);
  }
  log(msg_type, message) {
    const timestamp = new Date().toISOString();
    this._logs=[...this._logs, { timestamp, msg_type, message }]
    console.log(`${timestamp} - ${msg_type} - ${message}`);
  }
  latest(){
    const last_log = Object.assign({},this._logs[this._logs.length-1]);
    return last_log;
  }
}
export default new Logger();