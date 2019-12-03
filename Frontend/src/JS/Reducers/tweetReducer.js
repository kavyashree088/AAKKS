import {
  DASHBOARDTWEETS,
  CURRENTTWEET,
  BOOKMARKEDTWEETS,
  LISTTWEETS,
  SETPAGENUM,
  LIKESTWEETS,
  REPLIESTWEETS
} from "../Types/types";

const initialState = {
  dashboardTweets: [],
  currentTweet: "",
  listTweets: [],
  bookmarkedTweets: [],
  pageNum: 1,
  likestweets: [],
  repliestweets: []
};

export const tweetReducer = function(state = initialState, action) {
  switch (action.type) {
    case DASHBOARDTWEETS:
      return Object.assign({}, state, {
        dashboardTweets: action.payload
      });
    case CURRENTTWEET:
      return Object.assign({}, state, {
        currentTweet: action.payload
      });
    case LISTTWEETS:
      return Object.assign({}, state, {
        listTweets: action.payload
      });
    case BOOKMARKEDTWEETS:
      return Object.assign({}, state, {
        bookmarkedTweets: action.payload
      });
    case LIKESTWEETS:
      return Object.assign({}, state, {
        likestweets: action.payload
      });
    case REPLIESTWEETS:
      return Object.assign({}, state, {
        repliestweets: action.payload
      });
    case SETPAGENUM:
      return Object.assign({}, state, {
        pageNum: action.payload
      });
    default:
      return state;
  }
};
