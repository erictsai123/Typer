import React from 'react';
import {Button, ProgressBar,Row,Col} from 'react-bootstrap'
import textGenerator from './textGenerator.js'
import Custom from '../homepage/Custom.js'

export default class Stats extends React.Component{
  constructor(props){
    super(props)
    this.wordPerMinute = this.wordPerMinute.bind(this)
    this.efficiency = this.efficiency.bind(this)
    this.reset = this.reset.bind(this)
    this.refresh = this.refresh.bind(this)
    this.progress = this.progress.bind(this)
    this.state = {toggle:false}
        this.setShow = this.setShow.bind(this)
        this.setClose = this.setClose.bind(this)
  }
  reset(event){
    this.props.enterKey(textGenerator(this.props.data.setPrompt),'reset')
    document.getElementById('promptBox').focus()

  }
  refresh(event){
    this.props.enterKey(textGenerator(this.props.data.setPrompt),'refresh')
    document.getElementById('promptBox').focus()

  }
  setShow(){
        this.setState({toggle:true})
    }
    setClose(){
        this.setState({toggle:false})
        setTimeout(()=> document.getElementById('promptBox').focus(), 300)

    }
  wordPerMinute(timestart,words){
    const sec = ((Date.now()-timestart)/1000)
    const word = words
    if(timestart==0){
      return ''
    }
    return Math.round(60*10*word/sec)/10
  }
  efficiency(counter,correct){
    if (counter ==0){
      return ''
    }
    return Math.round(10000*correct/counter)/100+'%'
  }
  progress(index, len){
      return Math.round(index*100/(len))
  }
  render(){
      const progress = this.progress(this.props.data.update.index,this.props.data.update.prompt.length)
    return(
    
      <div id='statsbox'>
      <Row>
      <Col>
      <div id='kpi'>
        <p >Words Per Minute: {this.wordPerMinute(this.props.data.statUpdater.timeStart,this.props.data.statUpdater.numSpace)}</p>
        <p data-testid='efficiencyid'>Efficiency: {this.efficiency(this.props.data.statUpdater.keyCounter,this.props.data.statUpdater.correctKey)}</p>
        </div>
      </Col>
      </Row>
      
      <div id='graphic area'>
          <Row>
            <Col>
                <div id='progressbarcontainer' >
                <ProgressBar now={progress} variant='dark' animated label={`${progress}%`} style={{width:'100%'}}/>
                </div>
            </Col>
            <Col xs='auto'>
                <Button id='resetButton' variant='outline-dark' className='btn'  data-testid='resetButton' onClick={this.reset}>Reset</Button>
             </Col>
            <Col xs='auto'>
                <Button id='refreshButton' variant='outline-dark' className='btn' data-testid='refreshButton' onClick={this.refresh}>New Prompt</Button>
            </Col>
            <Col xs='auto'>
                <Button id='settingButton' variant='outline-dark' className='btn' data-testid='settingButton' onClick={this.setShow}>Setting</Button>
            </Col>
            
          </Row>
        
           
        </div>

        <Custom state={this.state.toggle} setShow={this.setShow} setClose={this.setClose} />
       
      </div>
    )
  }
}