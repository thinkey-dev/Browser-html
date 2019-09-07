<template>
  <div class="sbh_con">
    <div class="con_title">
      {{$t('title.blockchain_details')}}
    </div>
    <div class="con_title" style="font-size: 17px">
      {{$t('table.block_height')}}：#{{$store.getters.home_search_height.height}}
    </div>
    <div class="sbh_filter" style="width: 550px ">
      <el-select v-model="value" :placeholder="$t('placeholder.choose')">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" style="float: right" @click="change_search_height(1)"> {{$t('placeholder.filter')}}
      </el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-bottom: 30px;margin-top: 30px"
      v-loading="loading"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.own_chain')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" v-show="is_zh" @click="to_chain(scope.row.chainId)">{{chainid_change_zh(scope.row.chainId)}}</span>
          <span class="to_tr show_color_choose" v-show="!is_zh" @click="to_chain(scope.row.chainId)">{{chainid_change_en(scope.row.chainId)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_hash')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" @click="to_block_details(scope.row.chainId,scope.row.height,scope.row.hash)">{{slice_hash(scope.row.hash)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.timestamp')"
        align="center">
        <template slot-scope="scope">
          <span  >{{timestampToTime(scope.row.timeTamp)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.trading_volume')"
        align="center">
        <template slot-scope="scope">
          <span >{{trading_volume_judgment(scope.row.chainId,scope.row.txcount)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.miner')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose"  >{{scope.row.miner}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="currentPageChange"
      :current-page="currentPage"
      :page-size="pagesize"
      layout="prev, pager, next"
      :total="totla">
    </el-pagination>
  </div>
</template>

<script>
  import {getBlockDataByPage} from '../api/interface'

  export default {
    name: "searchBlockheight",
    data() {
      return {
        options: [],
        value: '',
        tableData: [],
        value1: '',
        search_transaction: '',
        loading: false,
        currentPage: 1,
        pagesize: 10,
        totla: 0,
        chain_list: {},
      }
    },
    methods: {
      currentPageChange(e) {
        this.currentPage = e
        this.change_search_height(2)
      },
      /*区块详情查询*/
      block_details_query() {
        this.loading = true
        let data = this.$store.getters.home_search_height
        getBlockDataByPage(data).then(response => {
          this.totla = response.data.total
          this.loading = false
          this.tableData = response.data.dataList
        })

      },
      change_search_height(e) {
        let data
        this.loading = true
        if (e == 1) {
          data = {
            "height": this.$store.getters.home_search_height.height,
            "chainId": this.value.toString(),
            "page": 1,
            "pagesize": 10,
            "hash": this.search_transaction,
          }
        } else {
          data = {
            "height": this.$store.getters.home_search_height.height,
            "chainId": this.value.toString(),
            "page": this.currentPage,
            "pagesize": 10,
            "hash": this.search_transaction,
          }
        }
        getBlockDataByPage(data).then(response => {
          this.totla = response.data.total
          this.loading = false
          this.tableData = response.data.dataList
        })
      },
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
      /*链跳转*/
      to_chain(e) {
        if (e == 0) {
          this.$router.push({path: '/main_chain'})
        } else {
          this.chain_list.en_chain_arr.forEach((item, index) => {
            if (item.value == e) {
              if (item.is_have == true) {
                let data = {"chainId": e.toString()}
                this.$store.dispatch('app/setFragmentedDetails', data).then(() => {
                  this.$router.push({path: '/split_subchain'})
                })
              } else {
                let data = {"chainId": e.toString()}
                this.$store.dispatch('app/setUnfragmentedDetails', data).then(() => {
                  this.$router.push({path: '/unfragmented_subchain'})
                })
              }
            } else {

            }
          })
        }
      },
      /*点击区块信息=》区块hash=》进入区块详情*/
      to_block_details(id, height, hash) {
        let a = ''
        this.chain_list.zh_chain_arr.forEach((item, index) => {
          if (id == item.value) {
            a = item.is_have
          }
        })
        if (a == true) {
          let data = {
            "height": height.toString(),
            "chainId": id.toString(),
            "pagesize": 10,
            "hash": hash,
          }
          this.$store.dispatch('app/setCrosschainBlock', data).then(() => {
            this.$router.push({path: '/mainchain_blockdetails'})
          })
        } else {
          let data = {
            "height": height.toString(),
            "chainId": id.toString(),
            "pagesize": 10,
            "hash": hash,
          }
          this.$store.dispatch('app/setCrosschainBlock_1', data).then(() => {
            this.$router.push({path: '/slicechain_blockdetails'})
          })

        }

      },
      trading_volume_judgment(e,q) {
        let a=''
        this.chain_list.en_chain_arr.forEach((item, index) => {
          if (item.value == e) {
            if (item.is_have == true) {
              a='----'
            } else {
              a=q
            }
          } else {

          }
        })
        return a
      }
    },
    created() {
      this.chain_list = this.getChainInfoStruct()
      this.block_details_query()
      if (this.$store.getters.language === 'en') {
        this.options = this.chain_list.en_chain_arr
        this.is_zh = false
      } else {
        this.options = this.chain_list.zh_chain_arr
        this.is_zh = true
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
          this.options = this.chain_list.zh_chain_arr
        } else {
          this.options = this.chain_list.en_chain_arr
          this.is_zh = false
        }
      }
    }
  }
</script>
<style scoped>
  .sbh_filter {
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

  .sbh_search2_1_input_icon {
    position: absolute;
    margin-left: 15px;
    margin-top: 10px;
    z-index: 1;
  }

  .sbh_search2_1_input {
    display: flex;
    width: 60%;
  }

  .sbh_search2_1 {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .sbh_search1_2 {
    width: 550px;
    margin-left: 0px;
  }

  .sbh_search1_1_top_title {
    line-height: 2.5;
    font-size: 16px;
  }

  .sbh_search1_1_top {
    display: flex;
    justify-content: space-between;
  }

  .sbh_con {
    width: 100%;
    margin-bottom: 180px;
  }

  .con_title {
    height: 25px;
    font-size: 18px;
    color: #800080;
    padding-bottom: 20px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
</style>
