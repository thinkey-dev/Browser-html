<template>
  <div class="mc_con">
    <div class="con_title">
      {{$t("title.blockchain_details")}}:{{$t("title.main_chain")}}
    </div>
    <div class="mc_search">
      <div class="mc_search1_2">
        <div class="mc_search1_1_top">
          <div class="mc_search1_1_top_title show_color">{{$t("title.block_details_query")}}</div>
          <div>
          </div>
        </div>
        <div class="mc_search2_1">
          <div class="mc_search2_1_input">
            <span class="el-icon-search mc_search2_1_input_icon"></span>
            <el-input @input="handinput()" v-model="search_height"
                      :placeholder="$t('placeholder.placeholder_1')"></el-input>
          </div>
          <el-button type="primary" class="mc_search_submit" @click="block_height_query()">{{$t("placeholder.search")}}
          </el-button>
        </div>
      </div>
    </div>
    <div class="con_title " style="margin-top: 30px">
      {{$t("title.split_subchain")}}
    </div>
    <!--已分片子链-->
    <el-table
      :data="chainStatA"
      border
      style="width: 100%;margin-bottom: 30px"
      v-loading="loading"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.subchain_id')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" v-show="is_zh" @click="to_fragmented_page(scope.row.chainId)">{{chainid_change_zh(scope.row.chainId)}}</span>
          <span class="to_tr show_color_choose" v-show="!is_zh" @click="to_fragmented_page(scope.row.chainId)">{{chainid_change_en(scope.row.chainId)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" @click="to_block_details(0,scope.row.chainId,scope.row.currentheight)">{{scope.row.currentheight}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--:label="$t('table.current_committee_member')"-->
        <!--align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span class="to_tr show_color_choose" @click="to_main_chaincommittee(scope.row.chainId)">{{scope.row.currentcomm}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        :label="$t('table.number_of_fragments')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose">{{scope.row.ChildrenCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.total_share_of_its_segmented_chain')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose">{{scope.row.ChildrenTxcount}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="con_title ">
      {{$t("title.unfragmented_subchain")}}
    </div>
    <!--未分片子链-->
    <el-table
      :data="chainStatB"
      border
      style="width: 100%;margin-bottom: 30px"
      v-loading="loading1"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.subchain_id')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" v-show="is_zh" @click="to_unfragmented_page(scope.row.chainId)">{{chainid_change_zh(scope.row.chainId)}}</span>
          <span class="to_tr show_color_choose" v-show="!is_zh" @click="to_unfragmented_page(scope.row.chainId)">{{chainid_change_en(scope.row.chainId)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" @click="to_block_details(1,scope.row.chainId,scope.row.currentheight)">{{scope.row.currentheight}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--:label="$t('table.current_committee_member')"-->
        <!--align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span class="to_tr show_color_choose" @click="to_Unfragmented_chaincommittee(scope.row.chainId)">{{scope.row.currentcomm}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        :label="$t('table.trading_volume')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose">{{scope.row.txcount}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="con_title " style="margin-top: 80px">
      {{$t("title.block_information")}}
    </div>
    <!--区块信息-->
    <el-table
      :data="all_block_data"
      border
      style="width: 100%;margin-bottom: 30px;min-height: 529px"
      v-loading="loading2"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" @click="to_block_details_1(scope.row.chainId,scope.row.height)">{{scope.row.height}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_hash')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" @click="to_block_detail_interface(scope.row.chainId,scope.row.height,scope.row.hash)">{{slice_hash(scope.row.hash)}}</span>
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
        <!--:label="$t('table.current_committee_member')"-->
        <!--align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span class="to_tr show_color_choose" @click="to_block_chaincommittee(scope.row.chainId)">{{scope.row.chainIdCommitteeCount}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--:label="$t('table.miner')"-->
        <!--align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span class="to_tr show_color_choose">{{slice_hash(scope.row.miner)}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <el-button style="width: 100%;margin-bottom: 50px;margin-top: 20px" type="primary" @click="more_block_information()">
      {{$t("placeholder.view_all_blocks")}}
    </el-button>
    <div class="con_title " style="margin-top: 30px">
      {{$t("title.whole_network_transaction_information")}}
    </div>
    <!--交易信息-->
    <el-table
      :data="tr_data"
      border
      style="width: 100%;margin-bottom: 30px;min-height: 529px"
      v-loading="loading1"
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
        :label="$t('table.own_chain')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" v-show="is_zh" @click="to_information_chain(scope.row.chainId)">{{chainid_change_zh(scope.row.chainId)}}</span>
          <span class="to_tr show_color_choose" v-show="!is_zh" @click="to_information_chain(scope.row.chainId)">{{chainid_change_en(scope.row.chainId)}}</span>
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
    getChainStatByType,
    getBlockNewTxPage,
    getBlockDataByPage,
    getBlockData,
  } from '../api/interface'

  export default {
    name: "mainChain",
    data() {
      return {
        search_height: '',
        tableData: [],
        chain_data: '',
        chainStatA: [],
        chainStatB: [],
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
        set_sta:'0',
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
      /*获取主链分片链信息*/
      getChainStatByType() {
        this.loading = true
        getChainStatByType().then(response => {
          this.loading = false
          this.chainStatA = response.data.chainStatA
          this.chainStatB = response.data.chainStatB
          this.chainStatA.forEach((item, index, self) => {
            self[index].currentcomm = self[index].currentcomm.length
          })
          this.chainStatB.forEach((item, index, self) => {
            self[index].currentcomm = self[index].currentcomm.length
          })
        })
      },
      /*获取区块详情*/
      get_block_details() {
        this.loading2 = true
        getBlockData().then(response => {
          this.loading2 = false
          if (response.data.length == 0) {
            this.all_block_data = []

          } else {
            this.all_block_data = response.data
          }
        })

      },
      /*获取交易信息*/
      getBlockNewTxPage() {
        this.loading1 = true
        let data = {
          'page': 1,
          'chainId': '',
          'hash': '',
          'pagesize': 10,
        }
        getBlockNewTxPage(data).then(response => {
          this.tr_data = response.data.transactionsList.dataList
          this.loading1 = false
        })
      },
      /*只能输入数字*/
      handinput() {
        if (/[^\d]/.test(this.search_height)) {
          this.search_height = this.search_height.replace(/[^\d]/g, '');
        }
      },
      /*区块高度查询*/
      block_height_query() {
        if (this.search_height == '') {
          if (this.$store.getters.language == 'en') {
            this.$message.error('The query block height cannot be empty!');
          } else {
            this.$message.error('查询区块高度不能为空！');
          }

        } else {
          let data = {
            "height": this.search_height,
            "chainId": '0',
            "page": 1,
            "pagesize": 10,
            "hash": '',
          }
          getBlockDataByPage(data).then(response => {
            if (response.data.dataList.length == 0) {
              if (this.$store.getters.language == 'en') {
                this.$message.error('The current block height query result is empty, please check and enter again!');
              } else {
                this.$message.error('当前区块高度查询结果为空，请检查后再次输入！');
              }

            } else {
              this.$store.dispatch('app/setCrosschainBlock', data).then(() => {
                this.$router.push({path: '/mainchain_blockdetails'})
              })
            }
          })
        }
      },
      /*查看更多区块信息*/
      more_block_information() {
        let data = {
          "height": '',
          "chainId": '0',
          "page": 1,
          "pagesize": 10,
          "hash": '',
        }

        this.$store.dispatch('app/setMainChainblock', data).then(() => {
          this.$router.push({path: '/main_chainblock'})
        })

      },
      /*查看更多交易信息*/
      more_transaction_information() {
        let data = {
          "chainId": "",
          "page": 1,
          "hash": "",
          "pagesize": 10
        }
        this.$store.dispatch('app/setMainChaintotr', data).then(() => {
          this.$router.push({path: '/trading_information'})
        })
      },
      /*点击已分片子链进入已分片子链界面*/
      to_fragmented_page(e) {
        let data = {"chainId": e.toString()}
        this.$store.dispatch('app/setFragmentedDetails', data).then(() => {
          this.$router.push({path: '/split_subchain'})
        })
      },
      /*点击未分片子链进入未分片界面*/
      to_unfragmented_page(e) {
        let data = {"chainId": e.toString()}
        this.$store.dispatch('app/setUnfragmentedDetails', data).then(() => {
          this.$router.push({path: '/unfragmented_subchain'})
        })
      },
      /*点击已分片子链/未分片子链高度跳转*/
      to_block_details(e, q, w) {
        if (e == 0) {
          let data = {
            "height": w.toString(),
            "chainId": q.toString(),
            "pagesize": 10,
            "hash": '',
          }
          this.$store.dispatch('app/setCrosschainBlock', data).then(() => {
            this.$router.push({path: '/mainchain_blockdetails'})
          })
        } else {
          let data = {
            "height": w.toString(),
            "chainId": q.toString(),
            "pagesize": 10,
            "hash": '',
          }
          this.$store.dispatch('app/setCrosschainBlock_1', data).then(() => {
            this.$router.push({path: '/slicechain_blockdetails'})
          })

        }

      },
      /*点击区块信息高度跳转*/
      to_block_details_1(e, q) {
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
      /*查看主链/已分片子链委员会*/
      to_main_chaincommittee(q) {
        let data = {"chainId": q.toString(), "epoch": ''}
        this.$store.dispatch('app/setMainChaincommittee', data).then(() => {
          this.$router.push({path: '/mainchain_committee'})
        })
      },
      /*查看未分片链委员会*/
      to_Unfragmented_chaincommittee(e) {
        let data = {"chainId": e.toString(), "epoch": ''}
        this.$store.dispatch('app/setUnmainChaincommittee', data).then(() => {
          this.$router.push({path: '/fragmentchain_committee'})
        })
      },
      /*查看区块委员会*/
      to_block_chaincommittee(e) {
        this.chain_list.zh_chain_arr.forEach((item, index) => {
          if (e == item.value) {
            if (item.is_have == true) {
              let data = {"chainId": e.toString(), "epoch": ''}
              this.$store.dispatch('app/setMainChaincommittee', data).then(() => {
                this.$router.push({path: '/mainchain_committee'})
              })
            }
            else {
              let data = {"chainId": e.toString(), "epoch": ''}
              this.$store.dispatch('app/setUnmainChaincommittee', data).then(() => {
                this.$router.push({path: '/fragmentchain_committee'})
              })
            }
          }
        })
      },
      /*全网交易信息链查看*/
      to_information_chain(e) {
        let data = {"chainId": e}
        this.$store.dispatch('app/setUnfragmentedDetails', data).then(() => {
          this.$router.push({path: '/unfragmented_subchain'})
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
            let data = {"chainId": id, "contract": address}
            this.$store.dispatch('app/setContractDetails', data).then(() => {
              this.$router.push({path: '/contract_details'})
            })
          } else if (type == 3) {
            let data = {"chainId": id, "address": address}
            this.$store.dispatch('app/setAddressDetails', data).then(() => {
              this.$router.push({path: '/address_details'})
            })
          } else if (type == 4 || type == 5 || type == 6) {
            let data = {"chainId": id, "address": address}
            this.$store.dispatch('app/setCrossChainContract', data).then(() => {
              this.$router.push({path: '/crosschain_contract'})
            })
          }
        }

      },
      /*点击区块信息=》区块hash=》进入区块详情*/
      to_block_detail_interface(id, height, hash) {
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
      /*定时刷新数据*/
      updata_all(){
        let _this = this
        this.set_sta = setInterval(function () {
          _this.getChainStatByType()
          _this.get_block_details()
          _this.getBlockNewTxPage()
        }, 300000)
      }
    },
    created() {
      if (this.$store.getters.language == 'zh') {
        this.is_zh = true
      } else {
        this.is_zh = false
      }
      this.chain_list = this.getChainInfoStruct()
      this.getChainStatByType()
      this.get_block_details()
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
  .mc_con .mc_search2_1 .mc_search2_1_input input {
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

  .mc_search2_1_input_icon {
    position: absolute;
    margin-left: 15px;
    margin-top: 10px;
    z-index: 1;
  }

  .mc_search2_1_input {
    display: flex;
    width: 70%;
  }

  .mc_search2_1 {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .mc_search1_2 {
    width: 600px;
    margin-left: 0px;
  }

  .mc_search1_1_top_title {
    line-height: 2.5;
    font-size: 16px;
  }

  .mc_search1_1_top {
    display: flex;
    justify-content: space-between;
  }

  .mc_con {
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
