import {DASHBOARDTWEETS, CURRENTTWEET} from "../Types/types";

const initialState = {
    dashboardTweets : [],
    currentTweet : ""
}

export const tweetReducer = function(state = initialState, action){
    switch(action.type){
        case DASHBOARDTWEETS:
            return Object.assign({}, state, {
                dashboardTweets : action.payload
            });
        case CURRENTTWEET :
            return Object.assign({}, state, {
                currentTweet : action.payload
            });
        default :
            return state;
    }
};