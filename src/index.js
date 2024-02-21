export const SimpleEvent = {
  isDebug: false,
  warningCount: 5,
  items: new Map(),
  eventTypeWithIds: new Map(),
  counter: 0,
  dispatch(eventType, data){
    // skip register event type
    if(!SimpleEvent.items.has(eventType)){
      if(SimpleEvent.isDebug){
        console.debug(`SimpleEvent Unregistered EventType[${eventType}]. Skip`);
      }
      return;
    }

    if(SimpleEvent.isDebug){
      console.debug(`SimpleEvent dispatch EventType[${eventType}]`, data);
    }
    const eventTypeMap = SimpleEvent.items.get(eventType);
    if(eventTypeMap){
      eventTypeMap.forEach(function(item){
        if(item === undefined){
          return;
        }
        if(item.context){
          item.handler.call(item.context, data);
        }else{
          item.handler(data);
        }
      });
    }
  },
  register(eventType, handler, context){
    let id = SimpleEvent.counter++;
    if(!SimpleEvent.items.has(eventType)){
      SimpleEvent.items.set(eventType, new Map());
    }

    const eventTypeMap = SimpleEvent.items.get(eventType);
    if(eventTypeMap){
      eventTypeMap.set(id, {eventType, handler, context});
      SimpleEvent.eventTypeWithIds.set(id, eventType);

      if(
        SimpleEvent.isDebug &&
        eventTypeMap.size > SimpleEvent.warningCount
      ){
        console.warn(`SimpleEvent EventType[${eventType}] registered count is more than ${SimpleEvent.warningCount}[${eventTypeMap.size}]. Please check out!`);
      }

      if(SimpleEvent.isDebug){
        console.debug(`SimpleEvent registered EventType[${eventType}]`);
      }
    }

    return id;
  },
  unRegister(id){
    const eventTypeMap = SimpleEvent.items.get(SimpleEvent.eventTypeWithIds.get(id));
    eventTypeMap.delete(id);

    if(SimpleEvent.isDebug){
      console.debug(`SimpleEvent unregistered EventType[${SimpleEvent.eventTypeWithIds.get(id)}, ${id}]`);
    }
  },
  unRegisterWithArr(ids){
    const length = ids.length;
    for (let i = 0; i < length; i++) {
      SimpleEvent.unRegister(ids[i]);
    }
  }
};

export default SimpleEvent;
