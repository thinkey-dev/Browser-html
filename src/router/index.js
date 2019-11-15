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
      {
        path: '/main_chain',
        component: () => import('../components/mainChain'),
      },
      {
        path: '/split_subchain',
        component: () => import('../components/splitSubchain'),
      },
      {
        path: '/unfragmented_subchain',
        component: () => import('../components/unfragmentedSubchain'),
      },
      {
        path: '/main_chainblock',
        component: () => import('../components/mainChainblock'),
      },
      {
        path: '/slice_subblock',
        component: () => import('../components/sliceSubblock'),
      },
      {
        path: '/mainchain_blockdetails',
        component: () => import('../components/mainChainBlockDetails'),
      },
      {
        path: '/slicechain_blockdetails',
        component: () => import('../components/sliceChainBlockDetails'),
      },
      {
        path: '/trading_information',
        component: () => import('../components/tradingInformation'),
      },
      {
        path: '/intrablock_transaction_details',
        component: () => import('../components/intrablockTransactionDetails'),
      },
      {
        path: '/intrachain_transfer',
        component: () => import('../components/intrachainTransfer'),
      },
      {
        path: '/transfer_withdrawal',
        component: () => import('../components/transferWithdrawal'),
      },
      {
        path: '/transfer_deposit',
        component: () => import('../components/transferDeposit'),
      },
      {
        path: '/transfer_cancellation',
        component: () => import('../components/transferCancellation'),
      },
      {
        path: '/contract_transaction',
        component: () => import('../components/contractTransaction'),
      },
      {
        path: '/contract_release',
        component: () => import('../components/contractRelease'),
      },
      {
        path: '/mainchain_committee',
        component: () => import('../components/mainchainCommittee'),
      },
      {
        path: '/fragmentchain_committee',
        component: () => import('../components/fragmentchainCommittee'),
      },
      {
        path: '/search_blockheight',
        component: () => import('../components/searchBlockheight'),
      },
      {
        path: '/address_details',
        component: () => import('../components/addressDetails'),
      },
      {
        path: '/contract_details',
        component: () => import('../components/contractDetails'),
      },
      {
        path: '/crosschain_contract',
        component: () => import('../components/crosschainContract'),
      },
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
