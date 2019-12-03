import React,{Component} from 'react';
import { Pie} from 'react-chartjs-2';
import axios from 'axios';

class GraphPie extends Component{
    // width={100}
    // height={50}

    constructor(props){

        super(props);
        this.state={
             chartData:{ }

        }
    }

    componentDidMount(){

        var rooturl="localhost";
        axios.get('http://'+rooturl+':3001/fetchRetweets')
        .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
        
            console.log("Response data:", response.data.graphData);

        }
        const result=response.data.graphData;
        const retweets=[];
        const usernames=[]
        for(let i=0;i<result.length;i++){

            usernames[i]=result[i].username;
            retweets[i]=result[i].length;
        }
        console.log("retweets:", retweets);
        console.log("usernames:", usernames);
        
        // console.log("this.state.labels",this.state.labels)
        // console.log("this.state.data",this.state.data)
        // this.state.chartData.labels=["5dd358f0c61c33580e0aed06", "5dd35926c61c33580e0aed09"];
        //  this.state.chartData.datasets[0].data=[600, 560 ];
        //  console.log("chart:", this.state.chartData);
        // //console.log("labels:",this.state.chartData.labels);
        // console.log("data:",this.state.chartData.datasets[0].data)
        
        const chartData1={
            labels:usernames, //tweets
            datasets:[{
                label:['retweets'],
                data:
                   retweets  //retweets no.
                
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
               // 'rgba(255, 99, 132, 0.6)'  use lato for the font family
            ],
            borderWidth:4,
            hoverBorderWidth:3,
            hoverBorderColor:"#000000"
           }
       ]
        }
        this.setState({
            chartData:chartData1
        })
    
    });
    }


    static defaultProps={
        displayTitle:true,
        displayLegend:true,
        legendPosition:'bottom'
    }
    render(){
        console.log('GraphPie')
        return(
            <div classname="chart" style={{width:700}}>
                <Pie
                    height={700}
                    width={900}
                    data={this.state.chartData}
                    options={{
                       maintainAspectRatio:false,
                        title:{
                            display:this.props.displayTitle,
                            text:"TOP 10 TWEETS WITH RETWEETS",
                            fontSize:25,
                            fontFamily:'lato'
                        },
                        legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition,
                            labels:{
                                fontColor:'#000'
                            }
                        }, 
                        layout:{
                            padding:{       //keep padding 50 directly for the smaller look
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

export default GraphPie;