import {
  commonParams,
  options
} from './config.js'
import jsonp from '../common/js/jsonp.js'
import axios from 'axios'

export function getWeather() {
  const url = '/api/getWeather'

  return axios.get(url).then((response) => {
    return Promise.resolve(response.data)
  })
}