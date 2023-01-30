<template>
  <b-list-group-item class="py-3">
    <b-row>
      <b-col sm="2" class="d-flex text-center h4">
          <span v-if="transaction.transactionType==='add'" >+</span>
          <span v-if="transaction.transactionType==='withdraw'" >-</span>
          <div>
              ${{transaction.transactionValue}}
          </div>
      </b-col>
      <b-col sm="10" class="d-flex">
        <div class="d-flex flex-column" >
          <div class="h6">
            {{transaction.transactionDesc}}
          </div>
          <div class="d-flex align-items-center text-muted my-2">
            <b-icon icon="clock" class="mx-1"></b-icon>
            <div class="">{{transaction.createdAt}}</div>
          </div>
        </div>
      </b-col>
    </b-row>

  </b-list-group-item>
</template>

<script>
export default {

props:['transaction']

}
</script>

<style>

</style>