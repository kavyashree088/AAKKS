import {DASHBOARDTWEETS, CURRENTTWEET, SETPAGENUM} from "../Types/types";

const initialState = {
    dashboardTweets : [],
    currentTweet : "",
    pageNum : 1
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
        case SETPAGENUM :
            return Object.assign({}, state, {
                pageNum : action.payload
            });
        default :
            return state;
    }
};