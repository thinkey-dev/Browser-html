<template>
  <div class="home_con">
    <header-view></header-view>
    <el-main>
    <router-view></router-view>
    </el-main>
    <!--<footer-za></footer-za>-->
  </div>
</template>

<script>
  import HeaderView from '../../components/globalHeader'
  import FooterView from '../../components/globalFooter'

  export default {
    name: 'home',
    components: {HeaderView, FooterView,},
    data() {
      return {}
    }
  }
</script>
<style scoped>
  .el-main {
    color: #333;
    width: 100%;
    padding: 30px  5%;

  }
</style>
