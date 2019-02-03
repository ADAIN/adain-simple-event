import test from "tape";
import SimpleEvent from "../src";

test("SimpleEvent register", (t) => {
  const testEvent = 'TestEvent';
  const goodEvent = 'GoodEvent';
  let callCount = 0;
  let id = SimpleEvent.register(testEvent, (data)=>{
    t.equal(data.msg, 'NICE');
    callCount++;
  });
  t.equal(id, 0);

  let id2 = SimpleEvent.register(testEvent, (data)=>{
    t.equal(data.msg, 'NICE');
    callCount++;
  });
  t.equal(id2, 1);

  SimpleEvent.dispatch(testEvent, {msg: 'NICE'});
  t.equal(callCount, 2);

  let id3 = SimpleEvent.register(goodEvent, (data)=>{
    t.equal(data, 'GOOD');
    callCount++;
  });

  t.equal(id3, 2);

  SimpleEvent.dispatch(goodEvent, 'GOOD');
  t.equal(callCount, 3);

  SimpleEvent.unRegister(id);
  SimpleEvent.unRegister(id2);
  SimpleEvent.unRegister(id3);

  SimpleEvent.dispatch(testEvent, {msg: 'NICE'});
  SimpleEvent.dispatch(goodEvent, 'GOOD');
  t.equal(callCount, 3);

  const last = SimpleEvent.register(goodEvent, (data)=>{
    t.equal(data, 'GOOD');
    callCount++;
  });
  SimpleEvent.dispatch(goodEvent, 'GOOD');
  t.equal(callCount, 4);

  SimpleEvent.unRegister(last);
  SimpleEvent.dispatch(goodEvent, 'GOOD');
  t.equal(callCount, 4);

  t.end();
});

test("SimpleEvent unRegisterWithArr", (t) => {
  const eventA = 'EventA';
  const eventB = 'EventB';
  let callCount = 0;
  function handler(data){
    callCount++;
    t.equal(data, 'HI');
  }
  let ids = [];
  ids.push(SimpleEvent.register(eventA, handler));
  ids.push(SimpleEvent.register(eventA, handler));
  ids.push(SimpleEvent.register(eventA, handler));
  ids.push(SimpleEvent.register(eventB, handler));
  ids.push(SimpleEvent.register(eventB, handler));
  ids.push(SimpleEvent.register(eventB, handler));

  SimpleEvent.dispatch(eventA, 'HI');
  t.equal(callCount, 3);
  SimpleEvent.dispatch(eventA, 'HI');
  t.equal(callCount, 6);
  SimpleEvent.dispatch(eventB, 'HI');
  t.equal(callCount, 9);
  SimpleEvent.dispatch(eventB, 'HI');
  t.equal(callCount, 12);

  const id = SimpleEvent.register(eventA, handler);
  SimpleEvent.dispatch(eventA, 'HI');
  t.equal(callCount, 16);
  SimpleEvent.unRegister(id);
  SimpleEvent.dispatch(eventA, 'HI');
  t.equal(callCount, 19);

  SimpleEvent.unRegisterWithArr(ids);
  SimpleEvent.dispatch(eventB, 'HI');
  SimpleEvent.dispatch(eventB, 'HI');
  t.equal(callCount, 19);

  t.end();
});

test("SimpleEvent context test", (t) => {
  const MY_EVENT = 'MY_EVENT';
  let callCount = 0;
  class MyClass{
    constructor() {
      this.name = 'MyClass Name';
    }

    init(){
      this.id = SimpleEvent.register(MY_EVENT, this.hi, this);
    }

    kill(){
      SimpleEvent.unRegister(this.id);
    }

    hi(){
      t.equal(this.name, 'MyClass Name');
      callCount++;
    }
  }

  const myClassInstance = new MyClass();
  const myClassInstance2 = new MyClass();
  myClassInstance.init();
  myClassInstance2.init();

  SimpleEvent.dispatch(MY_EVENT);
  t.equal(callCount, 2);
  myClassInstance2.kill();
  SimpleEvent.dispatch(MY_EVENT);
  t.equal(callCount, 3);
  myClassInstance.kill();
  SimpleEvent.dispatch(MY_EVENT);
  t.equal(callCount, 3);
  t.end();
});
