import request from '@/utils/request'

/*获取主页货币市值信息*/
export function getMainPageInfo() {
  return request({
    url: 'chain/getMainPageInfo',
    method: 'get',
    params: {}
  })
}

/*获取主页已分片链信息*/
export function getChainStatByType() {
  return request({
    url: 'chain/getChainStatByType',
    method: 'get',
    params: {}
  })
}

/*获取主页主链信息*/
export function getMainChainStat(e) {
  return request({
    url: 'chain/getMainChainStat',
    method: 'post',
    data: e
  })
}

/*获取主页交易信息*/
export function getBlockNewTxPage(e) {
  return request({
    url: 'chain/getBlockNewTxPage',
    method: 'post',
    data: e
  })
}

/*主页根据高度查询区块详情*/
export function getBlockDataByPage(e) {
  return request({
    url: 'chain/getBlockDataByPage',
    method: 'post',
    data: e
  })
}/*主链区块详情带委员会无分页*/
export function getBlockData(e) {
  return request({
    url: 'chain/getBlockData',
    method: 'post',
    data: e
  })
}
/*获取链结构*/
export function getChainInfoStruct() {
  return request({
    url: 'chain/getChainInfoStruct',
    method: 'get',
    params: {}
  })
}

/*获取委员会信息*/
export function getChainCommittee(e) {
  return request({
    url: 'chain/getChainCommittee',
    method: 'get',
    params: e

  })
}
/*获取区块交易信息*/
export function getTxTypeByHeigh(e,q) {
  return request({
    url: 'chain/getTxTypeByHeight',
    method: 'post',
    data: {
      "chainId": e.toString(),
      "height": q.toString()
    }
  })
}

/*根据参选轮次获取区块信息*/
export function getBlockDataByEpoch(e) {
  return request({
    url: 'chain/getBlockDataByEpoch',
    method: 'post',
    data:e
  })
}
/*地址详情获取链金额详细*/
export function getAccountByAddress(e) {
  return request({
    url: 'chain/getAccountByAddress',
    method: 'post',
    data:e
  })
}
/*地址详情获取交易详细*/
export function getBlockTxByAddress(e) {
  return request({
    url: 'chain/getBlockTxByAddress',
    method: 'post',
    data:e
  })
}

/*合约详情获取合约*/
export function getTxByContractAndChainId(e) {
  return request({
    url: 'chain/getTxByContractAndChainId',
    method: 'post',
    data: e
  })
}
/*交易详情筛选*/
export function getTxByTxTypeAndChainId(e) {
  return request({
    url: 'chain/getTxByTxTypeAndChainId',
    method: 'post',
    data: e
  })
}
/*获取分片链信息*/
export function getChildrenChainStatsById(e) {
  return request({
    url: 'chain/getChildrenChainStatsById',
    method: 'post',
    data: e
  })
}
/*获取分片链交易信息*/
export function getTxByParentId(e) {
  return request({
    url: 'chain/getTxByParentId',
    method: 'post',
    data: e
  })
}

/*获取下载文件详情*/
export function getfile(e) {
  return request({
    url: 'file',
    method: 'get',
    params: e
  })
}
/*获取链相关数量*/
export function getMainPageChainInfo(e) {
  return request({
    url: 'chain/getMainPageChainInfo',
    method: 'post',
    data: e
  })
}
/*获取链市值，交易量，tps相关信息*/
export function getMainPageTxByDay(e) {
  return request({
    url: 'chain/getMainPageTxByDay',
    method: 'post',
    data: e
  })
}
/*获取网络市值*/
export function getNewTickers(e) {
  return request({
    url: 'chain/getNewTickers',
    method: 'get',
    params: e
  })
}
