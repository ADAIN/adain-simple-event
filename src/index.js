import _ from 'lodash';

const SimpleEvent = {};
SimpleEvent.items = {};
SimpleEvent.eventTypeWithIds = {};
SimpleEvent.counter = 0;
SimpleEvent.dispatch = function(eventType, data){
  _.forEach(SimpleEvent.items[eventType], (item)=>{
    if(item === undefined){
      return;
    }
    if(item.context){
      item.handler.call(item.context, data);
    }else{
      item.handler(data);
    }
  });
};

SimpleEvent.register = function(eventType, handler, context){
  let id = SimpleEvent.counter++;
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
  _.each(ids, (id)=>{
    SimpleEvent.unRegister(id);
  });
};

export default SimpleEvent;
