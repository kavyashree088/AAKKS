import React,{Component} from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
class GraphBar extends Component{

    constructor(props){

        super(props);
        this.state={
             chartData:{
                 labels:['1','2','3','4','5','6','7','8','9','10'], //tweets
                 datasets:[{
                     label:['Population'],
                     data:[
                         8000,2000,3000,4000,5000,6000,7000,4000,3000,5100  //views
                     ]
                 ,
                 backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(105, 179, 64, 0.6)',
                    'rgba(205, 159, 68, 0.6)',
                    'rgba(200, 200, 64, 0.6)',
                    'rgba(250, 200,185, 0.6)',
                    
                    // 'rgba(255, 99, 132, 0.6)'
                 ]
                }
            ]
             }

        }
    }

    // componentWillMount(){

    //     var rooturl="localhost";
    //     axios.post('http://'+rooturl+':3001/fetchlikes',data)
    //     .then(response => {
    //     console.log("Status Code : ",response.status);
    //     if(response.status === 200){
        
    //         console.log("Response data:", response.data);
           
    //         const bag=response.data;
    //         console.log("bag:",bag);
    //         this.setState(
    //             {bag}
    //         )
    //     }
    //     if(response.status === 202){
    //         console.log("in 202 create")
    //         this.setState({
    //             flag1 : true
    //         })
    //     }
    
    // });
    // }

    static defaultProps={
        displayTitle:true,
        displayLegend:true,
        legendPosition:'bottom'
    }
    render(){

        return(
            <div classname="chart" style={{width:600}}>
                <Bar
                    height={400}
                    width={900}
                    data={this.state.chartData}
                    options={{
                       maintainAspectRatio:false,
                        title:{
                            display:this.props.displayTitle,
                            text:"TOP 10 TWEETS WITH VIEWS",
                            fontSize:25,
                            fontFamily:"Lato"
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
                            
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                barPercentage: 0.5
                            }]
                        }
                    }}
                    
                    />

            </div>
        );
    }
}

export default GraphBar;    