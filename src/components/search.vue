<template>
  <transition name="slide">
    <div>
    <div class="search-wrapper">
      <div class="search">
        <i class="icon-back" @click="back"></i>
        <input class="box" v-model="query" placeholder="  搜索城市">
        <i class="icon-close" @click="clear"></i>
      </div>
    </div>
    <div class="suggest" v-show="query.length > 0">
      <p class="suggest-city" v-html="query" @click="chooseCity(query)"></p>
    </div>
    <div class="hot-city" v-show='!query.length > 0'>
      <h1 class="title">热门城市</h1>
      <ul>
        <li v-for="item in hotcities" class="item" @click="chooseCity(item)">
          <span>{{item}}</span>
        </li>
      </ul> 
    </div>
  </div>
  </transition>
</template>

<script>
import {debunce} from '../common/js/debunce.js'
import {searchCity,selectCity} from '../api/searchCity.js'
import {createToday,createFuture} from '../common/js/createWeather.js'
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      query: '',
      hotcities: ['北京','上海','深圳','南京','成都','杭州','合肥','长沙','武汉','安庆','郑州']
    }
  },
  created() {
    this.$watch('query',debunce((newVal) =>{
      this.queryCity(newVal)
    },600))
  },
  methods: {
    back() {
      this.$router.push("/")
    },
    clear() {
      this.query = ''
    },
    chooseCity(item) {
      this.queryCity(item)
      this.$router.push("/")
    },
    queryCity(newVal) {
      searchCity(newVal).then((res) =>{
        if(res.results[0].id == undefined) {
          return 
        }
        selectCity(res.results[0].id).then((res) =>{
          let weather = res.weather[0]
          let future = res.weather[0].future
          let today = createToday(weather)
          let futureinfo = createFuture(future)
          let showFuture = futureinfo.slice(0,6)
          this.setToday(today)
          this.setFuture(futureinfo)
          this.setShowFuture(showFuture)
          this.setHistory(newVal)
        })
      })
    },
   ...mapMutations({
      setToday: 'SET_TODAY',
      setFuture: 'SET_FUTURE',
      setShowFuture: 'SET_SHOW_FUTURE',
      setHistory: 'SET_HISTORY'
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.slide-enter-active,.slide-leave-active
  transition:all 0.3s
  
.slide-enter,.slide-leave-to
  transform: translate3d(100%,0,0)
.search-wrapper
  width: 100%
  height: 70px
  background: #339ad5
  .search
    display: flex
    align-items: center
    box-sizing: border-box
    padding: 0 6px
    padding-top: 40px
    padding-bottom: 10px
    border-radius: 6px
    .icon-search
      font-size: 24px
    .box
      flex: 1
      border-radius: 5px
      margin: 0 10px
      color: #fff
      line-height: 16px
      background: #339ad5
      border-bottom: 1px solid #fff
    .icon-cancle
      font-size: 20px 
.suggest
  width: 100%
  .suggest-city
    width: 100%
    height: 40px
    line-height: 40px
    font-size: 25px
    border-bottom: 1px solid #000
    border-radius: 3px
.hot-city
  margin: 25px 30px
  .title
    line-height: 16px
    height: 16px
    font-size: 16px
    margin: 10px
  .item
    display: inline-block
    font-size: 16px
    box-sizing: border
    height: 16px
    line-height: 16px
    padding: 8px 10px
</style>
