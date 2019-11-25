import {DASHBOARDTWEETS} from "../Types/types";

const initialState = {
    dashboardTweets : []
}

export const tweetReducer = function(state = initialState, action){
    switch(action.type){
        case DASHBOARDTWEETS:
            return Object.assign({}, state, {
                dashboardTweets : action.payload
            });
        default :
            return state;
    }
};