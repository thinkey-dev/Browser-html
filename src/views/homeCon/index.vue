<template>
  <div class="hc_con">
    <div class="con_title">
      {{$t("title.blockchain_details")}}
    </div>
    <div class="hc_search">
      <div class="hc_search1_1">
        <div class="hc_search1_1_top">
          <div class="hc_search1_1_top_title"> {{$t("title.block_details_query")}}</div>
        </div>
        <div class="hc_search2_1">
          <div class="hc_search2_1_input">
            <!--<span class="el-icon-search hc_search2_1_input_icon"></span>-->
            <el-input @input="handinput()" v-model="search_height"
                      :placeholder="$t('placeholder.placeholder_1')"></el-input>
          </div>
          <el-button type="primary" class="hc_search_submit" @click="go_search_height()">{{$t("placeholder.search")}}
          </el-button>
        </div>
      </div>
      <div class="hc_search1_2">
        <div class="hc_search1_1_top">
          <div class="hc_search1_1_top_title">{{$t("title.transaction_details_inquiry")}}</div>
          <div>
          </div>
        </div>
        <div class="hc_search2_1">
          <div class="hc_search2_1_input">
            <!--<span class="el-icon-search hc_search2_1_input_icon"></span>-->
            <el-input v-model="search_transaction" :placeholder="$t('placeholder.placeholder_5')"></el-input>
          </div>
          <el-button type="primary" class="hc_search_submit" @click="go_search_tr()">{{$t("placeholder.search")}}
          </el-button>
        </div>
      </div>
    </div>
    <div class="hc_tishi">
      {{$t("prompt.prompt_1")}}
    </div>
    <div class="hc_overview">
      <div>
        <span class="hc_overview_he">{{$t("title.thk_price")}}</span><br/>
        <br/>
        <!--￥{{marke.thkPrice}}-->
        ￥
      </div>
      <div>
        <span class="hc_overview_he">{{$t("title.network_market_value")}}</span>
        <br/>
        <br/>
        <!--￥{{marke.marketValue}}-->
        ￥
      </div>
      <div><span class="hc_overview_he">{{$t("title.total_online_transaction_volume")}}</span>
        <br/>
        <br/>
        {{marke.txCount}} ( {{marke.tps}}TPS )
      </div>
    </div>
    <div class="hc_tishi" style="margin-bottom: 30px">
      {{$t("prompt.prompt_2")}}
    </div>
    <div class="hc_overview hc_overview_1">
      <div>
        <span style="display: inline-block;line-height: 80px;font-size: 18px" class="color_choose"
              @click='to_main_chain_interface()'>{{$t("title.main_chain")}}</span>
      </div>
      <div>
        <span class="hc_overview_he">{{$t("title.block_height")}}</span><br/>
        <br/>
        <span class="color_choose"
              @click="click_main_height(chain_data.currentheight)">{{chain_data.currentheight||0}}</span>
      </div>
      <div style="border-right:1px solid #DCDFE6 ">
        <span class="hc_overview_he">{{$t("title.current_committee_member")}}</span>
        <br/>
        <br/>
        <span class="color_choose" @click="to_main_chaincommittee(0,0)">{{chain_data.currentcomm}}</span>
      </div>
      <div style="border-right:1px solid #DCDFE6 ">
        <span
          class="hc_overview_he">{{$t("title.number_of_sub_chains")}}</span>
        <br/>
        <br/>
        <span class="">{{chain_data.ChildrenCount||0}}</span>
      </div>
      <div>
        <span class="hc_overview_he">{{$t("title.miner")}}</span>
        <br/>
        <br/>
        <span class="color_choose">{{slice_hash(chain_data.miner)||''}}</span>
      </div>
    </div>
    <div class="con_title ">
      {{$t("title.split_subchain")}}
    </div>
    <!--已分片子链列表-->
    <el-table
      :data="chainStatA"
      border
      style="width: 100%;margin-bottom: 30px"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.subchain_id')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose" v-show="is_zh" @click="to_subchain_interface(scope.row.chainId)">{{chainid_change_zh(scope.row.chainId)}}</span>
          <span class="to_tr color_choose" v-show="!is_zh" @click="to_subchain_interface(scope.row.chainId)">{{chainid_change_en(scope.row.chainId)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose" @click="click_slice_height(0,scope.row.chainId,scope.row.currentheight)">{{scope.row.currentheight}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.current_committee_member')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose" @click="to_main_chaincommittee(1,scope.row.chainId)">{{scope.row.currentcomm}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.number_of_fragments')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{scope.row.ChildrenCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.total_share_of_its_segmented_chain')"
        align="center"
        width="350"
      >
        <template slot-scope="scope">
          <span class="to_tr ">{{scope.row.ChildrenTxcount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.miner')"
        align="center">
        <template slot-scope="scope">
          <span>{{slice_hash(scope.row.miner)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="con_title ">
      {{$t("title.unfragmented_subchain")}}
    </div>
    <!--未分片子链列表-->
    <el-table
      :data="chainStatB"
      border
      style="width: 100%;margin-bottom: 30px"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.subchain_id')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose" v-show="is_zh" @click="to_unfragmented_interface(scope.row.chainId)">{{chainid_change_zh(scope.row.chainId)}}</span>
          <span class="to_tr color_choose" v-show="!is_zh" @click="to_unfragmented_interface(scope.row.chainId)">{{chainid_change_en(scope.row.chainId)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose" @click="click_slice_height(1,scope.row.chainId,scope.row.currentheight)">{{scope.row.currentheight}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.current_committee_member')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose" @click="to_Unfragmented_chaincommittee(scope.row.chainId)">{{scope.row.currentcomm}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.trading_volume')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{scope.row.txcount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.miner')"
        align="center">
        <template slot-scope="scope">
          <span>{{slice_hash(scope.row.miner)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="con_title ">
      {{$t("title.trading_information")}}
    </div>
    <!--交易信息列表-->
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
          <span class="to_tr color_choose" @click="see_transaction_information(scope.row.chainId,scope.row.txType,scope.row.hash)">{{slice_hash(scope.row.hash)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.own_chain')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose" v-show="is_zh" @click="to_unfragmented_interface(scope.row.chainId)">{{chainid_change_zh(scope.row.chainId)}}</span>
          <span class="to_tr color_choose" v-show="!is_zh" @click="to_unfragmented_interface(scope.row.chainId)">{{chainid_change_en(scope.row.chainId)}}</span>
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
          <span class="to_tr color_choose" @click="to_address_interface(0,scope.row.chainId,scope.row.from,scope.row.txType)">{{slice_hash(scope.row.from)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.receiver')"
        align="center">
        <template slot-scope="scope">
          <span :class="scope.row.txType==1?'to_tr':'to_tr color_choose'"
                @click="to_address_interface(1,scope.row.chainId,scope.row.to,scope.row.txType)">{{slice_hash(scope.row.to)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.transfer_amount')"
        align="center">
        <template slot-scope="scope">
          <span>{{scientificCounting(scope.row.value)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.transaction_fee')"
        align="center">
        <template slot-scope="scope">
          <span>{{scientificCounting(scope.row.txCost)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="width: 100%;margin-bottom: 50px;margin-top: 20px" type="primary" @click="to_transaction_information()">
      {{$t("title.see_more_deals")}}
    </el-button>
  </div>

</template>
<script>
  import {
    getMainPageInfo,
    getMainChainStat,
    getChainStatByType,
    getBlockNewTxPage,
    getBlockDataByPage
  } from '../../api/interface'

  export default {
    name: "idnex",
    data() {
      return {
        search_height: '',
        search_transaction: '',
        marke: '',
        chain_data: '',
        chainStatA: [],
        chainStatB: [],
        tr_data: [],
        loading: false,
        loading1: false,
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
        set_sta:'',
      }
    },
    methods: {
      /*获取货币信息*/
      getMainPageInfo() {
        getMainPageInfo().then(response => {
          this.marke = response.data
        })
      },
      /*获取主链信息*/
      getMainChainStat() {
        let data = {"chainId": '0'}
        getMainChainStat(data).then(response => {
          this.chain_data = response.data
          this.chain_data.currentcomm = this.chain_data.currentcomm.length

        })
      },
      /*获取主链分片链信息*/
      getChainStatByType() {
        this.loading = true
        getChainStatByType().then(response => {
          this.chainStatA = response.data.chainStatA
          this.chainStatB = response.data.chainStatB
          this.chainStatA.forEach((item, index, self) => {
            self[index].currentcomm = self[index].currentcomm.length
          })
          this.chainStatB.forEach((item, index, self) => {
            self[index].currentcomm = self[index].currentcomm.length
          })
          this.loading = false
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
      /*区块详情查询*/
      go_search_height() {
        if (this.search_height == '') {
          if (this.$store.getters.language == 'en') {
            this.$message.error('The query block height cannot be empty!');
          } else {
            this.$message.error('查询区块高度不能为空！');
          }

        } else {
          let data = {
            "height": this.search_height,
            "chainId": '',
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
              this.$store.dispatch('app/setSearchHeight', data).then(() => {
                this.$router.push({path: '/search_blockheight'})
              })
            }
          })
        }

      },
      /* 区块详情hash或者账户地址查询*/
      go_search_tr() {
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
      /*只能输入数字*/
      handinput() {
        if (/[^\d]/.test(this.search_height)) {
          this.search_height = this.search_height.replace(/[^\d]/g, '');
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
      /*点击主链跳转到主链页面*/
      to_main_chain_interface() {
        this.$router.push({path: '/main_chain'})
      },
      /*点击主链区块高度跳转*/
      click_main_height(e) {
        let data = {
          "height": e.toString(),
          "chainId": '0',
          "page": 1,
          "pagesize": 10,
          "hash": '',
        }
        this.$store.dispatch('app/setCrosschainBlock', data).then(() => {
          this.$router.push({path: '/mainchain_blockdetails'})
        })
      },
      /*点击已分片子链/未分片子链高度跳转*/
      click_slice_height(e, q, w) {
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
      /*查看主链委员会*/
      to_main_chaincommittee(e, q) {
        if (e == 0) {
          let data = {"chainId": '0', "epoch": ''}
          this.$store.dispatch('app/setMainChaincommittee', data).then(() => {
            this.$router.push({path: '/mainchain_committee'})
          })
        } else {
          let data = {"chainId": q.toString(), "epoch": ''}
          this.$store.dispatch('app/setMainChaincommittee', data).then(() => {
            this.$router.push({path: '/mainchain_committee'})
          })
        }

      },
      /*查看未分片链委员会*/
      to_Unfragmented_chaincommittee(e) {
        let data = {"chainId": e.toString(), "epoch": ''}
        this.$store.dispatch('app/setUnmainChaincommittee', data).then(() => {
          this.$router.push({path: '/fragmentchain_committee'})
        })
      },
      /*点击已分片子链进入已分片子链界面*/
      to_subchain_interface(e) {
        let data = {"chainId": e.toString()}
        this.$store.dispatch('app/setFragmentedDetails', data).then(() => {
          this.$router.push({path: '/split_subchain'})
        })
      },
      /*点击未分片子链进入未分片界面*/
      to_unfragmented_interface(e) {
        let data = {"chainId": e.toString()}
        this.$store.dispatch('app/setUnfragmentedDetails', data).then(() => {
          this.$router.push({path: '/unfragmented_subchain'})
        })
      },
      /*点击交易信息地址查看交易详情*/
      to_address_interface(peo, id, address, type) {
        if (peo == 0) {
          let data = {"chainId": id.toString(), "address": address}
          this.$store.dispatch('app/setAddressDetails', data).then(() => {
            this.$router.push({path: '/address_details'})
          })
        } else {
          if (type == 1) {

          } else if (type == 2) {
            let data = {"chainId": id.toString(), "address": address}
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
      /*查看更多交易信息*/
      to_transaction_information() {
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
      /*点击交易信息=>交易hash=>到达几种交易详情*/
      see_transaction_information(id,type,hash){
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
       /*定时刷新数据,10s一次*/
      timed_refresh(){
        let _this = this
        this.set_sta = setInterval(function () {
          _this.getMainPageInfo()
          _this.getMainChainStat()
          _this.getChainStatByType()
          _this.getBlockNewTxPage()
        }, 10000)
      }
    }
    ,
    created() {
      if (this.$store.getters.language == 'zh') {
        this.is_zh = true
      } else {
        this.is_zh = false
      }
      this.chain_list = this.getChainInfoStruct()
      this.getMainPageInfo()
      this.getMainChainStat()
      this.getChainStatByType()
      this.getBlockNewTxPage()
      this.timed_refresh()
    }
    ,
    computed: {
      lang() {
        return this.$store.getters.language;
      }
    }
    ,
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
  .hc_con .hc_search2_1 .hc_search2_1_input input {
    /*text-indent: 30px;*/
  }
</style>
<style scoped>
  .hc_overview_he {
    display: inline-block;
    height: 22px;
  }

  .color_choose {
    color: #800080;
    cursor: pointer;
  }

  .hc_overview {
    border: 1px solid #DCDFE6;
    width: 100%;
    display: flex;
    /*justify-content: space-between;*/
  }

  .hc_overview div {
    width: 33.33%;
    height: 80px;
    text-align: center;
    padding: 30px 0;
  }

  .hc_overview_1 div {
    width: 25%;
    text-align: center;
    padding: 25px 0;

  }

  .hc_overview_1 {
    margin-bottom: 30px;
  }

  .hc_overview div:nth-child(2) {
    border-left: 1px solid #DCDFE6;
    border-right: 1px solid #DCDFE6;
  }

  .hc_tishi {
    height: 15px;
    font-size: 12px;
    margin: 20px 0 30px 0;
  }

  .hc_search2_1_input_icon {
    position: absolute;
    margin-left: 15px;
    margin-top: 12px;
    z-index: 1;
  }

  .hc_search2_1_input {
    display: flex;
    width: 70%;
  }

  .hc_search2_1 {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .hc_search1_1_top_title {
    line-height: 2.5;
    font-size: 16px;
  }

  .hc_search1_1_top {
    display: flex;
    justify-content: space-between;
  }

  .hc_con {
    width: 100%;
    margin-bottom: 80px;
  }

  .con_title {
    height: 25px;
    font-size: 18px;
    color: #800080;
    padding-bottom: 20px;
  }

  .hc_search {
    display: flex;
    margin-bottom: 20px;
    /*justify-content: space-between;*/
  }

  .hc_search1_1 {
    width: 400px;
  }

  .hc_search1_2 {
    width: 400px;
    margin-left: 150px;
  }
</style>
