import axios from "axios"



const state = {
    totalAmount:0,
    ableToWithdraw:0,
    daysToWithdraw:0,
    minimumWithdrawAmount:0,
    Transactions: [],
    WithdrawRequests:[],
    // MentorToken: {},
}

const getters = {
    totalAmount:state => state.totalAmount,
    ableToWithdraw:state => state.ableToWithdraw,
    Transactions: state => state.Transactions,
    WithdrawRequests: state => state.WithdrawRequests,
    minimumWithdrawAmount:state => state.minimumWithdrawAmount
}

const actions = {

    saveWithdrawRequest({commit},data){
        console.log(data)
        var url=process.env.VUE_APP_BASEURL +'/Mentor/Withdraw';
        axios.post(url,data).then((resp)=>{

            if(resp.data.success){

                commit('AddWithdrawRequest',resp.data.payload)
            }

        })
    },
    socket_withdrawRequestApplied({commit},data){
        
        //push transaction
        commit('AddTransaction',data.transaction)
        //push withdraw request 
        commit('UpdateWithdrawRequestStatus',data.withdrawRequest)
    }
 }


const mutations = { 

    Transactions: (state, Transactions) =>{

        var totalAmount=0;
        var ableToWithdraw=0;
        if(Transactions.length > 0){
            Transactions.forEach(transaction => {
                if(transaction.transactionType==='add'){
                    totalAmount=totalAmount+transaction.transactionValue
                }
                else if(transaction.transactionType==='withdraw'){
                    totalAmount=totalAmount-transaction.transactionValue
                }
                if(state.daysToWithdraw === 0){
                    ableToWithdraw=totalAmount
                }
                else{
                    let transaction_date = new Date(transaction.createdAt).getTime();
                    let now = new Date().getTime();
                    let difference=now-transaction_date;
                    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                    if(transaction.transactionType==='add' && TotalDays > state.daysToWithdraw){
                        ableToWithdraw=ableToWithdraw+transaction.transactionValue
                    }
                    else if(transaction.transactionType==='withdraw'){
                        ableToWithdraw=ableToWithdraw-transaction.transactionValue
                    }
                }
            });
        }

        state.Transactions=Transactions;
        state.totalAmount=totalAmount;
        state.ableToWithdraw=ableToWithdraw;
    },
    AddTransaction:(state,transaction)=>{

        //push transaction 
        state.Transactions.push(transaction)

        //update totalAmount
        if(transaction.transactionType==='add'){
            state.totalAmount=state.totalAmount+transaction.transactionValue;
            //update AbleToWithdraw
            if(state.daysToWithdraw === 0){
                state.ableToWithdraw=state.ableToWithdraw+transaction.transactionValue
            }
        }
        else if(transaction.transactionType==='withdraw'){
            state.totalAmount=state.totalAmount-transaction.transactionValue;
            state.ableToWithdraw=state.ableToWithdraw-transaction.transactionValue
        }      

    },
    SetDaysToWithdraw:(state,daysToWithdraw)=>(state.daysToWithdraw=daysToWithdraw),
    SetMinimumWithdrawAmount:(state,minimumWithdrawAmount)=>(state.minimumWithdrawAmount=minimumWithdrawAmount),
    WithdrawRequests:(state,WithdrawRequests)=>(state.WithdrawRequests=WithdrawRequests),
    AddWithdrawRequest:(state,WithdrawRequest)=>{
        state.WithdrawRequests.push(WithdrawRequest)
    },
    UpdateWithdrawRequestStatus:(state,WithdrawRequest)=>{
        var withdrawIndex= state.WithdrawRequests.findIndex((obj => obj._id == WithdrawRequest._id))
        state.WithdrawRequests[withdrawIndex].withdrawReqStatus=WithdrawRequest.withdrawReqStatus;
    }

}


export default {
    state,
    getters,
    actions,
    mutations
}