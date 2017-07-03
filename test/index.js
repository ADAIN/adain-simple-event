import test from "tape";
import SimpleEvent from "../src";

test("SimpleEvent", (t) => {
  let callCount = 0;
  let id = SimpleEvent.register('TestEvent', (data)=>{
    t.equal(data.msg, 'NICE');
    callCount++;
  });
  t.equal(id, 0);
  
  let id2 = SimpleEvent.register('TestEvent', (data)=>{
    t.equal(data.msg, 'NICE');
    callCount++;
  });
  t.equal(id2, 1);
  
  SimpleEvent.dispatch('TestEvent', {msg: 'NICE'});
  t.equal(callCount, 2);
  
  
  let id3 = SimpleEvent.register('GoodEvent', (data)=>{
    t.equal(data, 'GOOD');
    callCount++;
  });
  
  t.equal(id3, 2);
  
  SimpleEvent.dispatch('GoodEvent', 'GOOD');
  t.equal(callCount, 3);
  
  SimpleEvent.unRegister(id);
  SimpleEvent.unRegister(id2);
  SimpleEvent.unRegister(id3);

  SimpleEvent.dispatch('TestEvent', {msg: 'NICE'});
  SimpleEvent.dispatch('GoodEvent', 'GOOD');
  t.equal(callCount, 3);
  
  t.end();
});
