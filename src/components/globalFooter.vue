<template>
    <!--<div class="footer_pad">-->
      <!--<dl class="footer_con">-->
        <!--<dt>-->
          <!--THINKEY区块链浏览器是THINKEY官方的的区块链浏览器和分析平台-->
        <!--</dt>-->
        <!--<dd>-->
          <!--<ul>-->
            <!--<li>关于我们</li>-->
            <!--<li>关于我们</li>-->
            <!--<li>关于我们</li>-->
            <!--<li>关于我们</li>-->
          <!--</ul>-->
          <!--<ul>-->
            <!--<li>社交媒体</li>-->
            <!--<li>关于我们</li>-->
            <!--<li>关于我们</li>-->
            <!--<li>关于我们</li>-->
          <!--</ul>-->
        <!--</dd>-->
      <!--</dl>-->
    <!--</div>-->
</template>

<script>
  export default {
    name: "globalFooter"
  }
</script>

<style scoped>
  .footer_pad {
    /*position: fixed;*/
    /*bottom: 0;*/
    /*width: 100%;*/
    border-bottom: 0;
    background-color: #B3C0D1;
    color: #333;
    padding: 20px 80px;
  }
  .footer_con{
    display: flex;
  }
  .footer_con dt{
    font-size: 14px;
    width: 40%;
  }

  .footer_con dd {
    display: flex;
    width: 60%;
  }
  .footer_con dd ul {
    list-style: none;
    margin-left: 20%;
  }
</style>
