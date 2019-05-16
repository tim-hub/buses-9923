class Logger {
  constructor() {
      this.logs = [];
  }
  log(message) {
    this.log('logging', message)
  }
  log(msg_level, message) {
    const timestamp = new Date().toISOString();
    this.logs.push({ timestamp, msg_level, message });
    console.log(`${timestamp} - ${msg_level} - ${message}`);
  }
}
export default new Logger();