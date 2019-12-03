import {DASHBOARDTWEETS, CURRENTTWEET,BOOKMARKEDTWEETS,LISTTWEETS,SETPAGENUM} from "../Types/types.js";
import axios from "axios";
import swal from 'sweetalert';
const token= localStorage.getItem("token");

export const getListTweets = (dataObj) => dispatch => {
    let url = dataObj.url;
    let data = dataObj.data;
    axios.defaults.withCredentials = true;
    axios({
        method: 'post',
        url,        
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        headers: {"Authorization" : `Bearer ${token}`}
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            console.log( responseData)
            if(responseData.status){
                debugger;
                dispatch({
                    type: LISTTWEETS,
                    payload : responseData.message
                });
            }
        }).catch(function (err) {
            console.log(err)
        });
}
export const getBookmarkTweets = (dataObj) => dispatch => {
    let url = dataObj.url;
    let data = dataObj.data;
    axios.defaults.withCredentials = true;
    axios({
        method: 'post',
        url,        
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        headers: {"Authorization" : `Bearer ${token}`}
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            console.log( responseData)
            if(responseData.status){
                dispatch({
                    type: BOOKMARKEDTWEETS,
                    payload : responseData.message
                });
            }
        }).catch(function (err) {
            console.log(err)
        });
}



export const getDashboardTweets = (dataObj) => dispatch => {
    let url = dataObj.url;
    let data = dataObj.data;
    axios.defaults.withCredentials = true;
    let currPageNum = data.pageNum;
    axios({
        method: 'post',
        url,        
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        //headers: {"Authorization" : `Bearer ${token}`}
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            if(responseData.status){
                dispatch({
                    type: DASHBOARDTWEETS,
                    payload : responseData.message
                });
                dispatch({
                    type: SETPAGENUM,
                    payload : (currPageNum+1)
                });
            }
        }).catch(function (err) {
            console.log(err)
        });
}

export const getTweetDetails = (dataObj) => dispatch => {
    let url = dataObj.url;
    let data = dataObj.data;
    axios.defaults.withCredentials = true;
    //axios.get(url, {params: params}, )
    axios({
        method: 'post',
        url,        
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        //headers: {"Authorization" : `Bearer ${token}`}
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            //swal(responseData.message);
            //TODO Add like in local likes
            if(responseData.status){
                dispatch({
                    type: CURRENTTWEET,
                    payload : responseData.message
               });
            }
        }).catch(function (err) {
            console.log(err)
        });
}

export const likeATweet = (dataObj) => dispatch => {
    let url = dataObj.url;
    let data = dataObj.data;
    axios.defaults.withCredentials = true;
    axios({
        method: 'post',
        url,        
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        //headers: {"Authorization" : `Bearer ${token}`}
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            //swal(responseData.message);
            //TODO Add like in local likes
        }).catch(function (err) {
            console.log(err)
        });
}

export const unlikeATweet = (dataObj) => dispatch => {
    let url = dataObj.url;
    let data = dataObj.data;
    axios.defaults.withCredentials = true;
    axios({
        method: 'post',
        url,        
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        //headers: {"Authorization" : `Bearer ${token}`}
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            swal(responseData.message);
        }).catch(function (err) {
            console.log(err)
        });
}

export const bookmarkATweet = (dataObj) => dispatch => {
    let url = dataObj.url;
    let data = dataObj.data;
    axios.defaults.withCredentials = true;
    axios({
        method: 'post',
        url,        
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        //headers: {"Authorization" : `Bearer ${token}`}
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            //swal(responseData.message);
        }).catch(function (err) {
            console.log(err)
        });
}

export const unbookmarkATweet = (dataObj) => dispatch => {
    let url = dataObj.url;
    let data = dataObj.data;
    axios.defaults.withCredentials = true;
    axios({
        method: 'post',
        url,        
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        //headers: {"Authorization" : `Bearer ${token}`}
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            //swal(responseData.message);
        }).catch(function (err) {
            console.log(err)
        });
}

export const setCurrentTweet = (currentTweet) => dispatch => {
   dispatch({
        type: CURRENTTWEET,
        payload : currentTweet
   });
}

export const setCurrentPageNum = (pageNum) => dispatch => {
    dispatch({
        type: SETPAGENUM,
        payload : pageNum
   });
}
export const replyATweet = (dataObj) => dispatch => {
    let url = dataObj.url;
    let data = dataObj.data;
    axios.defaults.withCredentials = true;
    axios({
        method: 'post',
        url,        
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        //headers: {"Authorization" : `Bearer ${token}`}
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            //swal(responseData.message);
            //TODO: add reply in local replies
        }).catch(function (err) {
            console.log(err)
        });
}

export const retweetWithoutComment = (dataObj) => dispatch => {
    let url = dataObj.url;
    let data = dataObj.data;
    axios.defaults.withCredentials = true;
    axios({
        method: 'post',
        url,        
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        //headers: {"Authorization" : `Bearer ${token}`}
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            //swal(responseData.message);
            //TODO: add reply in local replies
        }).catch(function (err) {
            console.log(err)
        });
}

export const retweetWithComment = (dataObj) => dispatch => {
    let url = dataObj.url;
    let data = dataObj.data;
    axios.defaults.withCredentials = true;
    axios({
        method: 'post',
        url,        
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        //headers: {"Authorization" : `Bearer ${token}`}
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            //swal(responseData.message);
            //TODO: add reply in local replies
        }).catch(function (err) {
            console.log(err)
        });
}