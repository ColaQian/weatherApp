import * as types from './mutation-types'
import {
  saveHistory
} from '../common/js/history'
const mutations = {
  [types.SET_TODAY](state, today) {
    state.today = today
  },
  [types.SET_FUTURE](state, future) {
    state.future = future
  },
  [types.SET_SHOW_FUTURE](state, showFuture) {
    state.showFuture = showFuture
  },
  [types.SET_HISTORY](state, history) {
    let localHis = saveHistory(history)
    state.history = localHis
  }
}

export default mutations