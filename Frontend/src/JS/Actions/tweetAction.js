import {DASHBOARDTWEETS, CURRENTTWEET} from "../Types/types.js";
import axios from "axios";
import swal from 'sweetalert';

export const getDashboardTweets = (dataObj) => dispatch => {
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
            if(responseData.status){
                dispatch({
                    type: DASHBOARDTWEETS,
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