<template>
  <div class="weather_wrapper" @click="toggleHistory">
    <div :style="{backgroundImage: 'url(' + img + ')'}" class="bg"></div>
    <transition name="his">
    <div class="history" v-show="showHis">
      <ul class="his">
        <li v-for="item in history" v-html="item" class="his-item" @click.stop="chooseCity(item)"></li>
      </ul>
    </div>
    </transition>
    <div class="weather">
      <div class="weather-show">
        <div class="header">
          <div class="select-city" @click.stop="toggleHistory" v-show='!showHis'>
            <span class="icon-Category"></span>
          </div>
          <div class="city-name">
            <h1>{{today.cityname}}</h1>
          </div>
          <div class="add-city" @click.stop="toSearchCity">
            <span class="icon-add"></span>
          </div>
        </div>  
        <div class="weather-main">
          <div class="weather-title">
            <span class="lowandhigh">min{{today.lowTemp}}&deg/max{{today.highTemp}}&deg</span>
            <h2 class="weather-type">{{today.nowtemp}}&deg</h2>
            <div class="airinfo">
              <span>{{today.nowtext}}</span>
              <span>{{today.airquality}}</span>
            </div>
          </div>
          <div class="weather-detail">
            <div class="detail humidity">
              <span class="detail-type">相对湿度</span>
              <span class="detail-desc">{{today.humidity}}%</span>
            </div>
            <div class="detail wind">
              <span class="detail-type">{{today.winddirection}}风</span>
              <span class="detail-desc">{{today.windscale}}级</span>
            </div>
            <div class="detail feelslike">
              <span class="detail-type">体感温度</span>
              <span class="detail-desc">{{today.feelslike}}&deg</span>
            </div>
          </div>  
        </div>
      </div>  
      <div class="weather-list-wrapper">
          <ul class="weather-list">
            <li v-for="(item,index) in showFuture" class="list-item-wrapper">
                <span class="list-item" v-html="getDay(item,index)"></span>
                <span class="list-item" v-html="getDate(item)"></span>
                <span class="list-item weather-icon" :class="getWeather(item)"></span>
                <span class="list-item" v-html="getLowTemp(item)"></span>
                <span class="list-item" v-html="getHighTemp(item)"></span>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getWeather} from '../api/getWeather.js'
