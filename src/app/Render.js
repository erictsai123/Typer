import React from 'react';

export default class Render extends React.Component {
    constructor(props) {
    super(props);
    this.hitKey = this.hitKey.bind(this);
    
  }
  componentDidMount(){
      document.getElementById('promptBox').focus()
  }
  hitKey(event) {
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
      <div className="textIO" id="promptBox" data-testid='promptbox' tabIndex="0" onKeyDown={this.hitKey}>
        <p>{this.props.data.update.arr.map((element,i)=>
            element.correctness ?
              <span data-testid={i+'-'+element.value.length+element.correctness} style={{color:"#55a356",fontWeights:"bold"}}>{element.value}</span> :
              <span data-testid={i+'-'+element.value.length+element.correctness} style={{background: "#a35555"}}>{element.correction}</span> )}
        <span id='pointer'>{this.props.data.update.prompt[this.props.data.update.index]}</span>
        <span>{this.props.data.update.prompt.slice(this.props.data.update.index+1)}</span>
        </p>
      </div>
    );
  }
}