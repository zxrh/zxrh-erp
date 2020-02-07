<template>
  <div id="potential_clients">
      意向客户
      <button @click="todd">下订单</button>
    </div>
</template>

<script>
export default {
  name: "potentialClients",
  data() {
    return {};
  },
  methods: {
      todd(){
          this.$router.push('/salesLead/placeOrder')
      }
  }
};
</script>

<style lang="less">
#potential_clients {
}
</style>

