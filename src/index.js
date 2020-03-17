const SimpleEvent = {};
SimpleEvent.items = {};
SimpleEvent.eventTypeWithIds = {};
SimpleEvent.counter = 0;
SimpleEvent.dispatch = function(eventType, data){
  const keys = Object.keys(SimpleEvent.items[eventType]);
  const length = keys.length;
  let item;
  for (let i = 0; i < length; i++) {
    item = SimpleEvent.items[eventType][keys[i]];
    if(item === undefined){
      return;
    }
    if(item.context){
      item.handler.call(item.context, data);
    }else{
      item.handler(data);
    }
  }
};

SimpleEvent.register = function(eventType, handler, context){
  let id = SimpleEvent.counter++;
  if(SimpleEvent.keys.indexOf(eventType) === -1){
    SimpleEvent.keys.push(eventType);
  }

  if(!SimpleEvent.items[eventType]){
    SimpleEvent.items[eventType] = {};
  }

  SimpleEvent.items[eventType][id] = {eventType, handler, context};
  SimpleEvent.eventTypeWithIds[id] = eventType;
  return id;
};

SimpleEvent.unRegister = function(id){
  delete SimpleEvent.items[SimpleEvent.eventTypeWithIds[id]][id];
};

SimpleEvent.unRegisterWithArr = function(ids){
  const length = ids.length;
  for (let i = 0; i < length; i++) {
    SimpleEvent.unRegister(ids[i]);
  }
};

export default SimpleEvent;