import {createToday,createFuture} from '../common/js/createWeather'
import {searchCity,selectCity} from '../api/searchCity.js'
import {getWeatherIcon} from '../common/js/getWeatherIcon'
import Search from './search'
import {mapMutations,mapGetters} from 'vuex'
export default {
  data() {
    return {
      showHis: false
    }
  },
  created() {
    this._initWeather()
  },
  computed: {
    img() {
      let now = this.today.nowtext
      let weather = now === '晴' ? 'qing' : now === '多云' ? 'duoyun' : now === '阴' ? 'yin'
          : now === '小雨' ? 'xiaoyu' : now === '中雨' ? 'zhongyu' : 'dayu'
      return require('./'+ weather + '.jpg')
    },
    ...mapGetters([
      'today',
      'future',
      'showFuture',
      'history'
      ])
  },
  methods: {
    chooseCity(item) {
      this.showHis = !this.showHis 
      this.$nextTick(() =>{
        this.slelctHis(item)
      })
    },
    slelctHis(item){
      searchCity(item).then((res) =>{
        if(res.results[0].id == undefined) {
          return 
        }
        selectCity(res.results[0].id).then((res) =>{
          let weather = res.weather[0]
          let future = res.weather[0].future
          let today = createToday(weather)
          console.log(today)
          let futureinfo = createFuture(future)
          let showFuture = futureinfo.slice(0,6)
          this.setToday(today)
          this.setFuture(futureinfo)
          this.setShowFuture(showFuture)
          this.setHistory(item)
        })
      })
    },
    toggleHistory() {
      this.showHis = !this.showHis
    },
    toSearchCity() {
      this.$router.push('/searchcity')
    },
    getDay(item,index) {
    if(index === 0) {
      return 'Today'
    }else{
      return item.day === '周一' ? 'Mon' : item.day === '周二' ? 'Tue' : item.day === 
               '周三' ? 'Wen' : item.day === '周四' ? "Thu" : item.day === '周五' ? 'Fri' 
               : item.day === '周六' ? 'Sat' : 'Sun'
      }
    },
    getDate(item) {
      let date = item.date.split("-")
      return `${date[2]}/${date[1]}`
    },
    getWeather(item) {
      return getWeatherIcon(item)
    },
    getLowTemp(item) {
      return `${item.low}&deg`
    },
    getHighTemp(item) {
      return `${item.high}&deg`
    },
    _initWeather() {
      getWeather().then((res) =>{
        let weather = res.weather[0]
        let future = res.weather[0].future
        let todayInfo = createToday(weather)
        let futureInfo = createFuture(future)
        let showFutureInfo = futureInfo.slice(0,6)
        this.setToday(todayInfo)
        this.setFuture(futureInfo)
        this.setShowFuture(showFutureInfo)
      })
    },
    ...mapMutations({
      setToday: 'SET_TODAY',
      setFuture: 'SET_FUTURE',
      setShowFuture: 'SET_SHOW_FUTURE',
      setHistory: 'SET_HISTORY'
    })
  },
  components: {
    Search
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.his-enter-active,.his-leave-active
  transition: all 0.2s
.his-enter,.his-leave-to
  transform: translate3d(-5px,0,0)
.weather_wrapper
  position: fixed
  color: white
  width: 100%
  top: 0
  bottom: 0
  font-weiht: lighter
  background: #339ad5
  .bg
    height: 100%
    width: 100%
    position: absolute
    background-repeat: no-repeat
    background-size: cover
    filter: blur(2px)
  .history
    z-index: 9
    background: #ddd
    position: absolute
    width: 120px
    border-radius: 10px
    top: 20px
    left: 20px
    .his
      margin-top: 20px
      :last
        border-bottom: 0 
      .his-item
        display: inline-block
        width: 100%
        color: #666
        height: 18px
        padding: 8px 0
        line-height: 18px
        font-size: 18px
        text-align: center
        border-bottom: 1px solid #666
  .weather
    top: 0
    left: 0
    right: 0
    width: 100%
    height: 100%
    opacity: 0.8
    .weather-show
      position: relative
      top: 0
      left: 0
      .header
        width: 100%
        height: 70px
        position: relative
        .select-city
          position: absolute
          display: inline-block
          top: 20px
          left: 20px
          .icon-Category
            font-size: 30px
        .city-name
          display: inline-block
          margin: 0 auto
          margin-top: 20px
          font-size: 40px
          font-weight: 700
        .add-city
          position: absolute
          display: inline-block
          top: 20px
          right: 20px
          .icon-add
            font-size: 30px
      .weather-main
        position: relative
        width: 100%
        height: 280px
        .weather-title
          width: 50%
          position: absolute
          margin: 0 auto
          right: 0
          left: 0
          top: 20px
          .lowandhigh
            display: inline-block
            height: 16px
            line-height: 16px
          .weather-type
            height: 60px
            line-height: 60px
            font-size: 60px
            margin-left: 8px
            padding: 5px 0
          .airinfo
            display: inline-block
            height: 13px
            line-height: 13px
            margin-right: 10px
        .weather-detail
          position: absolute
          display: flex
          width: 100%
          bottom: 0
          left: 0
          .detail
            flex: 1
            &.wind
              border-left: 1px solid #fff
              border-right: 1px solid #fff
            .detail-type
              display: inline-block
              height: 18px
              line-height: 18px
              font-size: 18px
              width: 100%
              padding-bottom: 8px
              text-align: center
    .weather-list-wrapper
      width: 100%
      position: relative
      .weather-list
        position: absolute
        left: 30px
        right: 30px
        top: 27px
        display: flex
        justify-content: center
        .list-item-wrapper
          flex: 1
          margin: 0 8px
          .list-item
            display: inline-block
            margin: 8px 0
            width: 100%
            &.weather-icon 
              font-size: 20px
@keyframes show
  0%
    transform: scale(0,0)
  50%
    transform: scale(100%,0)
  100%
    transform: scale(100%,100%)    
</style>
