import React from 'react';
export default class Reset extends React.Component
{
  constructor(props){
    super(props)
    this.reset = this.reset.bind(this)
    this.refresh = this.refresh.bind(this)
  }
  reset(event){
    this.props.enterKey(1,'reset')
    this.props.enterStat('reset')
    
  }
  refresh(event){
    this.props.enterKey(1,'refresh')
    this.props.enterStat('refresh')
    
  }
  
  render() {
    return(
    <div>
        <button id='resetButton' data-testid='resetButton' onClick={this.reset}>Reset</button>
        <button id='refreshButton' data-testid='refreshButton' onClick={this.refresh}>New Prompt</button>
    </div>
  )
  }
}
