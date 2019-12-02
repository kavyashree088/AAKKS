import React,{Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class GraphLine  extends Component{
    // width={100}
    // height={50}

    constructor(props){

        super(props);
        this.state={
             chartData:{
                 labels:['A','B','C','D','E','F'], //tweets
                 datasets:[{
                     label:['Population'],
                     data:[
                         1,2,3,4,5,6,7,8,9,10,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,,  //views
                     ]
                 ,
                 backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    // 'rgba(54, 162, 235, 0.6)',
                    // 'rgba(255, 206, 86, 0.6)',
                    // 'rgba(75, 192, 192, 0.6)',
                    // 'rgba(153, 102, 255, 0.6)',
                    // 'rgba(255, 159, 64, 0.6)',
                    // 'rgba(255, 99, 132, 0.6)'
                 ]
                }
            ]
             }

        }
    }

    static defaultProps={
        displayTitle:true,
        displayLegend:true,
        legendPosition:'bottom'
    }
    render(){

        return(
            <div classname="chart" style={{width:700}}>
                <Line
                    height={400}
                    width={900}
                    data={this.state.chartData}
                    options={{
                       maintainAspectRatio:false,
                        title:{
                            display:this.props.displayTitle,
                            text:"PROFILES VIEWS/DAY",
                            fontSize:25
                        },
                        legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition,
                            labels:{
                                fontColor:'#000'
                            }
                        }, 
                        layout:{
                            padding:{
                                left:50,
                                right:0
                            }
                            
                        }
                    }}
                    
                    />

            </div>
        );
    }

}

export default GraphLine ;