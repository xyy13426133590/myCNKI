<template>
  <div class="container">
      <div class="left"></div>
      <div class="content" v-html="this.$route.query.content"></div>
      <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: "DocShow",
  data() {
    return {
    }
  },
  created(){
     let content = this.$route.query.content;
     content.trim().split('\n').forEach((v,i) =>{
         console.log(v)
     })
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
    display: flex;
    display: flexbox;
}

.left, .right {
    width: 100px;
}

.content {
    margin: 50px auto;
    flex: 1;
}

</style>

