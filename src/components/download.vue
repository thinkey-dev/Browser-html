<template>
  <div class="ti_con">
    <div class="con_title">
      {{$t('download.sdkdownload')}}
    </div>
    <el-table
      :data="all_data.SDK"
      border
      style="width: 100%;margin-bottom: 30px;margin-top: 30px"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('download.Software_package')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{scope.row.fileName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('download.version')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{scope.row.version}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('download.size')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{scope.row.fileSize}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('download.update_time')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{timestampToTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('download.document_description')"
        align="center">
        <template slot-scope="scope">
          <a style="text-decoration: none"
             :href=scope.row.previewUrl
             target="view_window" class="to_tr show_color_choose"> {{$t('download.view')}}</a>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('download.software_address')"
        align="center">
        <template slot-scope="scope">
          <a class="to_tr show_color_choose" style="text-decoration: none" :href=scope.row.downloadUrl
             download=""> {{$t('download._download')}}</a>
        </template>
      </el-table-column>
    </el-table>
    <div class="con_title">
      {{$t('download.apidownload')}}
    </div>
    <el-table
      :data="all_data.API"
      border
      style="width: 100%;margin-bottom: 30px;margin-top: 30px"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('download.Software_package')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{scope.row.fileName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('download.version')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{scope.row.version}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('download.size')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{scope.row.fileSize}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('download.update_time')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{timestampToTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('download.document_description')"
        align="center">
        <template slot-scope="scope">
          <a style="text-decoration: none"
             :href=scope.row.previewUrl
             target="view_window" class="to_tr show_color_choose">{{$t('download.view')}}</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getfile
  } from '../api/interface'

  export default {
    name: "download",
    data() {
      return {
        is_zh: true,
        all_data: '',
      }
    },
    methods: {
      /*chainid_转换中文*/
      chainid_change_zh(e) {
        let a = ''
        this.chain_list.zh_chain_arr.forEach((item, index) => {
          if (e == item.value) {
            a = item.label
          }
        })
        return a
      },
      /*chainid_转换英文*/
      chainid_change_en(e) {
        let a = ''
        this.chain_list.en_chain_arr.forEach((item, index) => {
          if (e == item.value) {
            a = item.label
          }
        })
        return a
      },
      /*获取初始化内容*/
      initialization_data(e) {
        let lan = {"locale": e}
        getfile(lan).then(response => {
          this.all_data = response.data
        })
      },
    },
    created() {
      if (this.$store.getters.language == 'zh') {
        this.is_zh = true
        this.initialization_data('zh-CN')
      } else {
        this.is_zh = false
        this.initialization_data('en-US')
      }

    },
    computed: {
      lang() {
        return this.$store.getters.language;
      }
    },
    watch: {
      lang(a, b) {
        if (a == 'zh') {
          this.is_zh = true
          this.initialization_data('zh-CN')
        } else {
          this.is_zh = false
          this.initialization_data('en-US')
        }
      }
    }
  }
</script>
<style>
  .ti_con .ti_search2_1 .ti_search2_1_input input {
    text-indent: 30px;
  }
</style>
<style scoped>
  .ti_filter {
    margin-top: 30px;
  }

  .el-pagination {
    position: relative;
    float: right;
    margin-right: 3%;
    margin-top: 30px;
  }

  .show_color {
    color: #800080;
  }

  .show_color_choose {
    color: #800080;
    cursor: pointer;
  }

  .ti_search2_1_input_icon {
    position: absolute;
    margin-left: 15px;
    margin-top: 10px;
    z-index: 1;
  }

  .ti_search2_1_input {
    display: flex;
    width: 70%;
  }

  .ti_search2_1 {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .ti_search1_2 {
    width: 650px;
    margin-left: 0px;
  }

  .ti_search1_1_top_title {
    line-height: 2.5;
    font-size: 16px;
  }

  .ti_search1_1_top {
    display: flex;
    justify-content: space-between;
  }

  .ti_con {
    width: 100%;
    margin-bottom: 180px;
  }

  .con_title {
    height: 25px;
    font-size: 18px;
    color: #800080;
    padding-bottom: 20px;
  }
</style>
