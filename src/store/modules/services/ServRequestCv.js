import axios from "axios";


const state = {
    cv: [],
    cvOne: {}
}

const getters = {
    cv: state => state.cv,
    cvOne: state => state.cvOne
}

const actions = {
    async addCvToServRequest({commit},reqId){
        var url = process.env.VUE_APP_BASEURL + '/Service/Request/Cv/'+reqId;
        return axios.post(url, { CvNameI: 'untiteld' }).then(resp => {

            if (resp.data.success) {
                commit('updateReqCv', resp.data.payload.list)
                return resp.data.payload.item._id;
            }
        })
    },
    removeCvFromServRequest({commit},data){
        var url = process.env.VUE_APP_BASEURL + '/Service/Request/Cv/'+data.reqId+'/'+data.cvId;
        axios.delete(url).then(resp => {

            if (resp.data.success) {

                commit('updateReqCv', resp.data.payload.list)
            }

        })
    },

    async updateCV(_,data){


        var url = process.env.VUE_APP_BASEURL + '/Cv/'+data.cvId;

        return  axios.put(url,data.data).then(resp=>{
            if(resp.data.success){
                //commit('profile',resp.data.payload.list)
                return resp.data.payload
            }
        })
    },
    getCvOne({ commit }, cvid) {


        var url = process.env.VUE_APP_BASEURL + '/Cv/' + cvid;
        axios.get(url).then(resp => {
            if (resp.data.success) {
                var data = resp.data.payload;
                var cvObj = {
                    cvName: data.CVName,
                    cvFullName:data.CVFullName,
                    cvProfile:data.CVProfile,
                    cvAddress:data.CVAddress,
                    cvPosition:data.CVPosition,
                    cvId: data._id,
                    cvImg: data.CVImg,
                    cvTemplate:data.CVTemplate,
                    cvSections: data.CvSections,
                    cvLang:data.CVLang
                }
                commit('cvOne', cvObj)
                commit('experiances', data.CVExp)
                commit('educations', data.CVEdu)
                commit('reffrences', data.CVReff)
                commit('contacts', data.CVContact)
                commit('projects', data.CVProj)
                commit('organizations', data.CVOrg)
                commit('awards', data.CVAw)
                commit('skills', data.CVSkill)
                //router.push({name:'cvOne'})
            }
        })
    },

    async setCvTemplate({commit},data){
   
        var url = process.env.VUE_APP_BASEURL + '/Cv/' + data.cvId+'/setTemplate';
        return axios.put(url,{TemplateIdI:data.templateId}).then(resp=>{
            if(resp.data.success){
                commit('cvOneSetTemplate',resp.data.payload.CVTemplate)
            }
        })
    },
    setCvLang({commit},data){
        var url = process.env.VUE_APP_BASEURL + '/Cv/' + data.cvId+'/setLang';
        axios.put(url,{LangI:data.lang}).then(resp=>{
            if(resp.data.success){
                commit('cvOneSetLang',resp.data.payload.CVLang)
            }
        })
    },
    changeSectionSort(_, data) {
        var url = process.env.VUE_APP_BASEURL + '/CV/' + data.cvId + '/changeSort';
        axios.put(url, { SortI: data.newSort })

    },
    addSection({ commit }, data) {

        var url = process.env.VUE_APP_BASEURL + '/CV/' + data.cvId + '/addSection';
        axios.put(url, { SectionNameI: data.section }).then(function (resp) {
            if (resp.data.success) {
                var cvOne = {
                    cvId: resp.data.payload._id,
                    cvImg: resp.data.payload.CVImg,
                    cvName: resp.data.payload.CVName,
                    cvSections: resp.data.payload.CvSections
                }
                commit('cvOne', cvOne)
            }
        })
    },
    removeSection({ commit }, data) {

        var url = process.env.VUE_APP_BASEURL + '/CV/' + data.cvId + '/removeSection';
        axios.put(url, { SectionNameI: data.section }).then(function (resp) {
            if (resp.data.success) {
                var cvOne = {
                    cvId: resp.data.payload._id,
                    cvImg: resp.data.payload.CVImg,
                    cvName: resp.data.payload.CVName,
                    cvSections: resp.data.payload.CvSections
                }
                commit('cvOne', cvOne)
            }
        })
    },
    exportCvToUser(_,data){

        var url = process.env.VUE_APP_BASEURL + '/Service/Request/Cv/'+data.reqId+'/'+data.cvId+'/export';
        axios.get(url).then(function(resp){
            console.log(resp.data)
            if(resp.data.success){
                console.log('cv exported to user successfully')
            }

        })
    }
}

const mutations = {
    cvOne: (state, cvOne) => (state.cvOne = cvOne),
    cvOneSetTemplate:(state,newTemplate)=>{
        state.cvOne.cvTemplate=newTemplate
    },
    cvOneSetLang:(state,newLang)=>{
        state.cvOne.cvLang=newLang
    },
}


export default {
    state,
    getters,
    actions,
    mutations
}