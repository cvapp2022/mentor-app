import axios from "axios";


const state = {
    cl: [],
    clOne: {}
}

const getters = {
    cl: state => state.cl,
    clOne: state => state.clOne
}


const actions = {
    getClOne({ commit }, clid) {
        var url = process.env.VUE_APP_BASEURL + '/Cl/' + clid;
        axios.get(url).then(resp => {
            if (resp.data.success) {
                commit('clOne', resp.data.payload)

                //router.push({ name: 'clOne' })
            }
        })
    },
    async addClToServRequest({commit},reqId){
        var url = process.env.VUE_APP_BASEURL + '/Service/Request/Cl/'+reqId;
        return axios.post(url, { ClNameI: 'untiteld' }).then(resp => {
            if (resp.data.success) {
                commit('updateReqCl', resp.data.payload.list)
                return resp.data.payload.item._id;
            }
        })
    },
    removeClFromServRequest({commit},data){
        var url = process.env.VUE_APP_BASEURL + '/Service/Request/Cl/'+data.reqId+'/'+data.clId;
        axios.delete(url).then(resp => {
            if (resp.data.success) {
                commit('updateReqCl', resp.data.payload.list)
            }
        })
    },
    updateCl({ commit }, data) {
        var url = process.env.VUE_APP_BASEURL + '/Cl/' + data.clid;
        axios.put(url, data.data).then(resp => {
            if (resp.data.success) {
                commit('clOne', resp.data.payload)

                //router.push({name:'clOne'})
            }
        })
    },
    setClTemplate(_,data){
        var url = process.env.VUE_APP_BASEURL + '/Cl/' + data.clId+'/setTemplate';
        axios.put(url,{TemplateIdI:data.templateId})
    },
    exportClToUser(_,data){

        var url = process.env.VUE_APP_BASEURL + '/Service/Request/Cl/'+data.reqId+'/'+data.clId+'/export';
        axios.get(url).then(function(resp){
            console.log(resp.data)
            if(resp.data.success){
                console.log('cv exported to user successfully')
            }

        })
    }
}

const mutations = {

    cl: (state, cl) => (state.cl = cl),
    clOne: (state, clOne) => (state.clOne = clOne)
}


export default {
    state,
    getters,
    actions,
    mutations
}