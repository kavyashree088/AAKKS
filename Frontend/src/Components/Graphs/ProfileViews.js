import React,{Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios';
class ProfileViews extends Component{

    constructor(props){

        super(props);
        this.state={
             chartData:{}

        }
    }

    // componentDidMount(){

    //     var rooturl="localhost";
    //     axios.get('http://'+rooturl+':3001/fetchProfileViews')
    //     .then(response => {
    //     console.log("Status Code : ",response.status); 
    //     if(response.status === 200){
        
    //         console.log("Response data:", response.data);

    //     }
    //     const result=response.data;
    //     const likes=[];
    //     const ids=[]
    //     for(let i=0;i<result.length;i++){

    //         ids[i]=result[i]._id;
    //         likes[i]=result[i].likes;
    //     }
    //     console.log("likes:", likes);
    //     console.log("ids:", ids);
        
    //     const chartData1={
    //         labels:ids, //tweets
    //         datasets:[{
    //             label:['hello'],
    //             data:likes
    //         ,
    //         backgroundColor:[
    //            'rgba(255, 99, 132, 0.6)',
    //            'rgba(54, 162, 235, 0.6)',
    //            'rgba(255, 206, 86, 0.6)',
    //            'rgba(75, 192, 192, 0.6)',
    //            'rgba(153, 102, 255, 0.6)',
    //            'rgba(255, 159, 64, 0.6)',
    //            'rgba(105, 179, 64, 0.6)',
    //            'rgba(205, 159, 68, 0.6)',
    //            'rgba(200, 200, 64, 0.6)',
    //            'rgba(250, 200,185, 0.6)',
    //            // 'rgba(255, 99, 132, 0.6)'
    //         ]
    //        }
    //    ]
         
    //     }
    //     this.setState({
    //         chartData:chartData1
    //     })
    
    // });
    // }

    static defaultProps={
        displayTitle:true,
        displayLegend:true,
        legendPosition:'bottom'
    }
    render(){

        return(
            <div classname="chart" style={{width:500}}>
                <Doughnut
                    height={800}
                    width={900}
                    data={this.state.chartData}
                    options={{
                       maintainAspectRatio:false,
                        title:{
                            display:this.props.displayTitle,
                            text:"MY PROFILE VIEWS/DAY",
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

export default ProfileViews;