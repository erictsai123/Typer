import React from 'react'
import {
    XYPlot,
    VerticalBarSeries,
     XAxis, YAxis, HorizontalGridLines,ChartLabel
} from 'react-vis';

export default class KeySummary extends React.Component{
    constructor(props){
        super(props)
        this.summary = this.summary.bind(this)
        this.state = {width:0, height:330}
        this.handleResize = this.handleResize.bind(this)
    }
    
    componentDidMount() {
        this.setState(
            {width:document.getElementById('lessonContainer').clientWidth-20});
        window.addEventListener('resize',this.handleResize)
    }
    
    handleResize(){
        this.setState(
            {width:document.getElementById('lessonContainer').clientWidth-20})
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
        let dat = this.summary(this.props.data)
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
        
        return(
            dat[0].y ?
            <div id='KeySummary' ref='child' >
                <XYPlot
                    xType='ordinal'
                    width={this.state.width}
                    height={this.state.height}
                    yDomain={[0,dat[0].y ]}
                    margin={{left: 40,top:40}}
                    >
                    <HorizontalGridLines />
                        <VerticalBarSeries
                             data={dat.slice(0,10)}/>
                        <XAxis style={axisStyle}/>
                        <YAxis style={axisStyle} />
                </XYPlot>
            </div>
            : <div></div>
        )
    }
}