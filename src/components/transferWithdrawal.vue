<template>
  <div class="ct_con">
    <div class="con_title" style="font-size: 17px">
      {{$t('title.transaction_details')}}
    </div>
    <div class="ct_all">
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.transaction_hash')}}
        </div>
        <div class="ct_all_con_right">
          {{all_data.hash}}
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.state')}}
        </div>
        <div class="ct_all_con_right">
          <span class="el-icon-success state_success" v-show="all_data.status==1"></span>
          <span class="state_success_text" v-show="all_data.status==1&&is_zh">成功</span>
          <span class="state_success_text" v-show="all_data.status==1&&!is_zh">success</span>
          <span class="el-icon-error state_error" v-show="!all_data.status==1"></span>
          <span class="state_error_text" v-show="!all_data.status==1&&is_zh">撤销</span>
          <span class="state_error_text" v-show="!all_data.status==1&&!is_zh">failure</span>
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.ov_block')}}
        </div>
        <div class="ct_all_con_right show_color_choose">
          <span class="to_tr color_choose" @click="to_block_details(all_data.height,all_data.chainId)"
                v-show="is_zh">{{chainid_change_zh(all_data.chainId)+' > '+all_data.height}}</span>
          <span class="to_tr color_choose" @click="to_block_details(all_data.height,all_data.chainId)"
                v-show="!is_zh">{{chainid_change_en(all_data.chainId)+' > '+all_data.height}}</span>
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.timestamp')}}
        </div>
        <div class="ct_all_con_right ">
          <!--{{all_data.theDateString}}-->
          {{timestampToTime(all_data.timestamp)}}
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.transaction_type')}}
        </div>
        <div class="ct_all_con_right">
          <span v-show="is_zh">{{tr_change_zh(Number(all_data.txType))}}</span>
          <span v-show="!is_zh">{{tr_change_en(Number(all_data.txType))}}</span>
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left ">
          {{$t('table.initiator')}}
        </div>
        <div class="ct_all_con_right show_color_choose" @click="to_address_details(all_data.chainId,all_data.from)">
          {{all_data.from}}
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.contract')}}
        </div>
        <div class="ct_all_con_right show_color_choose" @click="to_contract_details(all_data.chainId,all_data.to)">
          {{all_data.to}}
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('title.amount')}}
        </div>
        <div class="ct_all_con_right">
         {{scientificCounting(all_data.value)}} TUE
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.transaction_fee')}}
        </div>
        <div class="ct_all_con_right ">
          {{scientificCounting(all_data.txCost)}} TUE
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left ct_all_con_left_last" style="line-height: 100px">
          {{$t('title.check_content')}}
        </div>
        <div class="ct_all_con_right ct_all_con_right_last">
          {{all_data.input}}
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left ct_all_con_left_last" style="line-height: 150px;height: 150px">
          {{$t('title.rpt')}}
        </div>
        <div class="ct_all_con_right ct_all_con_right_last" style="height: 150px;user-select: none" v-show="is_ha">
          <span v-show="is_zh">{{tr_change_zh(Number(all_data_connectedTx.txType))}}</span>
          <span v-show="!is_zh">{{tr_change_en(Number(all_data_connectedTx.txType))}}</span><br>
          <span class="to_tr color_choose"
                v-show="is_zh">{{chainid_change_zh(all_data_connectedTx.chainId)}}</span>
          <span class="to_tr color_choose"
                v-show="!is_zh">{{chainid_change_en(all_data_connectedTx.chainId)}}</span><br>
          <span
            @click="to_deposit_page(Number(all_data_connectedTx.txType),all_data_connectedTx.chainId,all_data_connectedTx.hash)"
            class="to_tr show_color_choose">{{all_data_connectedTx.hash}}</span>
        </div>
        <div class="ct_all_con_right ct_all_con_right_last" style="text-align: center;height: 150px;user-select: none;line-height:150px" v-show="!is_ha">
          暂无数据！请稍后重试！
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getBlockNewTxPage,

  } from '../api/interface'

  export default {
    name: "transferWithdrawal",
    data() {
      return {
        is_ha:true,
        is_success: true,
        all_data: '',
        all_data_connectedTx: '',
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
        chain_list: {},
      }
    },
    methods: {
      /* 获取当前页数据*/
      go_search_tr() {
        let data = this.$store.getters.home_search_tr_2
        getBlockNewTxPage(data).then(response => {
          this.all_data = response.data.transactionsList.dataList[0]

          if(response.data.transactionsList.dataList[0].connectedTx==null){
            this.all_data_connectedTx=''
            this.is_ha=false
          }else {
            this.is_ha=true
            this.all_data_connectedTx = response.data.transactionsList.dataList[0].connectedTx
          }
        })

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
      /*查看区块详情*/
      to_block_details(e, q) {
        let data = {
          "height": e.toString(),
          "chainId": q.toString(),
          "page": 1,
          "pagesize": 10,
          "hash": '',
        }
        this.$store.dispatch('app/setCrosschainBlock_1', data).then(() => {
          this.$router.push({path: '/slicechain_blockdetails'})
        })
        // let is_sure=true
        // this.chain_list.zh_chain_arr.forEach((item, index) => {
        //   if(item.value==q){
        //     is_sure=item.is_have
        //   }
        // })
        // if(is_sure==true){
        //   this.$store.dispatch('app/setCrosschainBlock', data).then(() => {
        //     this.$router.push({path: '/mainchain_blockdetails'})
        //   })
        // }else {
        //   this.$store.dispatch('app/setCrosschainBlock_1', data).then(() => {
        //     this.$router.push({path: '/slicechain_blockdetails'})
        //   })
        // }

      },
      /*点击转账人跳转到地址详情*/
      to_address_details(id, address) {
        let data = {"chainId": id, "address": address}
        this.$store.dispatch('app/setAddressDetails', data).then(() => {
          this.$router.push({path: '/address_details'})
        })
      },
      /*点击合约跳转到合约详情*/
      to_contract_details(e, q) {
        let data = {"chainId": e.toString(), "contract": q, "page": 1, "pagesize": 10}
        this.$store.dispatch('app/setContractDetails', data).then(() => {
          this.$router.push({path: '/contract_details'})
        })
      },
      /*跳转到存款或者撤销*/
      to_deposit_page(e, w, q) {
        let data = {
          'page': 1,
          'chainId': w.toString(),
          'hash': q,
          'pagesize': 5,
        }
        if (e == 5) {

        } else if (e == 6) {
          this.$store.dispatch('app/setSearchTr5', data).then(() => {
            this.$router.push({path: '/transfer_deposit'})
          })
        } else {
          this.$store.dispatch('app/setSearchTr6', data).then(() => {
            this.$router.push({path: '/transfer_cancellation'})
          })
        }
      }
    },
    created() {
      this.chain_list = this.getChainInfoStruct()
      if (this.$store.getters.language == 'zh') {
        this.is_zh = true
      } else {
        this.is_zh = false
      }
      this.go_search_tr()
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
  .state_success {
    color: #6DC542;
    font-size: 25px;
    position: relative;
    top: 3px;
  }

  .state_error {
    color: #F56C6C;
    font-size: 25px;
    position: relative;
    top: 3px;
  }

  .state_success_text {
    color: #6DC542
    /*font-size: 25px;*/
  }

  .state_error_text {
    color: #F56C6C;
  }

  .show_color {
    color: #800080;
  }

  .show_color_choose {
    color: #800080;
    cursor: pointer;
  }

  .ct_con {
    width: 100%;
    margin-bottom: 80px;
  }

  .con_title {
    height: 25px;
    font-size: 18px;
    color: #800080;
    padding-bottom: 20px;
  }

  .ct_all_con_right_last::-webkit-scrollbar { /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .ct_all_con_right_last::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(218, 218, 218, 0.2);
    background: #b5b5b5;
  }

  .ct_all_con_right_last::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: #ffffff;
  }

  .ct_all_con_right_last {
    height: 100px;
    overflow: auto;
  }

  .ct_all_con_left_last {
    height: 100px;
  }

  .ct_all_con {
    display: flex;
    border-bottom: 1px solid #DCDFE6;
    padding: 0 15px;
  }

  .ct_all_con_left {
    width: 25%;
    line-height: 3;
    border-right: 1px solid #DCDFE6;
  }

  .ct_all_con_right {
    word-break: break-all;
    width: 75%;
    line-height: 3;
    padding: 0 15px;
  }

  .ct_all {
    width: 100%;
    border: 1px solid #DCDFE6;
    border-bottom: 0px;
    /*display: flex;*/
  }
</style>
