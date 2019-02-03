<big><h1 align="center">adain-simple-event</h1></big>

<p align="center"><big>
Simple event dispatcher
</big></p>


## Install

```sh
npm install --save adain-simple-event
```

## Usage

```js
import SimpleEvent from "adain-simple-event";

const MY_EVENT_TYPE = 'MyEvent';
let callback = function(data){
  console.log(data);  // {msg: 'HI'}
};
let eventId = SimpleEvent.register(MY_EVENT_TYPE, callback);
SimpleEvent.dispatch(type, {msg: 'HI'});

// unregister
SimpleEvent.unRegister(eventId);

// register with context
eventId = SimpleEvent.register(MY_EVENT_TYPE, callback, this);

let eventIds = [];
eventIds.push(SimpleEvent.register(MY_EVENT_TYPE, callback));
eventIds.push(SimpleEvent.register(MY_EVENT_TYPE, callback));
eventIds.push(SimpleEvent.register(MY_EVENT_TYPE, callback));

// unregister with id array
SimpleEvent.unRegisterWithArr(eventIds);
eventIds = null;

```

## License

MIT © [ADAIN](http://github.com/ADAIN)
