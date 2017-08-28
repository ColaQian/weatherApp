import {
  commonParams,
  options
} from './config.js'
import jsonp from '../common/js/jsonp.js'
import pinyin from 'pinyin'
import axios from 'axios'

export function selectCity(id) {
  const url = '/api/selectCity'
  const data = Object.assign({}, {
    cityid: id
  })

  return axios.get(url, {
    params: data
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}

export function searchCity(query) {
  const name = pinyin(query, {
    style: pinyin.STYLE_NORMAL
  })
  let parseName = ''
  name.forEach((item) => {
    parseName += item
  })
  const url = '/api/searchCity'
  const data = Object.assign({}, {
    location: parseName
  })

  return axios.get(url, {
    params: data
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}