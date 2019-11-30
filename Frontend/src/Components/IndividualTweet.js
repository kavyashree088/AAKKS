import React, { Component } from "react";
import { Card, CardLink } from "reactstrap";
import TweetComponent from './TweetComponent';
import { connect } from 'react-redux';

class IndividualTweetInner extends Component{
    render(){
        if(!this.props.currentTweet){
            return <div></div>;
        } else {
            return(
                <div>
                    <TweetComponent tweet={this.props.currentTweet}/>
                    <Card>
                        <CardLink>Likes</CardLink>
                        <CardLink>Retweets</CardLink>
                    </Card>
                    <Replies/>
                </div>
            );
        }
    }
}

class Replies extends Component{
    render(){
        return(<div></div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        currentTweet : state.tweetReducer.currentTweet
    }
}
let IndividualTweet = connect(mapStateToProps, null)(IndividualTweetInner);
export default IndividualTweet;