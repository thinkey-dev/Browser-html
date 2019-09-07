<template>
  <div class="sbh_con">
    <div class="con_title" style="font-size: 17px">
      {{$t('table.contract')}}： <span style="color: #82848a;margin-left: 20px">{{all_data.contract}}</span>
    </div>
    <div class="con_title" style="font-size: 17px">
      {{$t('table.own_chain')}}：
      <span style="color: #82848a;margin-left: 20px" v-show="is_zh">{{chainid_change_zh(all_data.chainId)}}</span>
      <span style="color: #82848a;margin-left: 20px" v-show="!is_zh">{{chainid_change_en(all_data.chainId)}}</span>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-bottom: 30px;margin-top: 30px;min-height: 529px"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.transaction_hash')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose"
                @click="to_transaction_details(scope.row.chainId,scope.row.txType,scope.row.hash)">{{slice_hash(scope.row.hash)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" @click="to_block_details(scope.row.chainId,scope.row.height)">{{scope.row.height}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.timestamp')"
        align="center">
        <template slot-scope="scope">
          <span>{{timestampToTime(scope.row.timestamp)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.initiator')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" @click="to_address_details(all_data.chainId,all_data.from)">{{slice_hash(scope.row.from)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.receiver')"
        align="center">
        <template slot-scope="scope">
          <span>{{slice_hash(scope.row.to)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.transfer_amount')"
        align="center">
        <template slot-scope="scope">
          <span>{{scientificCounting(scope.row.value)}} TUE</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.transaction_fee')"
        align="center">
        <template slot-scope="scope">
          <span>{{scientificCounting(scope.row.txCost)}} TUE</span>
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
  import {
    getTxByContractAndChainId,

  } from '../api/interface'

  export default {
    name: "contractDetails",
    data() {
      return {
        search_transaction: '',
        tableData: [],
        loading: false,
        currentPage: 1,
        pagesize: 10,
        totla: 0,
        all_data: '',
        is_zh: true,
        chain_list: {},
      }
    },
    methods: {
      /*分页切换*/
      currentPageChange(e) {
        this.currentPage = e
        let data = {
          "chainId": this.all_data.chainId.toString(),
          "contract": this.all_data.contract,
          "page": this.currentPage,
          "pagesize": 10
        }
        this.$store.dispatch('app/setContractDetails', data).then(() => {
          getTxByContractAndChainId(data).then(response => {
            if (response.data.transactionsList.dataList.length == 0) {
              this.tableData = []
              this.totla = 0
            } else {
              this.all_data = this.$store.getters.contract_details
              this.tableData = response.data.transactionsList.dataList
              this.totla = response.data.transactionsList.total
            }

          })
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
      /*初始化获取数据*/
      initialize_data_acquisition() {
        let data = this.$store.getters.contract_details
        getTxByContractAndChainId(data).then(response => {
          if (response.data.transactionsList.dataList.length == 0) {
            this.tableData = []
            this.totla = 0
          } else {
            this.tableData = response.data.transactionsList.dataList
            this.totla = response.data.transactionsList.total
          }

        })
      },
      /*点击交易信息=>交易hash=>到达几种交易详情*/
      to_transaction_details(id, type, hash) {
        let data = {
          'page': 1,
          'chainId': id.toString(),
          'hash': hash,
          'pagesize': 5,
        }
        /*链内交易√*/
        if (type == 3) {
          this.$store.dispatch('app/setSearchTr1', data).then(() => {
            this.$router.push({path: '/intrachain_transfer'})
          })
        }
        /*合约交易*/
        else if (type == 2) {
          this.$store.dispatch('app/setSearchTr3', data).then(() => {
            this.$router.push({path: '/contract_transaction'})
          })
        }
        /*合约发布*/
        else if (type == 1) {
          this.$store.dispatch('app/setSearchTr4', data).then(() => {
            this.$router.push({path: '/contract_release'})
          })
        }
        /*跨链转账取款√*/
        else if (type == 4) {
          this.$store.dispatch('app/setSearchTr2', data).then(() => {
            this.$router.push({path: '/transfer_withdrawal'})
          })
        }
        /*跨链转账存款√*/
        else if (type == 5) {
          this.$store.dispatch('app/setSearchTr5', data).then(() => {
            this.$router.push({path: '/transfer_deposit'})
          })
        }
        /*跨链转账撤销√*/
        else if (type == 6) {
          this.$store.dispatch('app/setSearchTr6', data).then(() => {
            this.$router.push({path: '/transfer_cancellation'})
          })
        }


      },
      /*点击区块信息高度跳转*/
      to_block_details(e, q) {
        this.chain_list.zh_chain_arr.forEach((item, index) => {
          if (e == item.value) {
            if (item.is_have == true) {
              let data = {
                "height": q.toString(),
                "chainId": e.toString(),
                "pagesize": 10,
                "hash": '',
              }
              this.$store.dispatch('app/setCrosschainBlock', data).then(() => {
                this.$router.push({path: '/mainchain_blockdetails'})
              })
            }
            else {
              let data = {
                "height": q.toString(),
                "chainId": e.toString(),
                "pagesize": 10,
                "hash": '',
              }
              this.$store.dispatch('app/setCrosschainBlock_1', data).then(() => {
                this.$router.push({path: '/slicechain_blockdetails'})
              })
            }
          }
        })
      },
      /*点击转账人跳转到地址详情*/
      to_address_details(id, address) {
        let data = {"chainId": id.toString(), "address": address}
        this.$store.dispatch('app/setAddressDetails', data).then(() => {
          this.$router.push({path: '/address_details'})
        })
      },
    },
    created() {
      this.all_data = this.$store.getters.contract_details
      this.chain_list = this.getChainInfoStruct()
      if (this.$store.getters.language == 'zh') {
        this.is_zh = true
      } else {
        this.is_zh = false
      }
      this.initialize_data_acquisition()
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
        } else {
          this.is_zh = false
        }
      }
    }
  }
</script>

<style scoped>
  .el-pagination {
    position: relative;
    float: right;
    margin-right: 3%;
    margin-top: 30px;
  }

  .show_color_choose {
    color: #800080;
    cursor: pointer;
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
</style>
