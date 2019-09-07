<template>
  <div class="us_con">
    <div class="con_title">
      {{$t("title.blockchain_details")}}:
      <span class="to_tr color_choose" v-show="is_zh">{{chainid_change_zh(get_data.chainId)}}</span>
      <span class="to_tr color_choose" v-show="!is_zh">{{chainid_change_en(get_data.chainId)}}</span>
    </div>
    <div class="us_search">
      <div class="us_search1_2">
        <div class="us_search1_1_top">
          <div class="us_search1_1_top_title show_color"> {{$t("title.block_details_query")}}</div>
          <div>
          </div>
        </div>
        <div class="us_search2_1">
          <div class="us_search2_1_input">
            <span class="el-icon-search us_search2_1_input_icon"></span>
            <el-input v-model="search_height" @input="handinput()"
                      :placeholder="$t('placeholder.placeholder_3')"></el-input>
          </div>
          <el-button type="primary" class="us_search_submit" @click="block_height_query()"> {{$t("placeholder.search")}}
          </el-button>
        </div>
      </div>
    </div>
    <div class="con_title " style="margin-top:80px">
      {{$t("title.block_information")}}
    </div>
    <!--区块信息-->
    <el-table
      :data="all_block_data"
      border
      style="width: 100%;margin-bottom: 30px;min-height: 529px"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" @click="to_block_details(scope.row.chainId,scope.row.height)">{{scope.row.height}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_hash')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" @click="query_block_hash(scope.row.chainId,scope.row.height,scope.row.hash)">{{slice_hash(scope.row.hash)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.timestamp')"
        align="center">
        <template slot-scope="scope">
          <span>{{timestampToTime(scope.row.timeTamp)}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--:label="$t('table.number_of_committee_members')"-->
        <!--align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span class="to_tr show_color_choose" @click="to_block_chaincommittee(scope.row.chainId)">{{scope.row.chainIdCommitteeCount}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        :label="$t('table.trading_volume')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{scope.row.txcount}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--:label="$t('table.miner')"-->
        <!--align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span class="to_tr show_color_choose">{{ slice_hash(scope.row.miner)}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <el-button style="width: 100%;margin-bottom: 50px;margin-top: 20px" type="primary" @click="more_block_information()">
      {{$t("placeholder.view_all_blocks")}}
    </el-button>
    <div class="con_title " style="margin-top: 30px">
      {{$t("title.current_chain_transaction_information")}}
    </div>
    <!--交易信息-->
    <el-table
      :data="tr_data"
      border
      style="width: 100%;margin-bottom: 30px;min-height: 529px"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.transaction_hash')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" @click="to_transaction_details(scope.row.chainId,scope.row.txType,scope.row.hash)">{{slice_hash(scope.row.hash)}}</span>
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
          <span class="to_tr show_color_choose" @click="to_address_details(0,scope.row.chainId,scope.row.from,scope.row.txType)">{{slice_hash(scope.row.from)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.receiver')"
        align="center">
        <template slot-scope="scope">
          <span :class="scope.row.txType==1?'to_tr':'to_tr show_color_choose'" @click="to_address_details(1,scope.row.chainId,scope.row.to,scope.row.txType)">{{slice_hash(scope.row.to)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.transfer_amount')"
        align="center">
        <template slot-scope="scope">
          <span> {{scientificCounting(scope.row.value)}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--:label="$t('table.transaction_fee')"-->
        <!--align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scientificCounting(scope.row.txCost)}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <el-button style="width: 100%;margin-bottom: 50px;margin-top: 20px" type="primary" @click="more_transaction_information()">
      {{$t("placeholder.view_all_tr")}}
    </el-button>
  </div>
</template>

<script>
  import {
    getBlockNewTxPage,
    getBlockDataByPage,
  } from '../api/interface'

  export default {
    name: "unfragmentedSubchain",
    data() {
      return {
        search_height: '',
        tableData: [],
        chain_data: '',
        chainStatA: [],
        tr_data: [],
        loading: false,
        loading1: false,
        loading2: false,
        loading3: false,
        chain_list: {},
        is_zh: true,
        tr_zh: [
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
        all_block_data: [],
        get_data: '',
        set_sta:'',
      }
    },
    methods: {
      /*只能输入数字/字母*/
      handinput() {
        if (/[^\d]/.test(this.search_height)) {
          this.search_height = this.search_height.replace(/[\u0391-\uFFE5]/g, '');
        }
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
      /*获取区块详情*/
      go_search_height() {
        this.loading2 = true
        let data = {
          "height": '',
          "chainId": this.get_data.chainId.toString(),
          "page": 1,
          "pagesize": 10,
          "hash": '',
        }
        getBlockDataByPage(data).then(response => {
          this.loading2 = false
          if (response.data.dataList.length == 0) {
            this.all_block_data = []

          } else {
            this.all_block_data = response.data.dataList
          }
        })

      },
      /*获取交易信息*/
      getBlockNewTxPage() {
        this.loading1 = true
        let data = {
          'page': 1,
          "chainId": this.get_data.chainId.toString(),
          // "chainId": '',
          'hash': '',
          'pagesize': 10,
        }
        getBlockNewTxPage(data).then(response => {
          this.tr_data = response.data.transactionsList.dataList
          this.loading1 = false
        })
      },
      /*区块高度查询*/
      block_height_query() {
        if (this.search_height == '') {
          if (this.$store.getters.language == 'en') {
            this.$message.error('Query block height/block hash cannot be empty!');
          } else {
            this.$message.error('查询区块高度/区块哈希不能为空！');
          }

        } else {
          let reg = /[a-z]/i
          let data
          if (reg.test(this.search_height) == true) {
            data = {
              "height": '',
              "chainId": this.get_data.chainId.toString(),
              "page": 1,
              "pagesize": 10,
              "hash": this.search_height,
            }
          } else {
            data = {
              "height": this.search_height.toString(),
              "chainId": this.get_data.chainId.toString(),
              "page": 1,
              "pagesize": 10,
              "hash": '',
            }
          }
          getBlockDataByPage(data).then(response => {
            if (response.data.dataList.length == 0) {
              if (this.$store.getters.language == 'en') {
                this.$message.error('The current block height/block hash query result is empty, please check and enter again!');
              } else {
                this.$message.error('当前区块高度/区块哈希查询结果为空，请检查后再次输入！');
              }

            } else {
              this.$store.dispatch('app/setCrosschainBlock_1', data).then(() => {
                this.$router.push({path: '/slicechain_blockdetails'})
              })
            }
          })
        }
      },
      /*查看更多区块信息*/
      more_block_information() {
        let data = {
          "height": '',
          "chainId": this.get_data.chainId.toString(),
          "page": 1,
          "pagesize": 10,
          "hash": '',
        }
        this.$store.dispatch('app/setUnmainChainblock', data).then(() => {
          this.$router.push({path: '/slice_subblock'})
        })

      },
      /*点击区块信息高度跳转*/
      to_block_details(e, q) {
        let data = {
          "height": q.toString(),
          "chainId": e.toString(),
          "pagesize": 10,
          "hash": '',
        }
        this.$store.dispatch('app/setCrosschainBlock_1', data).then(() => {
          this.$router.push({path: '/slicechain_blockdetails'})
        })

      },
      /*查看更多交易信息*/
      more_transaction_information() {
        let data = {
          "chainId": this.get_data.chainId.toString(),
          "page": 1,
          "hash": "",
          "pagesize": 10
        }
        this.$store.dispatch('app/setMainChaintotr', data).then(() => {
          this.$router.push({path: '/trading_information'})
        })
      },
      /*点击区块信息=》区块hash=》进入区块详情*/
      query_block_hash(id, height, hash) {
        let data = {
          "height": height.toString(),
          "chainId": id.toString(),
          "pagesize": 10,
          "hash": hash,
        }
        this.$store.dispatch('app/setCrosschainBlock_1', data).then(() => {
          this.$router.push({path: '/slicechain_blockdetails'})
        })
      },
      /*查看区块委员会*/
      to_block_chaincommittee(e) {
        let data = {"chainId": e.toString(), "epoch": ''}
        this.$store.dispatch('app/setUnmainChaincommittee', data).then(() => {
          this.$router.push({path: '/fragmentchain_committee'})
        })
      },
      /*点击交易信息=>交易hash=>到达几种交易详情*/
      to_transaction_details(id,type,hash){
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
      /*点击交易=>发起方---接收方=》信息地址查看*/
      to_address_details(peo, id, address, type) {
        if (peo == 0) {
          let data = {"chainId": id, "address": address}
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
      // /*定时刷新数据*/
      updata_all(){
        let _this = this
        this.set_sta = setInterval(function () {
          this.go_search_height()
          this.getBlockNewTxPage()
        }, 10000)
      }
    },
    created() {
      this.get_data = this.$store.getters.unfragmented_details
      if (this.$store.getters.language == 'zh') {
        this.is_zh = true
      } else {
        this.is_zh = false
      }
      this.chain_list = this.getChainInfoStruct()
      this.go_search_height()
      this.getBlockNewTxPage()
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
    },
    beforeDestroy() {
      let _this = this
      clearInterval(_this.set_sta)
    }
  }
</script>
<style>
  .us_con .us_search2_1 .us_search2_1_input input {
    text-indent: 30px;
  }
</style>
<style scoped>
  .show_color {
    color: #800080;
  }

  .show_color_choose {
    color: #800080;
    cursor: pointer;
  }

  .us_search2_1_input_icon {
    position: absolute;
    margin-left: 15px;
    margin-top: 10px;
    z-index: 1;
  }

  .us_search2_1_input {
    display: flex;
    width: 70%;
  }

  .us_search2_1 {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .us_search1_2 {
    width: 600px;
    margin-left: 0px;
  }

  .us_search1_1_top_title {
    line-height: 2.5;
    font-size: 16px;
  }

  .us_search1_1_top {
    display: flex;
    justify-content: space-between;
  }

  .us_con {
   width: 100%;
    margin-bottom: 80px;
  }

  .con_title {
    height: 25px;
    font-size: 18px;
    color: #800080;
    padding-bottom: 20px;
  }
</style>

