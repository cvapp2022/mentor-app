<template>
  <b-container>
    <b-row class="my-4">
      <b-col sm="4">
        <b-card no-body class="text-center">
          <div class="">Services</div>
          <div>2</div>
        </b-card>
      </b-col>
      <b-col sm="8">
        <b-card >
          <b-card-body class="row flex-row height-auto px-4 py-1">
            <b-col sm="3" class="d-flex flex-column align-items-center">
              <div>My Offers</div>
              <div class="">{{requestTotalCount}}</div>
            </b-col>
            <b-col sm="9">
              <b-row>
                <b-col sm="6">
                    <div class="">{{requestsWorkingCount}} Working At</div>
                    <b-progress height="10px" :value="requestsWorkingCount" :max="requestTotalCount"  variant="info" class="mb-3"></b-progress>
                </b-col>
                <b-col sm="6">
                    <div class="">{{requestsCompletedCount}} Completed</div>
                    <b-progress height="10px" :value="requestsCompletedCount" :max="requestTotalCount"  variant="primary" class="mb-3"></b-progress>
                </b-col>
              </b-row>
            </b-col>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="my-4">
      <b-col sm="4">
        <b-card no-body class="text-center">
          <div class="">Working At</div>
        </b-card>
      </b-col>
      <b-col sm="8">
        <b-card no-body class="container">
          <b-row>
            <b-col sm="12" v-for="item in ServRequests" v-bind:key="item._id">
              <servRequest :request="item" />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import { mapGetters,mapActions } from "vuex";
import servRequest from '../../components/items/servRequest.vue';
export default {
  components:{
    servRequest
  },
  data(){
    return {
        requestsWorkingCount:0,
        requestsCompletedCount:0,
        requestTotalCount: 0,
    }
  },
  computed: {
    ...mapGetters(["ServRequests", "Mentor"]),
  },
  methods:{
    ...mapActions(['getServRequests',"applyServRequest"]),
    RequestCountByState(state){
      if(this.ServRequests.length > 0){
        return this.ServRequests.filter((value)=>{ return value.ReqState===state}).length
      }
      return 0;
    },
    setCounters(){
      this.requestsWorkingCount=this.RequestCountByState('applied')
      this.requestsCompletedCount=this.RequestCountByState('completed')
      this.requestTotalCount=this.requestsWorkingCount+this.requestsCompletedCount;
    }
  },
  watch:{
    ServRequests(newVal){
      if(newVal.length > 0)
        this.setCounters()
    }
  },
  async mounted() {
    //get requests
    await this.getServRequests()
    this.setCounters()
  },
}
</script>

<style>

</style>