class Today {
  constructor({
    cityid,
    cityname,
    date,
    day,
    lowTemp,
    highTemp,
    text,
    wind,
    airquality,
    feelslike,
    humidity,
    nowtemp,
    nowtext,
    winddirection,
    windscale
  }) {
    this.cityid = cityid
    this.cityname = cityname
    this.date = date
    this.day = day
    this.lowTemp = lowTemp
    this.highTemp = highTemp
    this.text = text
    this.wind = wind
    this.airquality = airquality
    this.feelslike = feelslike
    this.humidity = humidity
    this.nowtemp = nowtemp
    this.nowtext = nowtext
    this.winddirection = winddirection
    this.windscale = windscale
  }
}

export function createToday(weather) {
  return new Today({
    cityid: weather.city_id,
    cityname: weather.city_name,
    date: weather.future[0].date,
    day: weather.future[0].day,
    lowTemp: weather.future[0].low,
    highTemp: weather.future[0].high,
    text: weather.future[0].text,
    wind: weather.future[0].wind,
    airquality: weather.now.air_quality.city.quality,
    feelslike: weather.now.feels_like,
    humidity: weather.now.humidity,
    nowtemp: weather.now.temperature,
    nowtext: weather.now.text,
    winddirection: weather.now.wind_direction,
    windscale: weather.now.wind_scale
  })
}

class Future {
  constructor({
    date,
    day,
    low,
    high,
    text,
    wind
  }) {
    this.date = date
    this.day = day
    this.low = low
    this.high = high
    this.text = text
    this.wind = wind
  }
}
export function createFuture(future) {
  let ret = []
  let length = future.length
  for (let i = 0; i < length; i++) {
    ret.push(new Future({
      date: future[i].date,
      day: future[i].day,
      low: future[i].low,
      high: future[i].high,
      text: future[i].text,
      wind: future[i].wind
    }))
  }
  return ret
}