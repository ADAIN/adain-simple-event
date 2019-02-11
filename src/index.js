export const SimpleEvent = {};
SimpleEvent.items = new Map();
SimpleEvent.eventTypeWithIds = new Map();
SimpleEvent.counter = 0;
SimpleEvent.dispatch = function(eventType, data){
  if(SimpleEvent.items.has(eventType)){
    const eventTypeMap = SimpleEvent.items.get(eventType);
    eventTypeMap.forEach((item, key)=>{
      try{
        if(item.context){
          item.handler.call(item.context, data);
        }else{
          item.handler(data);
        }
      }catch(e){
        console.error(`SimpleEventError(type=${eventType}, key=${key})`, e);
      }
    });
  }
};

SimpleEvent.register = function(eventType, handler, context){
  const id = SimpleEvent.counter++;
  if(!SimpleEvent.items.has(eventType)){
    SimpleEvent.items.set(eventType, new Map());
  }

  const eventTypeMap = SimpleEvent.items.get(eventType);
  eventTypeMap.set(id, {eventType, handler, context});
  SimpleEvent.eventTypeWithIds.set(id, eventType);
  return id;
};

SimpleEvent.unRegister = function(id){
  const eventType = SimpleEvent.eventTypeWithIds.get(id);
  const listenerMap = SimpleEvent.items.get(eventType);
  if(!listenerMap){
    return;
  }
  if(listenerMap.has(id)){
    listenerMap.delete(id);
  }
  if(listenerMap.size === 0){
    SimpleEvent.items.delete(eventType);
  }
};

SimpleEvent.unRegisterWithArr = function(ids){
  ids.forEach((id)=>{
    SimpleEvent.unRegister(id);
  });
};

export default SimpleEvent;
