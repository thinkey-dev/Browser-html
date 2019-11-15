import request from '@/utils/request'

export function getMainPageInfo() {
  return request({
    url: 'chain/getMainPageInfo',
    method: 'get',
    params: {}
  })
}

export function getChainStatByType() {
  return request({
    url: 'chain/getChainStatByType',
    method: 'get',
    params: {}
  })
}

export function getMainChainStat(e) {
  return request({
    url: 'chain/getMainChainStat',
    method: 'post',
    data: e
  })
}

export function getBlockNewTxPage(e) {
  return request({
    url: 'chain/getBlockNewTxPage',
    method: 'post',
    data: e
  })
}

export function getBlockDataByPage(e) {
  return request({
    url: 'chain/getBlockDataByPage',
    method: 'post',
    data: e
  })
}

export function getBlockData(e) {
  return request({
    url: 'chain/getBlockData',
    method: 'post',
    data: e
  })
}

export function getChainInfoStruct() {
  return request({
    url: 'chain/getChainInfoStruct',
    method: 'get',
    params: {}
  })
}

export function getChainCommittee(e) {
  return request({
    url: 'chain/getChainCommittee',
    method: 'get',
    params: e

  })
}

export function getTxTypeByHeigh(e, q) {
  return request({
    url: 'chain/getTxTypeByHeight',
    method: 'post',
    data: {
      "chainId": e.toString(),
      "height": q.toString()
    }
  })
}

export function getBlockDataByEpoch(e) {
  return request({
    url: 'chain/getBlockDataByEpoch',
    method: 'post',
    data: e
  })
}

export function getAccountByAddress(e) {
  return request({
    url: 'chain/getAccountByAddress',
    method: 'post',
    data: e
  })
}

export function getBlockTxByAddress(e) {
  return request({
    url: 'chain/getBlockTxByAddress',
    method: 'post',
    data: e
  })
}

export function getTxByContractAndChainId(e) {
  return request({
    url: 'chain/getTxByContractAndChainId',
    method: 'post',
    data: e
  })
}

export function getTxByTxTypeAndChainId(e) {
  return request({
    url: 'chain/getTxByTxTypeAndChainId',
    method: 'post',
    data: e
  })
}

export function getChildrenChainStatsById(e) {
  return request({
    url: 'chain/getChildrenChainStatsById',
    method: 'post',
    data: e
  })
}

export function getTxByParentId(e) {
  return request({
    url: 'chain/getTxByParentId',
    method: 'post',
    data: e
  })
}

export function getfile(e) {
  return request({
    url: 'file',
    method: 'get',
    params: e
  })
}

export function getMainPageChainInfo(e) {
  return request({
    url: 'chain/getMainPageChainInfo',
    method: 'post',
    data: e
  })
}

export function getMainPageTxByDay(e) {
  return request({
    url: 'chain/getMainPageTxByDay',
    method: 'post',
    data: e
  })
}
export function getNewTickers(e) {
  return request({
    url: 'chain/getNewTickers',
    method: 'get',
    params: e
  })
}
