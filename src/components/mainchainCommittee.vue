<template>
  <div class="cc_con">
    <div class="con_title">
      {{$t('table.own_chain')}}：
      <span class="to_tr color_choose" v-show="is_zh">{{chainid_change_zh(all_data.chainId)}}</span>
      <span class="to_tr color_choose" v-show="!is_zh">{{chainid_change_en(all_data.chainId)}}</span>
    </div>
    <div class="con_title" style="font-size: 17px">
      {{$t('table.committee_member_details')}} #{{get_committeedata.epoch}}
    </div>
    <div class="cc_all">
      <div class="cc_all_con">
        <div class="cc_all_con_left">
          {{$t('table.own_chain')}}
        </div>
        <div class="cc_all_con_right ">
          <span class="to_tr color_choose show_color_choose" v-show="is_zh" @click="to_chain(get_committeedata.chainId)">{{chainid_change_zh(get_committeedata.chainId)}}</span>
          <span class="to_tr color_choose show_color_choose" v-show="!is_zh"
                @click="to_chain(get_committeedata.chainId)">{{chainid_change_en(get_committeedata.chainId)}}</span>
        </div>
      </div>
      <div class="cc_all_con">
        <div class="cc_all_con_left">
          {{$t('title.participation_round')}}
        </div>
        <div class="cc_all_con_right" style="user-select: none">
          <span class="to_tr color_choose">{{get_committeedata.epoch}}</span>
          <span class="el-icon-caret-left mcd_icon" @click="round_switch(0)"></span>
          <span class=" el-icon-caret-right mcd_icon" @click="round_switch(1)"></span>
        </div>
      </div>
      <div class="cc_all_con">
        <div class="cc_all_con_left">
          {{$t('title.number_of_committees')}}
        </div>
        <div class="cc_all_con_right ">
          <span class="to_tr color_choose">{{get_committeedata.memberdetails_number}}</span>
        </div>
      </div>
      <div class="cc_all_con">
        <div class="cc_all_con_left cc_all_con_left_last" style="line-height: 100px">
          {{$t('title.participant_member_details')}}
        </div>
        <div class="cc_all_con_right cc_all_con_right_last">
                 <span class="show_color_choose" v-for=" item in get_committeedata.memberdetails" @click="to_address_details(item)">
            {{item}}；&nbsp&nbsp&nbsp
          </span>
        </div>
      </div>
    </div>
    <div class="con_title" style="font-size: 17px;margin-top: 30px">
      {{$t('table.generated_block_information')}}
    </div>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: 100%;margin-bottom: 30px;min-height: 529px"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('title.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" @click="height_query_block(scope.row.chainId,scope.row.height,scope.row.hash)">{{scope.row.height}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_hash')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" @click="height_query_block(scope.row.chainId,scope.row.height,scope.row.hash)">{{slice_hash(scope.row.hash)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.timestamp')"
        align="center">
        <template slot-scope="scope">
          <span>{{timestampToTime(scope.row.timeTamp)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('title.miner')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose">{{slice_hash(scope.row.miner)}}</span>
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
    getChainCommittee,
    getBlockDataByEpoch,
  } from '../api/interface'

  export default {
    name: "mainchainCommittee",
    data() {
      return {
        tableData: [],
        loading: false,
        chain_list: {},
        is_zh: true,
        currentPage: 1,
        pagesize: 10,
        totla: 0,
        all_data: '',
        get_committeedata: '',
        memberdetails:'',
      }
    },
    methods: {
      /*数据分页*/
      currentPageChange(e) {

        this.currentPage = e
        this.loading = true
        let data1 = {
          "epoch": this.get_committeedata.epoch.toString(),
          "chainId": this.all_data.chainId,
          "page": this.currentPage,
          "pagesize": 10,
        }
        getBlockDataByEpoch(data1).then(response => {
          this.loading = false
          this.totla = response.data.total
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
      /*初始化获取数据*/
      initialization_data() {
        this.loading = true
        let data = {'chainId': this.all_data.chainId, "epoch": ''}
        getChainCommittee(data).then(response => {
          this.get_committeedata = response.data[0]
          this.get_committeedata.memberdetails_number = this.get_committeedata.memberdetails.length
          // this.get_committeedata.memberdetails = this.get_committeedata.memberdetails.toString()
          let data1 = {
            "epoch": this.get_committeedata.epoch.toString(),
            "chainId": this.all_data.chainId,
            "page": 1,
            "pagesize": 10,
          }
          getBlockDataByEpoch(data1).then(response => {
            this.loading = false
            this.currentPage = 1
            this.totla = response.data.total
            this.tableData = response.data.dataList
          })
        })

      },
      /*轮次切换*/
      round_switch(e) {
        if (e == 0) {
          let data
          if (Number(this.get_committeedata.epoch) - 1 <= 0) {
            data = {
              'chainId': this.all_data.chainId,
              "epoch": '0'
            }
          } else {
            data = {
              'chainId': this.all_data.chainId,
              "epoch": (Number(this.get_committeedata.epoch) - 1)
            }
          }
          getChainCommittee(data).then(response => {
            if (response.data.length == 0) {

            } else {
              this.get_committeedata = response.data[0]
              this.get_committeedata.memberdetails_number = this.get_committeedata.memberdetails.length
              // this.get_committeedata.memberdetails = this.get_committeedata.memberdetails.toString()
              this.loading = true
              let data1 = {
                "epoch": this.get_committeedata.epoch.toString(),
                "chainId": this.all_data.chainId,
                "page": 1,
                "pagesize": 10,
              }
              getBlockDataByEpoch(data1).then(response => {
                this.loading = false
                this.totla = response.data.total
                this.tableData = response.data.dataList
              })
            }

          })
        } else {
          let data = {
            'chainId': this.all_data.chainId,
            "epoch": (Number(this.get_committeedata.epoch) + 1)
          }
          getChainCommittee(data).then(response => {
            if (response.data.length == 0) {
            } else {
              this.get_committeedata = response.data[0]
              this.get_committeedata.memberdetails_number = this.get_committeedata.memberdetails.length
              // this.get_committeedata.memberdetails = this.get_committeedata.memberdetails.toString()
              this.loading = true
              let data1 = {
                "epoch": this.get_committeedata.epoch.toString(),
                "chainId": this.all_data.chainId,
                "page": 1,
                "pagesize": 10,
              }
              getBlockDataByEpoch(data1).then(response => {
                this.loading = false
                this.totla = response.data.total
                this.tableData = response.data.dataList
              })
            }

          })
        }
      },
      /*跳转到对应链*/
      to_chain(e) {
        let data = {"chainId":e.toString()}
        if(this.$store.getters.crosschain_to_block_detil.chainId==0){
          this.$router.push({path: '/main_chain'})
        }else {
          this.$store.dispatch('app/setFragmentedDetails', data).then(() => {
            this.$router.push({path: '/split_subchain'})
          })
        }
      },
      /*点击单个参选成员=》地址详情跳转*/
      to_address_details(e){
        let data = {"chainId":this.all_data.chainId.toString(), "address": e}
        this.$store.dispatch('app/setAddressDetails', data).then(() => {
          this.$router.push({path: '/address_details'})
        })
      },
      /*点击区块信息高度跳转*/
      height_query_block(e, q,w) {
        let data = {
          "height": q.toString(),
          "chainId": e.toString(),
          "pagesize": 10,
          "hash": w,
        }
        this.$store.dispatch('app/setCrosschainBlock', data).then(() => {
          this.$router.push({path: '/mainchain_blockdetails'})
        })
      },
    },
    created() {
      if (this.$store.getters.language == 'zh') {
        this.is_zh = true
      } else {
        this.is_zh = false
      }
      this.all_data = this.$store.getters.main_chaincommittee
      this.chain_list = this.getChainInfoStruct()
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
  .el-pagination {
    float: right;
    margin-right: 3%;
    margin-top: 30px;
    margin-bottom: 70px;
  }

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

  .cc_con {
    width: 100%;
    margin-bottom: 80px;
  }

  .con_title {
    height: 25px;
    font-size: 18px;
    color: #800080;
    padding-bottom: 20px;
  }

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

  .cc_all_con_right_last::-webkit-scrollbar { /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .cc_all_con_right_last::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(218, 218, 218, 0.2);
    background: #b5b5b5;
  }

  .cc_all_con_right_last::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: #ffffff;
  }

  .cc_all_con_right_last {
    height: 100px;
    overflow: auto;
  }

  .cc_all_con_left_last {
    height: 100px;
  }

  .cc_all_con {
    display: flex;
    border-bottom: 1px solid #DCDFE6;
    padding: 0 15px;
  }

  .cc_all_con_left {
    width: 25%;
    line-height: 3;
    border-right: 1px solid #DCDFE6;
  }

  .cc_all_con_right {
    word-break: break-all;
    width: 75%;
    line-height: 3;
    padding: 0 15px;
  }

  .cc_all {
    width: 100%;
    border: 1px solid #DCDFE6;
    border-bottom: 0px;
    /*display: flex;*/
  }
</style>
