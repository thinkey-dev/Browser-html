<template>
  <el-header>
    <div class="header_pad">
      <span class="logo"></span>
      <div class="tab_select_1" style="display: inline-block;float: right;width: 80px">
        <el-dropdown trigger="click" style="position: relative;left: 20px">
          <span class="el-dropdown-link">
        {{language}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="language_switching('zh')">中文</el-dropdown-item>
            <el-dropdown-item @click.native="language_switching('en')">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="tab_select" style="display: inline-block;float: right">
        <span class="go_home" @click="go_home()">{{$t("header.header_home")}}</span>
        <span class="go_home" @click="go_dev()"
              style="font-size: 14px">{{$t("header.header_development_document")}}</span>

      </div>

    </div>

  </el-header>
</template>

<script>
  export default {
    name: "globalHeader",
    data() {
      return {
        language: ''
      }
    },
    methods: {
      language_switching(e) {
        this.$i18n.locale = e
        this.$store.dispatch('app/setLanguage', e)
      },
      language_is() {
        if (this.$i18n.locale === 'en') {
          this.language = 'English'
        } else {
          this.language = '中文'
        }
      },
      go_home() {
        this.$router.push({path: '/home'})
      },
      go_dev() {
        this.$router.push({path: '/download'})
      }
    },
    created() {
      this.language_is()
    },
    computed: {
      language_change() {
        return this.$i18n.locale;
      }
    },
    watch: {
      language_change(e) {
        this.language_is()
      }
    }
  }
</script>

<style scoped>
  .el-header {
    display: block;
    background-color: #F2F2F2;
    color: #333;
    height: 60px;
    padding: 0;
    line-height: 60px;
  }

  .logo {
    display: inline-block;
    width: 200px;
    height: 50px;
    position: relative;
    top: 8px;
    background: url("../assets/images/logo_1.png") no-repeat;
    background-size: 75%
  }

  .header_pad {
    padding: 0 80px;
  }

  .tab_select {
    display: inline-block;
    position: relative;
    float: right;
  }

  .go_home {
    cursor: pointer;
    color: #800080;
    margin-right: 20px;
    padding: 0 20px;
    user-select: none;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #800080;
    user-select: none;
  }
</style>
