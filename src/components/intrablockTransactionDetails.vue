<template>
  <div class="ti_con">
    <div class="con_title">
    {{$t('title.trading_information')}}
  </div>
    <div class="con_title" style="font-size: 17px;padding-bottom: 0;margin-top: 10px">
      <span class=" " v-show="is_zh" >{{chainid_change_zh(all_data.chainId)+'>'+all_data.height}}</span>
      <span class=" " v-show="!is_zh">{{chainid_change_en(all_data.chainId)+'>'+all_data.height}}</span>
    </div>
    <!--交易信息列表-->
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-bottom: 30px;margin-top: 30px;min-height: 500px"
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
        :label="$t('table.own_chain')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" v-show="is_zh" @click="to_chain(scope.row.chainId)">{{chainid_change_zh(scope.row.chainId)}}</span>
          <span class="to_tr show_color_choose" v-show="!is_zh" @click="to_chain(scope.row.chainId)">{{chainid_change_en(scope.row.chainId)}}</span>
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
        :label="$t('table.transaction_type')"
        align="center">
        <template slot-scope="scope">
          <span v-show="is_zh">{{tr_change_zh(scope.row.txType)}}</span>
          <span v-show="!is_zh">{{tr_change_en(scope.row.txType)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.initiator')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose"
                @click="to_address_details(0,scope.row.chainId,scope.row.from,scope.row.txType)">{{slice_hash(scope.row.from)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.receiver')"
        align="center">
        <template slot-scope="scope">
          <span :class="scope.row.txType==1?'to_tr':'to_tr show_color_choose'"
                @click="to_address_details(1,scope.row.chainId,scope.row.to,scope.row.txType)">{{slice_hash(scope.row.to)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.transfer_amount')"
        align="center">
        <template slot-scope="scope">
          <span>{{scientificCounting(scope.row.value)}} TUE</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--:label="$t('table.transaction_fee')"-->
        <!--align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scientificCounting(scope.row.txCost)}} TUE</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
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
    getBlockNewTxPage,
  } from '../api/interface'

  export default {
    name: "intrablockTransactionDetails",
    data() {
      return {
        options: [],
        options1: [],
        chain_list: {},
        search_transaction: '',
        value: '',
        value1: '',
        tableData: [],
        is_zh: true,
        tr_zh: [
          {'name': '全部', 'value': ''},
          {'name': '合约发布', 'value': 1},
          {'name': '合约交易', 'value': 2},
          {'name': '链内交易', 'value': 3},
          {'name': '跨链转账取款', 'value': 4},
          {'name': '跨链转账存款', 'value': 5},
          {'name': '跨链转账撤销', 'value': 6},
        ],
        tr_en: [
          {'name': 'Contract release', 'value': 1},
          {'name': 'Contract transaction', 'value': 2},
          {'name': 'Intra-chain trading', 'value': 3},
          {'name': 'Cross-chain transfer withdrawal', 'value': 4},
          {'name': 'Cross-chain transfer deposit', 'value': 5},
          {'name': 'Cross-chain transfer cancellation', 'value': 6},
        ],
        loading: false,
        currentPage: 1, //初始页
        pagesize: 10,    //    每页的数据
        totla: 0,
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
      /*交易类型转换中文*/
      tr_change_zh(e) {
        let a = ''
        this.tr_zh.forEach((item, index) => {
          if (e == item.value) {
            a = item.name
          }
        })
        return a
      },
      /*交易类型转换英文*/
      tr_change_en(e) {
        let a = ''
        this.tr_en.forEach((item, index) => {
          if (e == item.value) {
            a = item.name
          }
        })
        return a
      },
      /*获取交易信息*/
      getBlockNewTxPage() {
        this.loading1 = true
        let data = this.all_data
        console.log(data)
        getBlockNewTxPage(data).then(response => {
          this.tableData = response.data.transactionsList.dataList
          this.loading1 = false
          this.totla = response.data.transactionsList.total
        })
      },
      /*page切换*/
      currentPageChange(e) {
        this.currentPage = e
        this.loading1 = true
        let data = {
          'page': this.currentPage,
          'chainId': this.all_data.chainId,
          "height":this.all_data.height,
          'hash': '',
          'pagesize': 10,
        }
        getBlockNewTxPage(data).then(response => {
          this.tableData = response.data.transactionsList.dataList
          this.loading1 = false
          this.totla = response.data.transactionsList.total
        })
      },
      /*根据hash查询=>跳转至地址详情界面*/
      search_hash() {
        if (this.search_transaction == '') {
          if (this.$store.getters.language == 'en') {
            this.$message.error('Query transaction details transaction hash/account address cannot be empty!');
          } else {
            this.$message.error('查询交易详情交易哈希不能为空！');
          }

        } else {
          let data = {
            'page': 1,
            'chainId': '',
            'hash': this.search_transaction,
            'pagesize': 5,
          }
          getBlockNewTxPage(data).then(response => {
            if (response.data.transactionsList.dataList.length == 0) {
              if (this.$store.getters.language == 'en') {
                this.$message.error('The current transaction details transaction hash/account address query result is empty, please check and enter again!');
              } else {
                this.$message.error('当前交易详情交易哈希查询结果为空，请检查后再次输入！');
              }
            } else {
              /*链内交易√*/
              if (response.data.transactionsList.dataList[0].txType == 3) {
                this.$store.dispatch('app/setSearchTr1', data).then(() => {
                  this.$router.push({path: '/intrachain_transfer'})
                })
              }
              /*合约交易*/
              else if (response.data.transactionsList.dataList[0].txType == 2) {
                this.$store.dispatch('app/setSearchTr3', data).then(() => {
                  this.$router.push({path: '/contract_transaction'})
                })
              }
              /*合约发布*/
              else if (response.data.transactionsList.dataList[0].txType == 1) {
                this.$store.dispatch('app/setSearchTr4', data).then(() => {
                  this.$router.push({path: '/contract_release'})
                })
              }
              /*跨链转账取款√*/
              else if (response.data.transactionsList.dataList[0].txType == 4) {
                this.$store.dispatch('app/setSearchTr2', data).then(() => {
                  this.$router.push({path: '/transfer_withdrawal'})
                })
              }
              /*跨链转账存款√*/
              else if (response.data.transactionsList.dataList[0].txType == 5) {
                this.$store.dispatch('app/setSearchTr5', data).then(() => {
                  this.$router.push({path: '/transfer_deposit'})
                })
              }
              /*跨链转账撤销√*/
              else if (response.data.transactionsList.dataList[0].txType == 6) {
                this.$store.dispatch('app/setSearchTr6', data).then(() => {
                  this.$router.push({path: '/transfer_cancellation'})
                })
              }
            }
          })
        }
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
      /*点击交易信息=>所属链=》未分片子链/分片链(只有未分片子链/分片链才有交易)*/
      to_chain(e) {
        let data = {"chainId": e.toString()}
        this.$store.dispatch('app/setUnfragmentedDetails', data).then(() => {
          this.$router.push({path: '/unfragmented_subchain'})
        })
      },
      /*点击交易信息地址查看*/
      to_address_details(peo, id, address, type) {
        if (peo == 0) {
          let data = {"chainId": id.toString(), "address": address}
          this.$store.dispatch('app/setAddressDetails', data).then(() => {
            this.$router.push({path: '/address_details'})
          })
        } else {
          if (type == 1) {

          } else if (type == 2) {
            let data = {"chainId": id.toString(), "contract": address}
            this.$store.dispatch('app/setContractDetails', data).then(() => {
              this.$router.push({path: '/contract_details'})
            })
          } else if (type == 3) {
            let data = {"chainId": id.toString(), "address": address}
            this.$store.dispatch('app/setAddressDetails', data).then(() => {
              this.$router.push({path: '/address_details'})
            })
          } else if (type == 4 || type == 5 || type == 6) {
            let data = {"chainId": id.toString(), "address": address}
            this.$store.dispatch('app/setCrossChainContract', data).then(() => {
              this.$router.push({path: '/crosschain_contract'})
            })
          }
        }

      },
    },
    created() {
      if (this.$store.getters.language == 'zh') {
        this.is_zh = true
      } else {
        this.is_zh = false
      }
      this.chain_list = this.getChainInfoStruct()
      this.all_data = this.$store.getters.wei_to_de
      this.getBlockNewTxPage()
      if (this.$store.getters.language === 'en') {
        this.options = this.chain_list.en_chain_arr
        this.options1 = this.tr_en
        this.is_zh = false
      } else {
        this.options = this.chain_list.zh_chain_arr
        this.options1 = this.tr_zh
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
          this.options1 = this.tr_zh
        } else {
          this.is_zh = false
          this.options = this.chain_list.en_chain_arr
          this.options1 = this.tr_en
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
