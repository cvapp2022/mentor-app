<template>
  <b-row class="border-bottom px-4 py-1">
    <b-col sm="9" class="p-0">
      <div>
        <div>{{ request.ReqServ.ServName }}</div>
        <div class="d-flex my-1">
          <div class="mx-1"><b-icon icon="person"></b-icon> {{request.ReqUser.BlFullName}}</div>
          <div class="mx-1"> <b-icon icon="clock" ></b-icon> {{request.createdAt}}</div>
        </div>
      </div>
    </b-col>
    <b-col sm="3" class="d-flex justify-content-center">
      {{ request.ReqState }}
      <b-button
        variant="primary"
        v-if="request.ReqState === 'searching'"
        @click="ApplyClicked(request._id)"
        >Apply</b-button
      >
      
      <router-link
        v-if="request.ReqState === 'applied' || request.ReqState === 'active'"
        :to="{ name: 'servRequestOne', params: { requestId: request._id } }"
        class="btn btn-primary"
        >show
      </router-link>
    </b-col>

  </b-row>

    <!-- <b-button v-if="request.ReqState === 'applied' || request.ReqState ==='active'" variant="primary" >show mentorship</b-button> -->
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["request"],
  methods:{
    ...mapActions(["applyServRequest"]),
    ApplyClicked(reqId) {
      this.applyServRequest(reqId);
    },
  },

};
</script>

<style>
</style>