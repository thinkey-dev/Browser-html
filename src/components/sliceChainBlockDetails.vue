<template>
  <div class="mcd_con">
    <div class="con_title">
      {{$t('table.own_chain')}}：
      <span v-show="is_zh">{{chainid_change_zh(all_data.chainId)}}</span>
      <span v-show="!is_zh">{{chainid_change_en(all_data.chainId)}}</span>
    </div>
    <div class="con_title con1 " style="margin-top:20px">
      {{$t('title.blockchain_details')}} #{{all_data.height==undefined?is_height:all_data.height}}
    </div>
    <div class="mcd_all">
      <div class="mcd_all_con">
        <div class="mcd_all_con_left">
          {{$t('title.block_height')}}
        </div>
        <div class="mcd_all_con_right" style="  user-select: none;">
          {{all_data.height==undefined?is_height:all_data.height}}
          <span class="el-icon-caret-left mcd_icon" @click="block_switching(0)"></span>
          <span class=" el-icon-caret-right mcd_icon" @click="block_switching(1)"></span>
        </div>
      </div>
      <div class="mcd_all_con">
        <div class="mcd_all_con_left">
          {{$t('table.own_chain')}}
        </div>
        <div class="mcd_all_con_right ">
          <span v-show="is_zh">{{chainid_change_zh(all_data.chainId)}}</span>
          <span v-show="!is_zh">{{chainid_change_en(all_data.chainId)}}</span>
        </div>
      </div>
      <div class="mcd_all_con">
        <div class="mcd_all_con_left">
          {{$t('table.timestamp')}}
        </div>
        <div class="mcd_all_con_right">
          {{timestampToTime(all_data.timeTamp)}}
        </div>
      </div>
      <div class="mcd_all_con">
        <div class="mcd_all_con_left">
          {{$t('title.trading_information')}}
        </div>
        <div class="mcd_all_con_right " style="cursor: pointer" @click="to_transaction_details(all_data.height)">
          <span class="color_choose">{{data_length}}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
          ( <span v-show="is_zh" v-for="item in transaction_data">{{item.txCount}} {{tr_change_zh(item.txType)}}，</span>
          <span v-show="!is_zh" v-for="item in transaction_data">{{item.txCount}} {{tr_change_en(item.txType)}}，</span>
          )
        </div>
      </div>
      <!--<div class="mcd_all_con">-->
        <!--<div class="mcd_all_con_left">-->
          <!--{{$t('title.mining_reward')}}-->
        <!--</div>-->
        <!--<div class="mcd_all_con_right">-->
          <!--{{scientificCounting(all_data.minerReward)}} TUE-->
        <!--</div>-->
      <!--</div>-->
      <div class="mcd_all_con">
        <div class="mcd_all_con_left">
          Hash
        </div>
        <div class="mcd_all_con_right">
          {{all_data.hash}}
        </div>
      </div>
      <div class="mcd_all_con">
        <div class="mcd_all_con_left">
          {{$t('title.parent_block_hash')}}
        </div>
        <div class="mcd_all_con_right color_choose" @click="block_switching(0)">
          {{all_data.previousHash}}
        </div>
      </div>
      <!--<div class="mcd_all_con">-->
        <!--<div class="mcd_all_con_left">-->
          <!--{{$t('title.participation_round')}}-->
        <!--</div>-->
        <!--<div class="mcd_all_con_right">-->
          <!--{{memberdetails.epoch}}-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="mcd_all_con">-->
        <!--<div class="mcd_all_con_left">-->
          <!--{{$t('title.number_of_committees')}}-->
        <!--</div>-->
        <!--<div class="mcd_all_con_right ">-->
          <!--<span class="color_choose" @click="to_committee_member()"> {{memberdetails.memlen}}</span>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="mcd_all_con">-->
        <!--<div class="mcd_all_con_left mcd_all_con_left_last" style="line-height: 100px">-->
          <!--{{$t('title.participant_member_details')}}-->
        <!--</div>-->
        <!--<div class="mcd_all_con_right mcd_all_con_right_last ">-->
          <!--<span class="color_choose" v-for=" item in memberdetails.memberdetails" @click="to_address_details(item)">-->
            <!--{{item}}；&nbsp&nbsp&nbsp-->
          <!--</span>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import {getChainCommittee, getBlockDataByPage, getTxTypeByHeigh} from '../api/interface'

  export default {
    name: "sliceChainBlockDetails",
    data() {
      return {
        all_data: '',
        memberdetails: '',
        is_zh: true,
        chain_list: {},
        is_height: '',
        transaction_data: [],
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
        data_length: 0,
      }
    },
    methods: {
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
      /*初始化获取数据*/
      initialization_data() {
        let data = this.$store.getters.crosschain_to_block_detil_1
        getBlockDataByPage(data).then(response => {
          if (response.data.dataList.length == 0) {
          } else {
            this.all_data = response.data.dataList[0]
          }
        })
        let data1 = {
          'chainId': this.$store.getters.crosschain_to_block_detil_1.chainId.toString(),
          "epoch": Math.floor((Number(this.is_height) / 1000)).toString()
        }
        getChainCommittee(data1).then(response => {
          if (response.data.length == 0) {
            this.memberdetails = ''
          } else {
            this.memberdetails = response.data[0]
            this.memberdetails.memlen = this.memberdetails.memberdetails.length
          }
        })
        getTxTypeByHeigh(data.chainId.toString(), data.height).then(response => {
          if (response.data.length == 0) {
          } else {
            this.data_length = response.data.txtSumCount
            this.transaction_data = response.data.TxByTypeInfo

          }
        })
      },
      /*切换=>点击父块hash等同于切换上一块*/
      block_switching(e) {
        if (e == 0) {
          this.is_height = Number(this.is_height) - 1
        } else {
          this.is_height = Number(this.is_height) + 1
        }
        let data = {
          "height": this.is_height.toString(),
          "chainId": this.$store.getters.crosschain_to_block_detil_1.chainId.toString(),
          "page": 1,
          "pagesize": 10,
          "hash": '',
        }
        getBlockDataByPage(data).then(response => {
          if (response.data.dataList.length == 0) {

          } else {
            this.$store.dispatch('app/setCrosschainBlock_1', data).then(() => {
              this.all_data = response.data.dataList[0]
              let data1 = {
                'chainId': this.$store.getters.crosschain_to_block_detil_1.chainId.toString(),
                "epoch": Math.floor((Number(this.is_height) / 1000)).toString()
              }
              getChainCommittee(data1).then(response => {
                if (response.data.length == 0) {
                } else {
                  this.memberdetails = response.data[0]
                  this.memberdetails.memlen = this.memberdetails.memberdetails.length
                }
              })
              getTxTypeByHeigh(data.chainId.toString(), this.is_height).then(response => {
                if (response.data.length == 0) {
                  this.memberdetails = ''
                } else {
                  this.transaction_data = response.data.TxByTypeInfo
                }
              })
            })
          }
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
      /*点击跳转到区块内交易详情界面*/
      to_transaction_details(e) {
        let data = {
          'page': 1,
          'chainId': this.$store.getters.crosschain_to_block_detil_1.chainId.toString(),
          'hash': '',
          'height': e.toString(),
          'pagesize': 10,
        }
        this.$store.dispatch('app/setWeiToDe', data).then(() => {
          this.$router.push({path: '/intrablock_transaction_details'})
        })

      },
      /*查看委员会成员*/
      to_committee_member() {
        let data = {"chainId": this.$store.getters.crosschain_to_block_detil_1.chainId.toString(), "epoch": ''}
        this.$store.dispatch('app/setUnmainChaincommittee', data).then(() => {
          this.$router.push({path: '/fragmentchain_committee'})
        })
      },
      /*点击单个参选成员=》地址详情跳转*/
      to_address_details(e) {
        let data = {"chainId": this.$store.getters.crosschain_to_block_detil_1.chainId.toString(), "address": e}
        this.$store.dispatch('app/setAddressDetails', data).then(() => {
          this.$router.push({path: '/address_details'})
        })
      }
    },
    created() {
      this.chain_list = this.getChainInfoStruct()
      this.is_height = this.$store.getters.crosschain_to_block_detil_1.height
      if (this.$store.getters.language == 'zh') {
        this.is_zh = true
      } else {
        this.is_zh = false
      }
      this.initialization_data()
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
  .mcd_icon {
    font-size: 30px;
    padding: 0 10px;
    margin-left: 30px;
    cursor: pointer;
    color: #800080;
    position: relative;
    top: 6px;
    /*line-height: 10.5;*/
  }

  .color_choose {
    color: #800080;
    cursor: pointer;
  }

  .mcd_all_con_right_last::-webkit-scrollbar { /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .mcd_all_con_right_last::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(218, 218, 218, 0.2);
    background: #b5b5b5;
  }

  .mcd_all_con_right_last::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: #ffffff;
  }

  .mcd_all_con_right_last {
    height: 100px;
    overflow: auto;
  }

  .mcd_all_con_left_last {
    height: 100px;
  }

  .mcd_all_con {
    display: flex;
    border-bottom: 1px solid #DCDFE6;
    padding: 0 15px;
  }

  .mcd_all_con_left {
    width: 25%;
    line-height: 3;
    border-right: 1px solid #DCDFE6;
  }

  .mcd_all_con_right {
    word-break: break-all;
    width: 75%;
    line-height: 3;
    padding: 0 15px;
  }

  .mcd_all {
    width: 100%;
    border: 1px solid #DCDFE6;
    border-bottom: 0px;
    /*display: flex;*/
  }

  .con_title {
    height: 25px;
    font-size: 18px;
    color: #800080;
    padding-bottom: 20px;
  }

  .con1 {
    font-size: 17px;
  }

  .mcd_con {
    width: 100%;
    margin-bottom: 80px;
  }
</style>
