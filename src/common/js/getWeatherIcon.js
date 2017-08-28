export function getWeatherIcon(item) {
  let text = item.text.split('/')[0]

  return text === '中雨' ? 'icon-天气_中雨' : text === '晴' ? 'icon-天气' : text === '阴' ? 'icon-天气2' : text === '多云' ? 'icon-天气_1' : text === '大雨' ? 'icon-天气_大雨' : 'icon-小雨-天气'
}