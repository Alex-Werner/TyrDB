class Event {
  constructor(props){
    if(props.constructor.name === String.name){
      this.name = props;
      this.payload = {};
    }else{
      this.name = props.name;
      this.payload = (props.payload) ? props.payload : {};
    }
  }
  toJSON(){
    const {name, payload} = this;
    return {
      name,
      payload
    }
  }
};
module.exports = Event;
