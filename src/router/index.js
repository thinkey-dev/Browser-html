import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/home',
    hidden: true,
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home',
    component: () => import('../views/home/index'),
    hidden: true,
    children: [
      {
        path: '/home',
        component: () => import('../views/homeCon/index'),
      },
      /*链详情--主链*/
      {
        path: '/main_chain',
        component: () => import('../components/mainChain'),
      },
      /*链详情--已分片子链*/
      {
        path: '/split_subchain',
        component: () => import('../components/splitSubchain'),
      },
      /*链详情--未分片子链/分片链共用*/
      {
        path: '/unfragmented_subchain',
        component: () => import('../components/unfragmentedSubchain'),
      },
      /*查看全部区块--主链/已分片子链共用*/
      {
        path: '/main_chainblock',
        component: () => import('../components/mainChainblock'),
      },
      /*查看全部区块--未分片子链/分片链共用*/
      {
        path: '/slice_subblock',
        component: () => import('../components/sliceSubblock'),
      },
      /*区块详情--主链/已分片子链共用*/
      {
        path: '/mainchain_blockdetails',
        component: () => import('../components/mainChainBlockDetails'),
      },
      /*区块详情--主链/未分片子链/分片链共用*/
      {
        path: '/slicechain_blockdetails',
        component: () => import('../components/sliceChainBlockDetails'),
      },
      /*交易信息主页*/
      {
        path: '/trading_information',
        component: () => import('../components/tradingInformation'),
      },
      /*区块内交易详情*/
      {
        path: '/intrablock_transaction_details',
        component: () => import('../components/intrablockTransactionDetails'),
      },
      /*链内交易*/
      {
        path: '/intrachain_transfer',
        component: () => import('../components/intrachainTransfer'),
      },
      /*跨链取款*/
      {
        path: '/transfer_withdrawal',
        component: () => import('../components/transferWithdrawal'),
      },
      /*跨链存款*/
      {
        path: '/transfer_deposit',
        component: () => import('../components/transferDeposit'),
      },
      /*跨链撤销*/
      {
        path: '/transfer_cancellation',
        component: () => import('../components/transferCancellation'),
      },
      /*合约交易*/
      {
        path: '/contract_transaction',
        component: () => import('../components/contractTransaction'),
      },
      /*合约发布*/
      {
        path: '/contract_release',
        component: () => import('../components/contractRelease'),
      },
      /*委员会详情--主链/已分片子链*/
      {
        path: '/mainchain_committee',
        component: () => import('../components/mainchainCommittee'),
      },
      /*委员会详情--未分片子链/分片链*/
      {
        path: '/fragmentchain_committee',
        component: () => import('../components/fragmentchainCommittee'),
      },
      /*搜索区块高度*/
      {
        path: '/search_blockheight',
        component: () => import('../components/searchBlockheight'),
      },
      /*地址详情*/
      {
        path: '/address_details',
        component: () => import('../components/addressDetails'),
      },
      /*合约详情*/
      {
        path: '/contract_details',
        component: () => import('../components/contractDetails'),
      },
      /*跨链转账合约*/
      {
        path: '/crosschain_contract',
        component: () => import('../components/crosschainContract'),
      },
      /*下载文件*/
      {
        path: '/download',
        component: () => import('../components/download'),
      },
    ]
  },

]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
