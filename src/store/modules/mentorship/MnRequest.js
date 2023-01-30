import axios from "axios";

const state = {
    MnRequests: [],
    MnReqOne: {}
}


const getters = {
    MnRequests: state => state.MnRequests,
    MnReqOne: state => state.MnReqOne
}


const actions = {

    getMnRequests({ commit }) {

        //get mentor data 
        var url = process.env.VUE_APP_BASEURL + '/Mn/Request/mentor';
        axios.get(url).then((resp) => {
            if (resp.data.success) {

                //push mentorship requests 
                commit('MnRequests', resp.data.payload);
            }
        })

    },
    getMnRequestOne({ state, commit }, reqId) {

        var reqOne = state.MnRequests.find(item => item._id === reqId)

        commit('MnReqOne', reqOne)
    },

    applyMnRequest({ dispatch }, reqId) {

        var url = process.env.VUE_APP_BASEURL + '/Mn/Request/' + reqId + '/apply';
        axios.put(url).then((resp) => {
            if (resp.data.success) {

                //apply request 
                console.log(resp.data.payload)
                dispatch("getMnRequests")
            }
        })

    },

    sceduleMeet({ dispatch }, data) {

        var url = process.env.VUE_APP_BASEURL + '/Mn/Meet/' + data.MeetIdI;
        axios.put(url, data).then((resp) => {

            if (resp.data.success) {
                dispatch("getMnRequests")

            }
        })
    },
    socket_mentorAddedToProgram({ dispatch }) {
        //MENTOR_ADDED_TO_PROGRAM
        console.log('mentor addedd to prgram')
        dispatch('getMnRequests')

    },
    socket_mentorRemovedFromProgram({ dispatch }) {
        console.log('mentor removed from program')
        dispatch('getMnRequests')
    }

}

const mutations = {
    MnRequests: (state, MnRequests) => (state.MnRequests = MnRequests),
    MnReqOne: (state, ReqOne) => (state.ReqOne = ReqOne)
}



export default {
    state,
    getters,
    actions,
    mutations
}