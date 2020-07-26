import React from 'react'
import {connect} from 'react-redux'
import {Row,Col,Container,Jumbotron, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {
    XYPlot,
    VerticalBarSeries,
     XAxis, YAxis, HorizontalGridLines
} from 'react-vis';

class KeySummary extends React.Component{
    constructor(props){
        super(props)
        this.summary = this.summary.bind(this)
        this.state = {width:0, height:250}
        this.handleResize = this.handleResize.bind(this)
    }
    
    componentDidMount() {
        this.setState(
            {width:document.getElementById('lessonContainer').clientWidth-20});
        window.addEventListener('resize',this.handleResize)
    }
    
    handleResize(){
        if(document.getElementById('lessonContainer')){
            this.setState(
            {width:document.getElementById('lessonContainer').clientWidth-20})
        }
        
    }
    
    summary(str){
        let dir = {}
        for(let  i = 0; i<str.length;i++){
            let k = str[i]
            if(dir[k]){
                dir[k] = dir[k]+1
            }
            else{
                dir[k] = 1
            }
        }
        dir[' '] = 0
         dir = Object.entries(dir)
        dir.sort((a,b)=>b[1]-a[1])
        return dir.map(x=>({x:x[0],y:x[1]}))
    }
    
    render(){
        console.log(this.props.stats)
        if(!this.props.stats.stats.ttlTime){
            return (<Jumbotron style={{background:'transparent'}}>
                <h1>No Statistics Available</h1>
                {this.props.stats.username ?
                    <p>Start typing to track your progress</p> :
                    <div>
                    <p>Make sure to sign in to view your Progress</p>
                    <Button  as={Link} to= '/account' variant='outline-dark' className='btn'>Sign In </Button>
                    </div>
                }
                
                </Jumbotron>)
        }
        let dat = this.summary(this.props.stats.stats.err)
        const axisStyle = {
        ticks: {
          fontSize: '14px',
          fill: 'white'
        },
        title: {
          fontSize: '16px',
          fill: 'white'
        }
      };
        let graph = this.props.stats.stats.err? <Row>
                    <XYPlot
                        xType='ordinal'
                        width={this.state.width}
                        height={this.state.height}
                        yDomain={[0,dat[0].y ]}
                        margin={{left: 40,top:10}}
                        >
                        <HorizontalGridLines />
                            <VerticalBarSeries
                                 data={dat.slice(0,10)}/>
                            <XAxis style={axisStyle}/>
                            <YAxis style={axisStyle} />
                    </XYPlot>
                </Row> :
                <p>No Typos so far!</p>
        return(
            <Container id='KeySummary' ref='child' >
                <Row>
                    <Col sm={3} >
                        <p>Total Minutes</p>
                        <h5>{this.props.stats.stats.ttlTime}</h5>
                    </Col>
                    <Col sm={3} >
                        <p>Total Words</p>
                        <h5>{this.props.stats.stats.ttlWord}</h5>
                    </Col>
                    <Col sm={3} >
                        <p> Avg. WPM</p>
                        <h5>{this.props.stats.stats.med_wpm}</h5>
                    </Col>
                    <Col sm={3} >
                        <p> Avg. Efficiency</p>
                        <h5>{this.props.stats.stats.med_eff}%</h5>
                    </Col>
                </Row>
                <h3 style={{'text-align':'left'}}>Frequent Typos:</h3>
                {graph}
            </Container>
        )
    }
}

export default connect(state=>({stats:state.accountRedux}))(KeySummary)