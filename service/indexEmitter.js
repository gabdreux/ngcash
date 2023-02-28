const logEvents = require('./middeleware/logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};
// initialize the object
const myEmitter = new Emitter();



// add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    myEmitter.emit('log', 'log event emitted!');
}, 2000);