import {getLanguage} from '@/i18n/langs/index'
import Cookies from 'js-cookie'

const state = {
  language: getLanguage(),
  home_search_height: '',
  home_search_tr_1: '',
  home_search_tr_2: '',
  home_search_tr_3: '',
  home_search_tr_4: '',
  home_search_tr_5: '',
  home_search_tr_6: '',
  crosschain_to_block_detil: '',
  crosschain_to_block_detil_1: '',
  main_chain_to_tr: '',
  main_chaincommittee: '',
  main_unchaincommittee: '',
  fragmented_details: '',
  unfragmented_details: '',
  unmain_chainblock: '',
  main_chainblock: '',
  address_details: '',
  contract_details: '' ,
  cross_chain_contract: '',
  wei_to_de:'',
}
const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_SEARCH_HEIGHT: (state, data) => {
    state.home_search_height = data
  },
  SET_SEARCH_TR_1: (state, data) => {
    state.home_search_tr_1 = data
  },
  SET_SEARCH_TR_2: (state, data) => {
    state.home_search_tr_2 = data
  },
  SET_SEARCH_TR_3: (state, data) => {
    state.home_search_tr_3 = data
  },
  SET_SEARCH_TR_4: (state, data) => {
    state.home_search_tr_4 = data
  },
  SET_SEARCH_TR_5: (state, data) => {
    state.home_search_tr_5 = data
  },
  SET_SEARCH_TR_6: (state, data) => {
    state.home_search_tr_6 = data
  },
  SET_CROSSCHAIN_BLOCK: (state, data) => {
    state.crosschain_to_block_detil = data
  },
  SET_CROSSCHAIN_BLOCK_1: (state, data) => {
    state.crosschain_to_block_detil_1 = data
  },
  MAIN_CHAINBLOCK: (state, data) => {
    state.main_chainblock = data
  },
  MAIN_CHAINTOTR: (state, data) => {
    state.main_chain_to_tr = data
  },
  MAIN_CHAINCOMMITTEE: (state, data) => {
    state.main_chaincommittee = data
  },
  MAIN_UNCHAINCOMMITTEE: (state, data) => {
    state.main_unchaincommittee = data
  },
  FRAGMENTED_DETAILS: (state, data) => {
    state.fragmented_details = data
  },
  UNFRAGMENTED_DETAILS: (state, data) => {
    state.unfragmented_details = data
  },
  UNMAIN_CHAINBLOCK: (state, data) => {
    state.unmain_chainblock = data
  },
  ADDRESS_DETAILS: (state, data) => {
    state.address_details = data
  },
  CONTRACT_DETAILS: (state, data) => {
    state.contract_details = data
  },
  CROSS_CHAIN_CONTRACT: (state, data) => {
    state.cross_chain_contract = data
  },
  WEI_TO_DE: (state, data) => {
    state.wei_to_de = data
  },
}
const actions = {
  setLanguage({commit}, language) {
    commit('SET_LANGUAGE', language)
  },
  setSearchHeight({commit}, data) {
    commit('SET_SEARCH_HEIGHT', data)
  },
  setSearchTr1({commit}, data) {
    commit('SET_SEARCH_TR_1', data)
  },
  setSearchTr2({commit}, data) {
    commit('SET_SEARCH_TR_2', data)
  },
  setSearchTr3({commit}, data) {
    commit('SET_SEARCH_TR_3', data)
  },
  setSearchTr4({commit}, data) {
    commit('SET_SEARCH_TR_4', data)
  },
  setSearchTr5({commit}, data) {
    commit('SET_SEARCH_TR_5', data)
  },
  setSearchTr6({commit}, data) {
    commit('SET_SEARCH_TR_6', data)
  },
  setCrosschainBlock({commit}, data) {
    commit('SET_CROSSCHAIN_BLOCK', data)
  },
  setCrosschainBlock_1({commit}, data) {
    commit('SET_CROSSCHAIN_BLOCK_1', data)
  },
  setMainChainblock({commit}, data) {
    commit('MAIN_CHAINBLOCK', data)
  },
  setMainChaintotr({commit}, data) {
    commit('MAIN_CHAINTOTR', data)
  },
  setMainChaincommittee({commit}, data) {
    commit('MAIN_CHAINCOMMITTEE', data)
  },
  setUnmainChaincommittee({commit}, data) {
    commit('MAIN_UNCHAINCOMMITTEE', data)
  },
  setFragmentedDetails({commit}, data) {
    commit('FRAGMENTED_DETAILS', data)
  },
  setUnfragmentedDetails({commit}, data) {
    commit('UNFRAGMENTED_DETAILS', data)
  },
  setUnmainChainblock({commit}, data) {
    commit('UNMAIN_CHAINBLOCK', data)
  },
  setAddressDetails({commit}, data) {
    commit('ADDRESS_DETAILS', data)
  },
  setContractDetails({commit}, data) {
    commit('CONTRACT_DETAILS', data)
  },
  setCrossChainContract({commit}, data) {
    commit('CROSS_CHAIN_CONTRACT', data)
  },
  setWeiToDe({commit}, data) {
    commit('WEI_TO_DE', data)
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
