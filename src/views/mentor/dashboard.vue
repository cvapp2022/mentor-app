<template>
  <b-container>
    <b-row class="my-4">
      <div class="page_title">
        <h2 class="font-weight-bolder">Your Dashboard</h2>
        <p class="text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          sapiente inventore autem, suscipit obcaecati ex laboriosam et
        </p>
      </div>
    </b-row>

    <b-row class="my-4">
      <b-col sm="4">
        <b-card no-body class="align-items-center">
          AhmadAl-ASwad
        </b-card>
      </b-col>
      <b-col sm="8">
        <router-link :to="{ name: 'mentorPayment' }" class="text-decoration-none">
          <b-card class="row flex-row height-auto text-center" no-body>
            <b-col sm="6">
              <div>Total Amountx</div>
              <div class="">$ {{totalAmount}}</div>
            </b-col>
            <b-col sm="6">
              <div>Able To Withdraw</div>
              <div class="">$ {{ableToWithdraw}}</div>
            </b-col>
          </b-card>
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters(["Mentor","totalAmount","ableToWithdraw","Transactions"]),
  },
  watch:{

  },
  mounted() {


    // this.$socket.client.emit('MENTOR_JOIN',this.Mentor)
  },
};
</script>

<style>
</style>