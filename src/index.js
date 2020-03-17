export const SimpleEvent = {
  isDebug: false,
  warningCount: 5,
  items: {},
  eventTypeWithIds: {},
  counter: 0,
  dispatch(eventType, data){
    // skip register event type
    if(!SimpleEvent.items[eventType]){
      if(SimpleEvent.isDebug){
        console.debug(`SimpleEvent Unregistered EventType[${eventType}]. Skip`);
      }
      return;
    }

    if(SimpleEvent.isDebug){
      console.debug(`SimpleEvent dispatch EventType[${eventType}]`, data);
    }
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
  },
  register(eventType, handler, context){
    let id = SimpleEvent.counter++;
    if(!SimpleEvent.items[eventType]){
      SimpleEvent.items[eventType] = {};
    }

    SimpleEvent.items[eventType][id] = {eventType, handler, context};
    SimpleEvent.eventTypeWithIds[id] = eventType;

    if(
      SimpleEvent.isDebug &&
      Object.keys(SimpleEvent.items[eventType]).length > SimpleEvent.warningCount
    ){
      console.warn(`SimpleEvent EventType[${eventType}] registered count is more than ${SimpleEvent.warningCount}. Please check out!`);
    }

    if(SimpleEvent.isDebug){
      console.debug(`SimpleEvent registered EventType[${eventType}]`);
    }
    return id;
  },
  unRegister(id){
    delete SimpleEvent.items[SimpleEvent.eventTypeWithIds[id]][id];

    if(SimpleEvent.isDebug){
      console.debug(`SimpleEvent unregistered EventType[${SimpleEvent.eventTypeWithIds[id]}, ${id}]`);
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
