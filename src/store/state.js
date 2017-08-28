import {loadCache} from '../common/js/history'
const state = {
  today: {},
  future: [],
  showFuture: [],
  history: loadCache()
}

export default state