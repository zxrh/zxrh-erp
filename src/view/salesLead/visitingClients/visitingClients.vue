<template>
  <div id="visiting_clients">拜访客户

    <button @click="todeil">详情</button>
  </div>
</template>

<script>
export default {
  name: "visitingClients",
  data() {
    return {};
  },
  methods: {
    todeil(){
      this.$router.push('/salesLead/visitingClientsDetail')
    }
  }
};
</script>

<style lang="less">
#visiting_clients {
}
</style>