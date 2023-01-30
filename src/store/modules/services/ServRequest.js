import axios from "axios";
import _ from 'lodash'

const state = {
    ServRequests: [],
    ServReqOne: {}
}


const getters = {
    ServRequests: state => state.ServRequests,
    ServReqOne: state => state.ServReqOne
}


const actions = {

    getServRequests({ commit }) {

        //get mentor data 
        var url = process.env.VUE_APP_BASEURL + '/Service/Request/all/mentor';
        axios.get(url).then((resp) => {
            if (resp.data.success) {

                //push mentorship requests 
                commit('ServRequests', resp.data.payload);
            }
        })

    },
    getServRequestOne({ state, commit }, reqId) {

        var reqOne = state.ServRequests.find(item => item._id === reqId)
        commit('ServReqOne', reqOne)
    },
    applyServRequest({ dispatch }, reqId) {

        var url = process.env.VUE_APP_BASEURL + '/Service/Request/' + reqId + '/apply';
        axios.put(url).then((resp) => {
            if (resp.data.success) {

                //apply request 
                console.log(resp.data.payload)
                dispatch("getServRequests")
            }
        })
    },
    completeServRequest({commit,dispatch},data){
        var url = process.env.VUE_APP_BASEURL + '/Service/Request/' + data.reqId + '/complete';
        axios.put(url).then((resp) => {
            if (resp.data.success) {

                //finish request 
                dispatch("getServRequests")
                commit('AddTransaction',resp.data.payload.transaction)
            }
        })

    },
    saveReqMessage(_,data){
        var url = process.env.VUE_APP_BASEURL + '/Service/Request/Message/' + data.reqId;
        axios.post(url,data.data).then((resp) => {
            if (resp.data.success) {

                //push message to request 
                console.log(resp.data.payload)
    
            }
        })
    },


    socket_mentorAddedToService({ dispatch }) {
        //MENTOR_ADDED_TO_PROGRAM
        console.log('mentor addedd to service')
        dispatch('getServRequests')

    },
    socket_mentorRemovedFromService({ dispatch }) {
        console.log('mentor removed from service')
        dispatch('getServRequests')
    },
    socket_messageSent({commit},message){
        console.log('nessage',!_.isEmpty(state.ServReqOne))
        if(!_.isEmpty(state.ServReqOne))
            commit('servRequestMessageSent',message)
        commit('saveChatMessage',message)
    }

}

const mutations = {
    // SOCKET_REQUEST_MESSAGE_SENT:(state,message)=>{
    //     state.ServReqOne.ReqChat.ChatMessages.push(message)
    // },
    servRequestMessageSent:(state,message)=>{
        console.log('servReqMessageSEndt')
        state.ServReqOne.ReqChat.ChatMessages.push(message)  
    },
    ServRequests: (state, ServRequests) => (state.ServRequests = ServRequests),
    ServReqOne: (state, ServReqOne) => (state.ServReqOne = ServReqOne),
    updateReqCv:(state,newCvList)=>(state.ServReqOne.ReqCv=newCvList),
    updateReqCl:(state,newClList)=>(state.ServReqOne.ReqCl=newClList),
}



export default {
    state,
    getters,
    actions,
    mutations
}