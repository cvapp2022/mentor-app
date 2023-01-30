<template>
  <b-container>
    <b-row class="my-4">
      <b-col sm="10" class="page_title">
        <h2 class="font-weight-bolder">Your Payments</h2>
        <p class="text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
        </p>
      </b-col>
      <b-col sm="2">
        <b-button variant="primary" v-b-modal.withdraw-modal>Withdraw request</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="3">filters</b-col>
      <b-col sm="9">
        <b-list-group>
          <transaction v-for="transaction in Transactions" :key="transaction._id" :transaction="transaction"></transaction>
        </b-list-group>
      </b-col>
    </b-row>
    <b-modal id="withdraw-modal" hide-header hide-footer>
      <b-row>
        <b-col sm="12">
          <b-form @submit.prevent="WithdrawSubmit()">
            <b-form-group 
              id="input-group-method" 
              label="Payment method:" 
              label-for="method-input" 
            >
              <b-select
                id="method-input"
                v-model="form.withdrawMethodI"
                required
              >
                <option selected>Select Payment Method</option>
                <option value="PayPal" >Paypal</option>
                <option value="Syriatel Cash">Syriatel Cash</option>
                <option value="Mtn Cash">Mtn Cash</option>
              </b-select>              
            </b-form-group>
            <b-form-group
              id="input-group-target" 
              label="Payment target:" 
              label-for="target-input" 
            >
              <b-form-input 
                id="target-input" 
                type="text" 
                v-model="form.withdrawTargetI"
                placeholder="Enter Payment target ex: blax@blax.cc" 
                required
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-target" 
              label="Payment value:" 
              label-for="target-input"
              :description="'Maximum Amount is: '+this.ableToWithdraw" 
            >
              <b-form-input 
                id="target-input" 
                type="number"
                v-model="form.withdrawValueI"
                :min="this.minimumWithdrawAmount"
                :max="this.ableToWithdraw"
                :placeholder="'Enter Payment value ex: '+this.minimumWithdrawAmount " 
                required
              >
              </b-form-input>
            </b-form-group>
            <b-form-group>
                <b-button type="submit" variant="primary" block class="mt-3">Submit</b-button>
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>
    </b-modal>
  </b-container>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import transaction from '../../components/items/transaction.vue';
export default {
  components:{
    transaction
  },
  data(){
    return {
      form:{
        withdrawMethodI:"",
        withdrawTargetI:"",
        withdrawValueI:""
      }
    }
  },
  computed:{
    ...mapGetters(['Transactions','minimumWithdrawAmount','ableToWithdraw'])
  },
  methods:{
    ...mapActions(['saveWithdrawRequest']),
    WithdrawSubmit(){
    
      this.saveWithdrawRequest(this.form)
     

    }
  }
}
</script>

<style>

</style>