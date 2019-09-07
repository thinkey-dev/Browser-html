<template>
  <div class="mb_con">
    <div class="con_title">
      {{$t("title.blockchain_details")}}:
      <span class="to_tr color_choose" v-show="is_zh">{{chainid_change_zh(all_data.chainId)}}</span>
      <span class="to_tr color_choose" v-show="!is_zh">{{chainid_change_en(all_data.chainId)}}</span>
    </div>
    <div class="mb_search">
      <div class="mb_search1_2">
        <div class="mb_search2_1">
          <div class="mb_search2_1_input">
            <span class="el-icon-search mb_search2_1_input_icon"></span>
            <el-input @input="handinput()" v-model="search_height"
                      :placeholder="$t('placeholder.placeholder_1')"></el-input>
          </div>
          <el-button type="primary" class="mb_search_submit" @click="Block_details_query()">
            {{$t("placeholder.search")}}
          </el-button>
        </div>
      </div>
    </div>
    <div class="con_title " style="margin-top:80px">
      {{$t("title.block_information")}}
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-bottom: 30px;min-height: 500px"
      v-loading="loading"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose" @click="height_query_block(scope.row.chainId,scope.row.height)">{{scope.row.height}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_hash')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose"
                @click="to_block_details(scope.row.chainId,scope.row.height,scope.row.hash)">{{slice_hash(scope.row.hash)}}</span>
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
          <!--<span class="to_tr show_color_choose">{{slice_hash(scope.row.miner)}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <el-pagination
      background
      @current-change="currentPageChange"
      :current-page="currentPage"
      :page-size="pagesize"
      layout="prev, pager, next"
      :total="totla"
    >
    </el-pagination>
  </div>
</template>

<script>
  import {
    getBlockDataByPage,
  } from '../api/interface'

  export default {
    name: "sliceSubblock",
    data() {
      return {
        search_height: '',
        all_data: {},
        tableData: [],
        loading: false,
        currentPage: 1,
        pagesize: 10,
        totla: 0
      }
    },
    methods: {
      /*分页查询数据*/
      currentPageChange(e) {
        this.currentPage = e
        this.loading = true
        // let data=this.$store.getters.main_chainblock
        let data = {
          "height": '',
          "chainId": this.all_data.chainId.toString(),
          "page": this.currentPage,
          "pagesize": 10,
          "hash": '',
        }
        getBlockDataByPage(data).then(response => {
          this.loading = false
          if (response.data.dataList.length == 0) {
            this.tableData = []

          } else {
            this.tableData = response.data.dataList
            this.totla = response.data.total
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
      /*初始化获取数据*/
      getBlockDataByPage() {
        this.loading = true
        let data = this.$store.getters.unmain_chainblock
        getBlockDataByPage(data).then(response => {
          this.loading = false
          if (response.data.dataList.length == 0) {
            this.tableData = []

          } else {
            this.tableData = response.data.dataList
            this.totla = response.data.total
          }
        })

      },
      /*区块详情查询*/
      Block_details_query() {
        if (this.search_height == '') {
          if (this.$store.getters.language == 'en') {
            this.$message.error('The query block height cannot be empty!');
          } else {
            this.$message.error('查询区块高度不能为空！');
          }

        } else {
          let data = {
            "height": this.search_height,
            "chainId": this.all_data.chainId,
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
              this.$store.dispatch('app/setCrosschainBlock_1', data).then(() => {
                this.$router.push({path: '/slicechain_blockdetails'})
              })
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
      /*点击区块信息高度跳转*/
      height_query_block(e, q) {
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
    },
    created() {
      this.all_data = this.$store.getters.unmain_chainblock
      if (this.$store.getters.language == 'zh') {
        this.is_zh = true
      } else {
        this.is_zh = false
      }
      this.chain_list = this.getChainInfoStruct()
      this.getBlockDataByPage()
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
<style>
  .mb_con .mb_search2_1 .mb_search2_1_input input {
    text-indent: 30px;
  }
</style>
<style scoped>
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

  .mb_search2_1_input_icon {
    position: absolute;
    margin-left: 15px;
    margin-top: 10px;
    z-index: 1;
  }

  .mb_search2_1_input {
    display: flex;
    width: 70%;
  }

  .mb_search2_1 {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .mb_search1_2 {
    width: 600px;
    margin-left: 0px;
  }

  .mb_search1_1_top_title {
    line-height: 2.5;
    font-size: 16px;
  }

  .mb_search1_1_top {
    display: flex;
    justify-content: space-between;
  }

  .mb_con {
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
