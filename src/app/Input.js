import React from 'react'
import {Form} from 'react-bootstrap'
export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.hitKey = this.hitKey.bind(this);
  }
  hitKey(event) {
    console.log('1234',this.props.data.update.index)
    const ind = this.props.data.update.index
    if(event.keyCode >15 && event.keyCode <20){
      return
    }
    
    if(ind==0){
      this.props.enterStat('start')
    }
    
    if(event.keyCode == 8){
      if(ind==0){
        this.props.enterKey(0,'reset')
        return
      }
      this.props.enterStat('backtrackstat',[ind,this.props.data.update.arr[this.props.data.update.arr.length-1].correction.substr(-1),this.props.data.update.prompt[ind-1]])
      
      this.props.enterKey(event.key,"backtrack")
    }
    else
      {
        if(ind < this.props.data.update.prompt.length){
            this.props.enterKey(event.key,"enter key")
            if(ind == this.props.data.update.prompt.length-1){
                this.props.enterStat('end')
            }
        }
        else{
            return
        }
        
      }
    
    
    if(event.keyCode == 32 && this.props.data.update.prompt[ind]== String.fromCharCode(0x2423)){
      this.props.enterStat("space",1)
      this.props.enterStat("key",this.props.data.update.prompt[ind]== String.fromCharCode(0x2423))
      return
    }
    this.props.enterStat("key",this.props.data.update.prompt[ind]== event.key)
        
    
    
  }
  render() {
   
    return (
      <Form.Control placeholder='Start typing here' as='textarea' data-testid='inputBox' className="textIO" id="inputBox" rows="14" onKeyDown={this.hitKey} maxLength={this.props.data.update.prompt.length}></Form.Control>
    );
  }
}
//Render