<big><h1 align="center">adain-simple-event</h1></big>

<p align="center"><big>
Simple event dispatcher
</big></p>


## Install

```sh
npm i --save adain-simple-event
```

## Usage

```js
import adainSimpleEvent from "adain-simple-event"

const type = 'MyEvent';
let callback = function(data){
  console.log(data);  // {msg: 'HI'}
};
let eventId = SimpleEvent.register(type, callback);
SimpleEvent.dispatch(type, {msg: 'HI'});
SimpleEvent.unRegister(eventId);
```

## License

MIT © [SungYong Jang](http://github.com/ADAIN)

[npm-url]: https://npmjs.org/package/adain-simple-event
[npm-image]: https://img.shields.io/npm/v/adain-simple-event.svg?style=flat-square

[travis-url]: https://travis-ci.org/ADAIN/adain-simple-event
[travis-image]: https://img.shields.io/travis/ADAIN/adain-simple-event.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/ADAIN/adain-simple-event
[coveralls-image]: https://img.shields.io/coveralls/ADAIN/adain-simple-event.svg?style=flat-square

[depstat-url]: https://david-dm.org/ADAIN/adain-simple-event
[depstat-image]: https://david-dm.org/ADAIN/adain-simple-event.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/adain-simple-event.svg?style=flat-square
