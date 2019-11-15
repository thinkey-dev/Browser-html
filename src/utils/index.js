import {getChainInfoStruct} from '../api/interface'
import moment from 'moment'
import BigNumber from "bignumber.js"
import Iban from '../../static/web3-eth-iban/src/index'
export default {
  install(Vue, opt) {
    Vue.prototype.tableHeaderColor = function ({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 0) {
        return 'background-color:#ffffff ;color: #333;font-weight: 600;font-size: 15px;height:58px;'
      }
    }
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
                'label': '任务链' + (index + 1) + '(' + item.chainId + '#)',
                'value': item.chainId,
                'is_have': false
              })
              chain_list.en_chain_arr.push({
                'label': 'Task chain' + (index + 1) + '(' + item.chainId + '#)',
                'value': item.chainId,
                'is_have': false
              })
            } else {
              chain_list.zh_chain_arr.push({
                'label': '任务链' + (index + 1) + '(' + item.chainId + '#)',
                'value': item.chainId,
                'is_have': true
              })
              chain_list.en_chain_arr.push({
                'label': 'Task chain' + (index + 1) + '(' + item.chainId + '#)',
                'value': item.chainId,
                'is_have': true
              })
              item.childrens.forEach((item1, index1, self1) => {
                chain_list.zh_chain_arr.push({
                  'label': '任务链' + (index + 1) + '(' + item.chainId + '#) / 交易链' + (index1 + 1) + '(' + item1.chainId + '#)',
                  'value': item1.chainId,
                  'is_have': false
                })
                chain_list.en_chain_arr.push({
                  'label': 'Task chain' + (index + 1) + '(' + item.chainId + '#) / Trading chain' + (index1 + 1) + '(' + item1.chainId + '#)',
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
    Vue.prototype.timestampToTime = function (timestamp) {
      let time = ''
      if (timestamp == '' || timestamp == null || timestamp == undefined) {
        time = ''
      } else {
        time = moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')
      }
      return time
    }
    Vue.prototype.scientificCounting = function (e) {
      let num = 0
      if (e == 0 || e == '' || e == null || e == undefined || e == NaN) {
        num = 0
      } else {
        num = new BigNumber(`${e}`).div("1e+18").toString(10);
        // if(num.indexOf('.') !== -1 && num.split('.')[1].length > 6){
        //   num = parseFloat(num).toFixed(6)
        // }
      }
      return num
    }
    Vue.prototype.slice_hash = function (e) {
      if (e == '' || e == null || e == undefined) {
        return ''
      } else {
        // e=this.to_32_decimal(e)
        let a = e.slice(0, 4)
        let b = e.substring(e.length - 4)
        let c = a + ' *** ' + b
        return c
      }
    }
    Vue.prototype.slice_address = function (e) {
      if (e == '' || e == null || e == undefined) {
        return ''
      } else {
        e = this.to_32_decimal(e)
        let a = e.slice(0, 4)
        let b = e.substring(e.length - 4)
        let c = a + ' *** ' + b
        return c
      }
    }
    Vue.prototype.slice_address1 = function (e) {
      if (e == '' || e == null || e == undefined) {
        return ''
      } else {
        let c = this.to_32_decimal(e)
        return c
      }
    }
    Vue.prototype.to_32_decimal = function (e) {
      let ban = Iban.toIban(e);
      return ban
    }
    Vue.prototype.to_16_decimal = function (e) {
      let ban = Iban.toAddress(e);
      return ban
    }
  }
}
