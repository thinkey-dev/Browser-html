import {getChainInfoStruct} from '../api/interface'
import moment from 'moment'

export default {
  install(Vue, opt) {
    /*table=>header颜色*/
    Vue.prototype.tableHeaderColor = function ({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 0) {
        return 'background-color:#f1f1f1 ;color: #333;font-weight: 600;font-size: 15px;'
      }
    }
    /*hash字符串截取*/
    Vue.prototype.slice_hash = function (e) {
      if (e == '' || e == null || e == undefined) {
        return ''
      } else {
        let a = e.slice(0, 5)
        let b = e.substring(e.length - 5)
        let c = a + '*****' + b
        return c
      }
    }
    /*链列表*/
    Vue.prototype.getChainInfoStruct = function (e) {
      let chain_list = {}
      chain_list.zh_chain_arr = [
        {'label': '全部', 'value': '', 'is_have': true},
      ]
      chain_list.en_chain_arr = [
        {'label': 'All', 'value': '', 'is_have': true},
      ]
      getChainInfoStruct().then(response => {
        chain_list.zh_chain_arr.push({'label': '主链', 'value': 0, 'is_have': true})
        chain_list.en_chain_arr.push({'label': 'Main chain', 'value': 0, 'is_have': true})
        if (response.data.childrens.length == 0 || response.data.childrens == null) {
        } else {
          response.data.childrens.forEach((item, index, self) => {
            if (item.childrens.length == 0) {
              chain_list.zh_chain_arr.push({
                'label': '子链' + (index + 1) + '(' + item.chainId + '#)',
                'value': item.chainId,
                'is_have': false
              })
              chain_list.en_chain_arr.push({
                'label': 'Subchain' + (index + 1) + '(' + item.chainId + '#)',
                'value': item.chainId,
                'is_have': false
              })
            } else {
              chain_list.zh_chain_arr.push({
                'label': '子链' + (index + 1) + '(' + item.chainId + '#)',
                'value': item.chainId,
                'is_have': true
              })
              chain_list.en_chain_arr.push({
                'label': 'Subchain' + (index + 1) + '(' + item.chainId + '#)',
                'value': item.chainId,
                'is_have': true
              })
              item.childrens.forEach((item1, index1, self1) => {
                chain_list.zh_chain_arr.push({
                  'label': '子链' + (index + 1) + '(' + item.chainId + '#) / 分片链' + (index1 + 1) + '(' + item1.chainId + '#)',
                  'value': item1.chainId,
                  'is_have': false
                })
                chain_list.en_chain_arr.push({
                  'label': 'Subchain' + (index + 1) + '(' + item.chainId + '#) / Slice chain' + (index1 + 1) + '(' + item1.chainId + '#)',
                  'value': item1.chainId,
                  'is_have': false
                })
              })
            }
          })
        }

      })
      return chain_list
    }
    /*时间戳转换=>moment*/
    Vue.prototype.timestampToTime = function (timestamp) {
      let time = ''
      if (timestamp == '' || timestamp == null || timestamp == undefined) {
        time = ''
      } else {
        time = moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')
      }
      return time
    }
    /*金额转换*/
    Vue.prototype.scientificCounting = function (e) {
      let num = 0
      if (e == 0 || e == '' || e == null || e == undefined) {
        num = 0
      } else {
        num = (e / 1e18)
      }
      return num
    }
  }
}
